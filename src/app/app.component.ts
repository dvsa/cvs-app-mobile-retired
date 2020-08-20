import { Component, Renderer2, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/global/auth.service';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { SyncService } from '../providers/global/sync.service';
import { StorageService } from '../providers/natives/storage.service';
import { VisitService } from '../providers/visit/visit.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Subscription } from 'rxjs';
import {
  ACCESSIBILITY_DEFAULT_VALUES,
  FIREBASE,
  LOCAL_STORAGE,
  PAGE_NAMES,
  SIGNATURE_STATUS,
  STORAGE,
  LOG_TYPES
} from './app.enums';
import { TesterDetailsModel } from '../models/tester-details.model';
import { AppService } from '../providers/global/app.service';
import { ActivityService } from '../providers/activity/activity.service';
import { FirebaseLogsService } from '../providers/firebase-logs/firebase-logs.service';
import { VisitModel } from '../models/visit/visit.model';
import { Network } from '@ionic-native/network';
import { LogsModel, Log } from '../modules/logs/logs.model';
import { Store } from '@ngrx/store';
import * as logsActions from '../modules/logs/logs.actions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navElem: Nav;
  rootPage: any = PAGE_NAMES.TEST_STATION_HOME_PAGE;

  appResumeSub: Subscription;
  authLogSub: Subscription;
  connectedSub: Subscription;
  disconnectedSub: Subscription;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public visitService: VisitService,
    public activityService: ActivityService,
    public storageService: StorageService,
    public appService: AppService,
    public events: Events,
    private syncService: SyncService,
    private authService: AuthService,
    private mobileAccessibility: MobileAccessibility,
    private renderer: Renderer2,
    private firebaseLogsService: FirebaseLogsService,
    private screenOrientation: ScreenOrientation,
    private network: Network,
    private store$: Store<LogsModel>
  ) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(true);
      statusBar.styleLightContent();

      this.initApp();

      // Mobile accessibility
      if (this.appService.isCordova) {
        this.accessibilityFeatures();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      }

      // Resuming app from background Mobile Accessibility
      this.appResumeSub = this.platform.resume.subscribe(() => {
        this.accessibilityFeatures();
        this.syncService.checkForUpdate();
        // this.splashScreen.show();
        this.manageAppState();
      });

      // TOOD: Remove logging after the white screen bug is resolved
      // CVSB: 17584
      this.setupLogNetworkStatus();
    });
  }

  private async initApp() {
    await this.authService.createAuthContext();
    await this.appService.manageAppInit();
    this.startAuthProcess();
  }

  private startAuthProcess() {
    if (this.appService.isCordova) {
      this.authLogSub = this.authService.login().subscribe((resp: string) => {
        if (this.authService.isValidToken(resp)) {
          this.authService.setJWTToken(resp);
          this.appService.isJwtTokenStored = true;
          this.navigateToSignature();
          this.syncService.startSync();
        } else {
          this.setRootPage();
          console.error(`Authentication failed due to: ${resp}`);
        }
      });
    } else {
      this.manageAppState();
      this.generateUserDetails();
      this.syncService.startSync();
    }
  }

  async manageAppState() {
    try {
      const storageState = await this.storageService.read(STORAGE.STATE);
      if (storageState) {
        const storedVisit = await this.storageService.read(STORAGE.VISIT);
        if (storedVisit) {
          this.hasOpenVisit({ storageState, storedVisit });
        }

        const storedActivities = await this.storageService.read(STORAGE.ACTIVITIES);
        if (storedActivities) {
          this.activityService.activities = storedActivities;
        }
      } else {
        this.setRootPage();
      }
    } catch (error) {
      this.dispatchLog({
        type: `${LOG_TYPES.ERROR}`,
        timestamp: Date.now(),
        message: `User ${this.authService.getOid()} failed from manageAppState in app.component.ts - ${JSON.stringify(
          error
        )}`
      });
      // this.splashScreen.hide();
    }
  }

  private hasOpenVisit(params) {
    const { storageState, storedVisit } = params;

    this.activityService.isVisitStillOpen().subscribe(
      async (visitStillOpenResponse) => {
        const visitStillOpen = visitStillOpenResponse.body;
        if (visitStillOpen) {
          this.dispatchLog({
            type: 'info',
            message: `User ${this.authService.getOid()} visit checked restoring page(s)`,
            timestamp: Date.now()
          });

          this.visitService.visit = storedVisit;
          await this.navElem.setPages(JSON.parse(storageState));
          // this.splashScreen.hide();
        } else {
          this.dispatchLog({
            type: 'info',
            message: `User ${this.authService.getOid()} visit not found. Reset to default state`,
            timestamp: Date.now()
          });

          this.clearExpiredVisitData();
          this.setRootPage();
        }
      },
      (error) => {
        this.dispatchLog({
          type: `${LOG_TYPES.ERROR} in hasOpenVisit`,
          timestamp: Date.now(),
          message: `User ${this.authService.getOid()} open visit failed in app.component.ts - ${JSON.stringify(
            error
          )}`
        });
      }
    );
  }

  dispatchLog(log) {
    this.store$.dispatch(new logsActions.SaveLog(log));
  }

  clearExpiredVisitData() {
    this.storageService.delete(STORAGE.ACTIVITIES);
    this.storageService.delete(STORAGE.VISIT);
    this.storageService.delete(STORAGE.STATE);
    this.activityService.waitTimeStarted = false;
    this.visitService.visit = {} as VisitModel;
    this.activityService.activities = [];
    clearTimeout(this.activityService.waitTimer);
  }

  navigateToSignature(): void {
    if (!this.appService.isSignatureRegistered) {
      this.navElem
        .push(PAGE_NAMES.SIGNATURE_PAD_PAGE, { navController: this.navElem })
        .then(() => {
          this.events.subscribe(SIGNATURE_STATUS.SAVED_EVENT, () => {
            this.events.unsubscribe(SIGNATURE_STATUS.SAVED_EVENT);
            this.setRootPage().then(() => {
              this.manageAppState();
            });
          });
        });
    } else {
      this.manageAppState();
    }
  }

  private accessibilityFeatures(): void {
    this.mobileAccessibility.updateTextZoom();
    this.mobileAccessibility
      .getTextZoom()
      .then((result) => {
        if (result !== ACCESSIBILITY_DEFAULT_VALUES.TEXT_SIZE) {
          this.firebaseLogsService.logEvent(FIREBASE.IOS_FONT_SIZE_USAGE);
        }
        this.appService.setAccessibilityTextZoom(result);
      })
      .catch(() => this.appService.setAccessibilityTextZoom(106));
    this.mobileAccessibility.isVoiceOverRunning().then((result) => {
      if (result) {
        this.firebaseLogsService.logEvent(FIREBASE.IOS_VOICEOVER_USAGE);
      }
    });
    this.mobileAccessibility.isInvertColorsEnabled().then((result) => {
      result
        ? this.renderer.setStyle(document.body, 'filter', 'invert(100%)')
        : this.renderer.removeStyle(document.body, 'filter');
    });
    this.mobileAccessibility.isBoldTextEnabled().then((result) => {
      result
        ? this.renderer.addClass(document.body, 'accessibility-bold-text')
        : this.renderer.removeClass(document.body, 'accessibility-bold-text');
    });
  }

  private generateUserDetails(): void {
    let localTesterDetails: TesterDetailsModel = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.TESTER_DETAILS)
    );
    if (localTesterDetails) {
      this.authService.testerDetails = this.authService.setTesterDetails(
        null,
        localTesterDetails.testerId,
        localTesterDetails.testerName,
        localTesterDetails.testerEmail
      );
    } else {
      this.authService.testerDetails = this.authService.setTesterDetails(null);
    }
  }

  private async setRootPage(): Promise<any> {
    await this.navElem.setRoot(PAGE_NAMES.TEST_STATION_HOME_PAGE);
    // this.splashScreen.hide();
    return await this.navElem.popToRoot();
  }

  private setupLogNetworkStatus(): void {
    let log: Log = {
      type: LOG_TYPES.INFO,
      timestamp: Date.now()
    } as Log;

    this.connectedSub = this.network.onDisconnect().subscribe(() => {
      log = {
        ...log,
        message: `User ${this.authService.getOid()} lost connection (connection type ${
          this.network.type
        })`
      };
      this.store$.dispatch(new logsActions.SaveLog(log));
    });

    this.disconnectedSub = this.network.onConnect().subscribe(() => {
      log = {
        ...log,
        message: `User ${this.authService.getOid()} connected (connection type ${
          this.network.type
        })`
      };
      this.store$.dispatch(new logsActions.SaveLog(log));
    });
  }

  ionViewWillLeave() {
    this.appResumeSub.unsubscribe();
    this.authLogSub.unsubscribe();
    this.connectedSub.unsubscribe();
    this.disconnectedSub.unsubscribe();
  }
}
