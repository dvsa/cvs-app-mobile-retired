import { Component, Renderer2, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../providers/global/auth.service";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { SyncService } from "../providers/global/sync.service";
import { StorageService } from "../providers/natives/storage.service";
import { VisitService } from "../providers/visit/visit.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { FIREBASE, LOCAL_STORAGE, PAGE_NAMES, SIGNATURE_STATUS, STORAGE } from "./app.enums";
import { TesterDetailsModel } from "../models/tester-details.model";
import { AppService } from "../providers/global/app.service";
import { ActivityService } from "../providers/activity/activity.service";
import { FirebaseLogsService } from "../providers/firebase-logs/firebase-logs.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navElem: Nav;
  rootPage: any = PAGE_NAMES.TEST_STATION_HOME_PAGE;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public visitService: VisitService,
              public activityService: ActivityService,
              public storageService: StorageService,
              public appService: AppService,
              public events: Events,
              private alertCtrl: AlertController,
              private syncService: SyncService,
              private authService: AuthService,
              private mobileAccessibility: MobileAccessibility,
              private renderer: Renderer2,
              private firebaseLogsService: FirebaseLogsService,
              private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(true);
      statusBar.styleLightContent();
      this.firebaseLogsService.logEvent(FIREBASE.TEST_EVENT, FIREBASE.PAGE_VIEW, FIREBASE.OPEN_APP);

      this.initApp();

      // Mobile accessibility
      if (this.appService.isCordova) {
        this.accessibilityFeatures();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      }

      // Resuming app from background Mobile Accessibility
      this.platform.resume.subscribe(() => {
        this.accessibilityFeatures();
        this.syncService.isUpdateNeeded();
      });
    });
  }

  initApp() {
    this.authService.createAuthContext().then(
      () => {
        this.appService.manageAppInit().then(
          () => {
            this.startAuthProcess();
          }
        )
      }
    )
  }

  private startAuthProcess(): void {
    if (this.appService.isCordova) {
      this.authService.login().subscribe(
        (resp: string) => {
          if (this.authService.isValidToken(resp)) {
            this.authService.setJWTToken(resp).then(
              () => {
                this.appService.isJwtTokenStored = true;
                this.navigateToSignature();
                this.syncService.startSync();
              }
            );
          } else {
            this.navElem.setRoot(this.rootPage).then(
              () => {
                this.splashScreen.hide();
              }
            )
            console.error(`Authentication failed due to: ${resp}`);
          }
        }
      );
    } else {
      this.manageAppState();
      this.generateUserDetails();
      this.syncService.startSync();
    }
  }

  manageAppState(): void {
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
          );
          this.storageService.read(STORAGE.ACTIVITIES).then(
            (resp) => {
              if (resp) this.activityService.activities = resp;
            }
          );
        } else {
          this.navElem.setRoot(this.rootPage).then(
            () => this.splashScreen.hide()
          );
        }
      }
    )
  }


  navigateToSignature(): void {
    if (!this.appService.isSignatureRegistered) {
      this.navElem.push(PAGE_NAMES.SIGNATURE_PAD_PAGE, {navController: this.navElem}).then(
        () => {
          this.events.subscribe(SIGNATURE_STATUS.SAVED_EVENT,
            () => {
              this.events.unsubscribe(SIGNATURE_STATUS.SAVED_EVENT);
              this.setRootPage().then(
                () => {
                  this.manageAppState();
                }
              )
            }
          )
        }
      );
    } else {
      this.manageAppState();
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
    let localTesterDetails: TesterDetailsModel = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TESTER_DETAILS));
    if (localTesterDetails) {
      this.authService.testerDetails = this.authService.setTesterDetails(null,
        localTesterDetails.testerId,
        localTesterDetails.testerName,
        localTesterDetails.testerEmail);
    } else {
      this.authService.testerDetails = this.authService.setTesterDetails(null);
    }
  }

  private setRootPage(): Promise<any> {
    return this.navElem.setRoot(PAGE_NAMES.TEST_STATION_HOME_PAGE).then(() => {
      return this.navElem.popToRoot()
    });
  }

}

