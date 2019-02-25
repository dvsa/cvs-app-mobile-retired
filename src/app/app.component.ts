import { Component, Renderer2, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../providers/global/auth.service";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { SyncService } from "../providers/global/sync.service";
import { StorageService } from "../providers/natives/storage.service";
import { VisitService } from "../providers/visit/visit.service";
import { LOCAL_STORAGE, STORAGE } from "./app.enums";
import { AppConfig } from "../../config/app.config";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navElem: Nav;
  rootPage: any = 'TestStationHomePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alertCtrl: AlertController, private syncService: SyncService, private authService: AuthService, private mobileAccessibility: MobileAccessibility, private renderer: Renderer2, public storageService: StorageService, public visitService: VisitService) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(true);
      statusBar.styleLightContent();
      this.authService.login().subscribe(
        (data: string) => {
          this.authService.setJWTToken(data);
          this.syncService.startSync();
        }
      );

      // easter egg
      if (AppConfig.IS_PRODUCTION == 'true') {
        localStorage.setItem(LOCAL_STORAGE.EASTER_EGG, 'false');
        localStorage.setItem(LOCAL_STORAGE.CACHING, 'true');
      } else {
        localStorage.setItem(LOCAL_STORAGE.EASTER_EGG, 'true');
        let cache = localStorage.getItem(LOCAL_STORAGE.CACHING);
        cache ? localStorage.setItem(LOCAL_STORAGE.CACHING, cache) : localStorage.setItem(LOCAL_STORAGE.CACHING, 'true');
      }

      this.storageService.read(STORAGE.STATE).then(
        (resp) => {
          let stateResp = resp;
          if (stateResp) {
            this.storageService.read(STORAGE.VISIT).then(
              resp => {
                if (resp) this.visitService.visit = resp;
                let parsedArr = JSON.parse(stateResp);
                this.navElem.setPages(parsedArr).then(
                  () => splashScreen.hide()
                );
              }
            )
          } else {
            this.navElem.setRoot(this.rootPage).then(
              () => splashScreen.hide()
            );
          }
        }
      );

      // Mobile accessibility
      if (platform.is('cordova')) {
        this.accessibilityFeatures();
      }

      // Resuming app from background Mobile Accessibility
      platform.resume.subscribe(() => {
        this.accessibilityFeatures();
      });
    });
  }

  accessibilityFeatures() {
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
}

