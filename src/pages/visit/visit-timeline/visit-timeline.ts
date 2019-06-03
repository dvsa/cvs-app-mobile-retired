import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  Events,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {TestService} from "../../../providers/test/test.service";
import {TestModel} from "../../../models/tests/test.model";
import {VisitService} from "../../../providers/visit/visit.service";
import {VisitModel} from "../../../models/visit/visit.model";
import {StateReformingService} from "../../../providers/global/state-reforming.service";
import {
  APP,
  APP_STRINGS,
  STORAGE,
  TEST_REPORT_STATUSES,
  TEST_TYPE_RESULTS,
  AUTH,
  PAGE_NAMES,
  FIREBASE
} from "../../../app/app.enums";
import {StorageService} from "../../../providers/natives/storage.service";
import {AppService} from "../../../providers/global/app.service";
import {OpenNativeSettings} from '@ionic-native/open-native-settings';
import {AuthService} from "../../../providers/global/auth.service";
import {Store} from "@ngrx/store";
import {Log, LogsModel} from "../../../modules/logs/logs.model";
import * as logsActions from "../../../modules/logs/logs.actions";
import {FirebaseLogsService} from "../../../providers/firebase-logs/firebase-logs.service";

@IonicPage()
@Component({
  selector: 'page-visit-timeline',
  templateUrl: 'visit-timeline.html'
})
export class VisitTimelinePage implements OnInit {
  visit: VisitModel;
  timeline: TestModel[];
  TEST_REPORT_STATUS = TEST_REPORT_STATUSES;
  TEST_TYPE_RESULT = TEST_TYPE_RESULTS;
  changeOpacity: boolean = false;
  oid: string;

  constructor(public navCtrl: NavController,
              public stateReformingService: StateReformingService,
              public loadingCtrl: LoadingController,
              public events: Events,
              public appService: AppService,
              private navParams: NavParams,
              private testReportService: TestService,
              private visitService: VisitService,
              private alertCtrl: AlertController,
              private storageService: StorageService,
              private toastCtrl: ToastController,
              private openNativeSettings: OpenNativeSettings,
              private authService: AuthService,
              private store$: Store<LogsModel>,
              private firebaseLogsService: FirebaseLogsService) {
    this.timeline = [];
  }

  ngOnInit() {
    this.visit = Object.keys(this.visitService.visit).length ? this.visitService.visit : this.visitService.createVisit(this.navParams.get('testStation'));
    this.stateReformingService.saveNavStack(this.navCtrl);
    this.events.subscribe(APP.TEST_SUBMITTED, () => {
      const TOAST = this.toastCtrl.create({
        message: APP_STRINGS.SUBMIT_TEST_TOAST_MESSAGE,
        duration: 4000,
        position: 'top',
        cssClass: 'submit-toast'
      });
      TOAST.present();
    });
  }

  ionViewWillEnter() {
    this.createTimeline();
  }

  endVisit(): void {
    this.showConfirm();
  }

  createNewTestReport(): void {
    this.firebaseLogsService.search_vehicle_time.search_vehicle_start_time = Date.now();
    let test = this.testReportService.createTest();
    this.navCtrl.push(PAGE_NAMES.VEHICLE_LOOKUP_PAGE, {test: test});
  }

  private createTimeline(): void {
    this.timeline = [];
    let testReports = this.visitService.getTests();
    testReports.forEach(testReport => {
      this.timeline.push(testReport);
    });
  }

  confirmEndVisit() {
    const LOADING = this.loadingCtrl.create({
      content: APP_STRINGS.END_VISIT_LOADING
    });
    LOADING.present();
    this.oid = this.authService.getOid();
    this.visitService.endVisit(this.visit.id).subscribe(
      (response) => {
        const log: Log = {
          type: 'info',
          message: `${this.oid} - ${response.status} ${response.statusText} for API call to ${response.url}`,
          timestamp: Date.now(),
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
        this.storageService.delete(STORAGE.VISIT);
        this.storageService.delete(STORAGE.STATE);
        this.visitService.visit = {} as VisitModel;
        LOADING.dismiss();
        this.navCtrl.push(PAGE_NAMES.END_VISIT_CONFIRM_PAGE, {testStationName: this.visit.testStationName});
      }, (error) => {
        const log: Log = {
          type: 'error',
          message: `${this.oid} - ${error.status} ${error.error.error} for API call to ${error.url}`,
          timestamp: Date.now(),
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
        LOADING.dismiss();
        this.firebaseLogsService.logEvent(FIREBASE.TEST_ERROR, FIREBASE.ERROR, FIREBASE.ENDING_ACTIVITY_FAILED);
        if (error && error.error === AUTH.INTERNET_REQUIRED) {
          const TRY_AGAIN_ALERT = this.alertCtrl.create({
            title: APP_STRINGS.UNABLE_TO_END_VISIT,
            message: APP_STRINGS.NO_INTERNET_CONNECTION,
            buttons: [{
              text: APP_STRINGS.SETTINGS_BTN,
              handler: () => {
                this.openNativeSettings.open('settings');
              }
            },
              {
                text: APP_STRINGS.TRY_AGAIN_BTN,
                handler: () => {
                  this.confirmEndVisit();
                }
              }]
          });
          TRY_AGAIN_ALERT.present();
        }
      });
  }

  showConfirm(): void {
    this.changeOpacity = true;

    const CONFIRM = this.alertCtrl.create({
      title: APP_STRINGS.END_VISIT_TITLE,
      message: `${APP_STRINGS.END_VISIT_MSG}${this.visit.testStationName}.`,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          role: 'cancel'
        },
        {
          text: APP_STRINGS.END_VISIT_TITLE,
          handler: () => {
            this.confirmEndVisit();
          }
        }
      ]
    });
    CONFIRM.present();
    CONFIRM.onDidDismiss(() => this.changeOpacity = false);
  }
}
