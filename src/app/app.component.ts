import { Component, Renderer2, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../providers/global/auth.service";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { SyncService } from "../providers/global/sync.service";
import { StorageService } from "../providers/natives/storage.service";
import { VisitService } from "../providers/visit/visit.service";
import { AUTH, LOCAL_STORAGE, STORAGE } from "./app.enums";
import { AppConfig } from "../../config/app.config";
import { TesterDetailsModel } from "../models/tester-details.model";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navElem: Nav;
  rootPage: any = 'TestStationHomePage';
  isProduction: boolean;

  constructor(public platform: Platform, statusBar: StatusBar,public splashScreen: SplashScreen, private alertCtrl: AlertController, private syncService: SyncService, private authService: AuthService, private mobileAccessibility: MobileAccessibility, private renderer: Renderer2, public storageService: StorageService, public visitService: VisitService) {
    platform.ready().then(() => {
      this.isProduction = (AppConfig.IS_PRODUCTION == 'true');

      statusBar.overlaysWebView(true);
      statusBar.styleLightContent();

      this.startAuthProcess();
      this.manageAppState();
      this.setEasterEgg();

      // Mobile accessibility
      if (this.platform.is('cordova')) this.accessibilityFeatures();

      // Resuming app from background Mobile Accessibility
      this.platform.resume.subscribe(() => {
        this.accessibilityFeatures();
      });
    });
  }

  private manageAppState(): void {
    this.storageService.read(STORAGE.STATE).then(
      (resp) => {
        let stateResp = resp;
        if (stateResp) {
          this.storageService.read(STORAGE.VISIT).then(
            (resp) => {
              if (resp) this.visitService.visit = resp;
              let parsedArr = JSON.parse(stateResp);
              this.navElem.setPages(parsedArr).then(
                () => this.splashScreen.hide()
              );
            }
          )
        } else {
          this.navElem.setRoot(this.rootPage).then(
            () => this.splashScreen.hide()
          );
        }
      }
    )
  }

  private startAuthProcess(): void {
    if (this.platform.is('cordova')) {
      this.authService.login().subscribe(
        (resp: string) => {
          if (resp !== AUTH.MS_ADAL_ERROR_CODE) {
            this.authService.setJWTToken(resp).then(
              () => this.syncService.startSync()
            );
          } else {
            console.error(`Authentication failed due to: ${resp}`);
            if (!this.isProduction) {
              this.generateUserDetails();
              this.syncService.startSync();
            }
          }
        }
      );
    } else {
      this.generateUserDetails();
      this.syncService.startSync();
    }
  }

  private setEasterEgg(): void {
    if (this.isProduction) {
      localStorage.setItem(LOCAL_STORAGE.EASTER_EGG, 'false');
      localStorage.setItem(LOCAL_STORAGE.CACHING, 'true');
    } else {
      localStorage.setItem(LOCAL_STORAGE.EASTER_EGG, 'true');
      let cache = localStorage.getItem(LOCAL_STORAGE.CACHING);
      cache ? localStorage.setItem(LOCAL_STORAGE.CACHING, cache) : localStorage.setItem(LOCAL_STORAGE.CACHING, 'true');
    }
  }

  private accessibilityFeatures(): void {
    this.mobileAccessibility.updateTextZoom();
    this.mobileAccessibility.isInvertColorsEnabled().then(
      (result) => {
        result ? this.renderer.setStyle(document.body, 'filter', 'invert(100%)') : this.renderer.removeStyle(document.body, 'filter');
      }
    );
    this.mobileAccessibility.isBoldTextEnabled().then(
      (result) => {
        result ? this.renderer.addClass(document.body, 'accessibility-bold-text') : this.renderer.removeClass(document.body, 'accessibility-bold-text');
      }
    );
  }

  private generateUserDetails(): void {
    let localTesterDetails: TesterDetailsModel = JSON.parse(localStorage.getItem('tester-details'));
    if (localTesterDetails) {
      this.authService.testerDetails = this.authService.setTesterDetails(null,
        localTesterDetails.testerId,
        localTesterDetails.testerName,
        localTesterDetails.testerEmail);
    } else {
      this.authService.testerDetails = this.authService.setTesterDetails(null);
    }
  }

}

