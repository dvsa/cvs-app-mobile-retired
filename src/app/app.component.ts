import { Component, Renderer2, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationService } from '../providers/auth/authentication/authentication.service';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { SyncService } from '../providers/global/sync.service';
import { StorageService } from '../providers/natives/storage.service';
import { VisitService } from '../providers/visit/visit.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Subscription } from 'rxjs';
import {
  ACCESSIBILITY_DEFAULT_VALUES,
  FIREBASE,
  PAGE_NAMES,
  SIGNATURE_STATUS,
  STORAGE,
  LOG_TYPES,
  AUTH
} from './app.enums';
import { AppService } from '../providers/global/app.service';
import { ActivityService } from '../providers/activity/activity.service';
// import { FirebaseLogsService } from '../providers/firebase-logs/firebase-logs.service';
import { Network } from '@ionic-native/network';
import { Log } from '../modules/logs/logs.model';
import { LogsProvider } from './../modules/logs/logs.service';
import * as Sentry from 'sentry-cordova';
import { default as AppConfig } from '../../config/application.hybrid';
import to from 'await-to-js';
import { ActivityModel } from '../models/visit/activity.model';
import { VisitModel } from '../models/visit/visit.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) navElem: Nav;
  rootPage: any = PAGE_NAMES.TEST_STATION_HOME_PAGE;

  appResumeSub: Subscription;
  authLogSub: Subscription;
  connectedSub: Subscription;
  disconnectedSub: Subscription;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public visitService: VisitService,
    public activityService: ActivityService,
    public storageService: StorageService,
    private appService: AppService,
    private syncService: SyncService,
    private authenticationService: AuthenticationService,
    private mobileAccessibility: MobileAccessibility,
    private renderer: Renderer2,
    // private firebaseLogsService: FirebaseLogsService,
    private screenOrientation: ScreenOrientation,
    private network: Network,
    private logProvider: LogsProvider
  ) {
    platform.ready().then(() => {
      Sentry.init({
        enabled: !!AppConfig.sentry.SENTRY_DSN,
        dsn: AppConfig.sentry.SENTRY_DSN,
        environment: AppConfig.sentry.SENTRY_ENV
      });

      statusBar.overlaysWebView(true);
      statusBar.styleLightContent();
      splashScreen.hide();

      // this.initApp();

      // Mobile accessibility
      if (this.appService.isCordova) {
        this.accessibilityFeatures();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      }

      // Resuming app from background Mobile Accessibility
      this.appResumeSub = this.platform.resume.subscribe(() => {
        this.accessibilityFeatures();
        this.syncService.checkForUpdate();
      });

      // TOOD: Remove logging after the white screen bug is resolved
      // CVSB: 17584
      this.setupLogNetworkStatus();
    });
  }

  // async initApp() {
  //   // await this.appService.manageAppInit();
  //   await this.authenticationService.initialiseAuth();
  //   await this.authenticationService.expireTokens();

  //   const isAuthenticated = await this.authenticationService.isAuthenticated();
  //   if (!isAuthenticated) {
  //     await this.authenticationService.login();
  //     console.log('Loggin success!!!');
  //   }

  //   // const { action } = await this.authenticationService.isUserAuthenticated();
  //   // if (action === AUTH.RE_LOGIN || action === AUTH.INTERNET_REQUIRED) {
  //   // await this.navElem.setRoot(PAGE_NAMES.LOGIN_PAGE);
  //   // }

  //   //if (action === AUTH.CONTINUE) {
  //   // if (!this.appService.isSignatureRegistered) {
  //   //   await this.navElem.setRoot(PAGE_NAMES.SIGNATURE_PAD_PAGE);
  //   // } else {
  //   //   this.manageAppState();
  //   // }
  //   //}

  //   //this.manageAppStateListeners();
  // }

  // async ngOnInit() {
  //   // await this.authenticationService.auth.logout();
  //   await this.appService.manageAppInit();

  //   try {
  //     await this.authenticationService.login();
  //     await this.navigateToSignature();
  //   } catch (error) {
  //     await this.setRootPage();
  //     console.error(`Authentication failed due to: ${JSON.stringify(error)}`);
  //   } finally {
  //     // loadingIndicator.dismiss();
  //   }
  // }

  async ngOnInit() {
    await this.appService.manageAppInit();

    const { action } = await this.authenticationService.isUserAuthenticated();
    if (action === AUTH.RE_LOGIN || action === AUTH.INTERNET_REQUIRED) {
      await this.navElem.setRoot(PAGE_NAMES.LOGIN_PAGE);
    }

    if (action === AUTH.CONTINUE) {
      if (!this.appService.isSignatureRegistered) {
        await this.navElem.setRoot(PAGE_NAMES.SIGNATURE_PAD_PAGE);
      } else {
        this.manageAppState();
      }
    }
    this.manageAppStateListeners();
  }

  manageAppStateListeners() {
    this.events.subscribe(SIGNATURE_STATUS.SAVED_EVENT, async () => {
      this.events.unsubscribe(SIGNATURE_STATUS.SAVED_EVENT);
      await this.manageAppState();
    });

    this.events.subscribe(SIGNATURE_STATUS.PRE_REGISTERED, async () => {
      this.events.unsubscribe(SIGNATURE_STATUS.PRE_REGISTERED);
      await this.manageAppState();
    });
  }

  // async navigateToSignature() {
  //   if (!this.appService.isSignatureRegistered) {
  //     await this.navElem.setRoot(PAGE_NAMES.SIGNATURE_PAD_PAGE);

  //     this.events.subscribe(SIGNATURE_STATUS.SAVED_EVENT, async () => {
  //       this.events.unsubscribe(SIGNATURE_STATUS.SAVED_EVENT);
  //       await this.manageAppState();
  //     });
  //   } else {
  //     await this.manageAppState();
  //   }
  // }

  async manageAppState() {
    let error, storageState, storedVisit, storedActivities;

    [error, storageState] = await to(this.storageService.read(STORAGE.STATE));
    if (storageState) {
      let parsedArr = JSON.parse(storageState);
      this.navElem.setPages(parsedArr).then(() => this.splashScreen.hide());
    } else {
      this.setRootPage();
    }

    [error, storedVisit] = await to(this.storageService.read(STORAGE.VISIT));
    this.visitService.visit = storedVisit || ({} as VisitModel);

    [error, storedActivities] = await to(this.storageService.read(STORAGE.ACTIVITIES));
    this.activityService.activities = storedActivities || ([] as ActivityModel[]);

    // if (error) {
    //   const { testerId } = this.authenticationService.tokenInfo;
    //   this.logProvider.dispatchLog({
    //     type: `${LOG_TYPES.ERROR}`,
    //     timestamp: Date.now(),
    //     message: `User ${testerId} failed from manageAppState in app.component.ts - ${JSON.stringify(
    //       error
    //     )}`
    //   });
    // }
  }

  private accessibilityFeatures(): void {
    this.mobileAccessibility.updateTextZoom();
    this.mobileAccessibility
      .getTextZoom()
      .then((result) => {
        if (result !== ACCESSIBILITY_DEFAULT_VALUES.TEXT_SIZE) {
          // this.firebaseLogsService.logEvent(FIREBASE.IOS_FONT_SIZE_USAGE);
        }
        this.appService.setAccessibilityTextZoom(result);
      })
      .catch(() => this.appService.setAccessibilityTextZoom(106));
    this.mobileAccessibility.isVoiceOverRunning().then((result) => {
      if (result) {
        // this.firebaseLogsService.logEvent(FIREBASE.IOS_VOICEOVER_USAGE);
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

  // private async setRootPage(): Promise<any> {
  //   await this.navElem.setRoot(PAGE_NAMES.TEST_STATION_HOME_PAGE);
  //   this.splashScreen.hide();
  //   return this.navElem.popToRoot();
  // }

  private async setRootPage(): Promise<any> {
    const isRootPage =
      this.navElem.getActive() &&
      this.navElem.getActive().name === PAGE_NAMES.TEST_STATION_HOME_PAGE;

    if (!isRootPage) {
      await this.navElem.setRoot(PAGE_NAMES.TEST_STATION_HOME_PAGE);
    }

    this.splashScreen.hide();
  }

  private setupLogNetworkStatus(): void {
    let log: Log = {
      type: LOG_TYPES.INFO,
      timestamp: Date.now()
    } as Log;

    this.connectedSub = this.network.onDisconnect().subscribe(() => {
      log = {
        ...log,
        message: `User ${this.authenticationService.tokenInfo.testerId}
        lost connection (connection type ${this.network.type})
        `
      };

      this.logProvider.dispatchLog(log);
    });

    this.disconnectedSub = this.network.onConnect().subscribe(() => {
      log = {
        ...log,
        message: `User ${this.authenticationService.tokenInfo.testerId}
        connected (connection type ${this.network.type})
        `
      };

      this.logProvider.dispatchLog(log);
    });
  }

  ionViewWillLeave() {
    this.appResumeSub.unsubscribe();
    this.authLogSub.unsubscribe();
    this.connectedSub.unsubscribe();
    this.disconnectedSub.unsubscribe();
  }
}
