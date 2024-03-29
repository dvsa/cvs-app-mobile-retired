import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertController,
  Events,
  IonicPage,
  LoadingController,
  Loading,
  NavController,
  NavParams,
  ModalController,
  Alert
} from 'ionic-angular';
import { TestService } from '../../../providers/test/test.service';
import { VisitService } from '../../../providers/visit/visit.service';
import { VisitModel } from '../../../models/visit/visit.model';
import { StateReformingService } from '../../../providers/global/state-reforming.service';
import {
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_EVENTS,
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_VALUE,
  APP_STRINGS,
  STORAGE,
  TEST_REPORT_STATUSES,
  TEST_TYPE_RESULTS,
  AUTH,
  PAGE_NAMES,
  VISIT,
  LOG_TYPES,
  VEHICLE_TYPE,
} from '../../../app/app.enums';
import { StorageService } from '../../../providers/natives/storage.service';
import { AppService, AnalyticsService } from '../../../providers/global';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { AuthenticationService } from '../../../providers/auth/authentication/authentication.service';
import { ActivityModel } from '../../../models/visit/activity.model';
import { ActivityService } from '../../../providers/activity/activity.service';
import { FormatVrmPipe } from '../../../pipes/format-vrm/format-vrm.pipe';
import { VehicleModel } from '../../../models/vehicle/vehicle.model';
import { Observable, Subscription } from 'rxjs';
import { LogsProvider } from '../../../modules/logs/logs.service';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-visit-timeline',
  templateUrl: 'visit-timeline.html'
})
export class VisitTimelinePage implements OnInit, OnDestroy {
  visit: VisitModel;
  timeline: any[];
  TEST_REPORT_STATUS = TEST_REPORT_STATUSES;
  TEST_TYPE_RESULT = TEST_TYPE_RESULTS;
  VISIT_TYPE = VISIT;
  changeOpacity: boolean = false;
  oid: string;
  timeout;
  isCreateTestEnabled = true;
  platformSubscription: Subscription;

  loading: Loading;
  confirmVisit$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public stateReformingService: StateReformingService,
    public loadingCtrl: LoadingController,
    public events: Events,
    public appService: AppService,
    private navParams: NavParams,
    private testReportService: TestService,
    public visitService: VisitService,
    public activityService: ActivityService,
    private alertCtrl: AlertController,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private openNativeSettings: OpenNativeSettings,
    private analyticsService: AnalyticsService,
    private modalCtrl: ModalController,
    private formatVrmPipe: FormatVrmPipe,
    private logProvider: LogsProvider,
  ) {
    this.timeline = [];
    // this.platform.ready().then(() => {
    //   this.platformSubscription = this.platform.resume.subscribe(() => {
    //     this.waitTimeHandler();
    //   })
    // });
  }

  ngOnInit() {
    this.visit = Object.keys(this.visitService.visit).length
      ? this.visitService.visit
      : this.visitService.createVisit(this.navParams.get('testStation'));
    this.stateReformingService.saveNavStack(this.navCtrl);
  }

  ngOnDestroy(): void {
    // if (this.platformSubscription) {
    //   this.platformSubscription.unsubscribe();
    // }
  }

  ionViewWillEnter() {
    this.createTimeline();
  }

  ionViewDidEnter() {
    this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VISIT_TIMELINE);
    // this.waitTimeHandler();
  }

  endVisit(): void {
    this.showConfirm(this.visit);
  }

  createNewTestReport(): void {
    let test = this.testReportService.createTest();
    this.navCtrl.push(PAGE_NAMES.VEHICLE_LOOKUP_PAGE, { test: test });
    // clearTimeout(this.activityService.waitTimer);
  }

  createTimeline(): void {
    this.timeline = [];
    let tempTimeline = [];
    let activities = this.activityService.getActivities();
    activities.forEach((activity) => {
      tempTimeline.push(activity);
    });

    let testReports = this.visitService.getTests();
    testReports.forEach((testReport) => {
      tempTimeline.push(testReport);
    });

    this.timeline = [...tempTimeline].sort((a, b) => {
      return Date.parse(a.startTime) - Date.parse(b.startTime);
    });
  }

  showConfirm(visit: VisitModel): void {
    this.changeOpacity = true;
    let alert: Alert = null;

    if (this.activityService.checkWaitTimeReasons(this.activityService.activities)) {
      alert = this.alertCtrl.create({
        title: APP_STRINGS.END_VISIT_WAITING_TITLE,
        message: APP_STRINGS.END_VISIT_WAITING_MSG,
        buttons: [APP_STRINGS.OK]
      });
    } else {
      alert = this.alertCtrl.create({
        title: APP_STRINGS.END_VISIT_TITLE,
        message: `${APP_STRINGS.END_VISIT_MSG}${visit.testStationName}.`,
        buttons: [
          {
            text: APP_STRINGS.CANCEL,
            cssClass: 'cancel-end-visit-btn',
            role: APP_STRINGS.CANCEL.toLowerCase()
          },
          {
            text: APP_STRINGS.END_VISIT_TITLE,
            cssClass: 'confirm-end-visit-btn',
            handler: () => {
              this.confirmVisit$ = this.confirmEndVisit$();
            }
          }
        ]
      });
    }
    alert.present();
    alert.onDidDismiss(() => (this.changeOpacity = false));
  }

  showLoading(loadingText: string) {
    if (loadingText) {
      this.loading = this.loadingCtrl.create({
        content: loadingText
      });

      this.loading.present();
    } else {
      this.loading.dismiss();
    }
  }

  getVehicleIdentifier(vehicle: VehicleModel) {
    return vehicle.techRecord.vehicleType === VEHICLE_TYPE.TRL
      ? vehicle.trailerId
      : this.formatVrmPipe.transform(vehicle.vrm);
  }

  confirmEndVisit$(): Observable<any> {
    this.isCreateTestEnabled = false;

    this.showLoading(APP_STRINGS.END_VISIT_LOADING);

    this.oid = this.authenticationService.tokenInfo.oid;

    return this.visitService.endVisit(this.visit.id).pipe(
      mergeMap((endVisitResp) => {
        const { wasVisitAlreadyClosed } = endVisitResp.body;

        this.logProvider.dispatchLog({
          type: LOG_TYPES.INFO,
          message: `${this.oid} - ${endVisitResp.status} ${endVisitResp.statusText}
          for API call to ${endVisitResp.url}. Visit closed automatically ${wasVisitAlreadyClosed}`,
          timestamp: Date.now()
        });

        this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.VISIT,
          event: ANALYTICS_EVENTS.SUBMIT_VISIT
        });

        clearTimeout(this.activityService.waitTimer);

        return wasVisitAlreadyClosed
          ? this.siteAlreadyClosedAlert(wasVisitAlreadyClosed)
          : of(wasVisitAlreadyClosed); /** false - manual intervention*/
      }),
      filter((closedState) => !closedState),
      mergeMap(() => this.activityService.createActivityToPost$(
        this.timeline, this.visit, this.oid,
      )),
      mergeMap((activities: ActivityModel[]) => this.createActivityReasonsToPost$(activities)),
      catchError((error) => {
        this.showLoading('');

        this.logProvider.dispatchLog({
          type: 'error-visitService.endVisit-confirmEndVisit in visit-timeline.ts',
          message: `${this.oid} - ${JSON.stringify(error)}`,
          timestamp: Date.now()
        });

        this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
          event: ANALYTICS_EVENTS.TEST_ERROR,
          label: ANALYTICS_VALUE.ENDING_ACTIVITY_FAILED
        });

        return this.endVisitError$(error);
      })
    );
  }

  siteAlreadyClosedAlert(status: boolean): Observable<boolean> {
    const NOTIFICATION_ALERT = this.alertCtrl.create({
      title: APP_STRINGS.SITE_VISIT_CLOSED_TITLE,
      message: APP_STRINGS.SITE_VISIT_CLOSED_MESSAGE,
      buttons: [
        {
          text: APP_STRINGS.OK,
          handler: () => {
            this.onUpdateActivityReasonsSuccess();
          }
        }
      ]
    });

    NOTIFICATION_ALERT.present();
    return of(status);
  }

  private endVisitError$(receivedErr: any): Observable<any> {
    if (receivedErr) {
      if (receivedErr.error === AUTH.INTERNET_REQUIRED) {
        const TRY_AGAIN_ALERT = this.alertCtrl.create({
          title: APP_STRINGS.UNABLE_TO_END_VISIT,
          message: APP_STRINGS.NO_INTERNET_CONNECTION,
          buttons: [
            {
              text: APP_STRINGS.SETTINGS_BTN,
              handler: () => {
                this.openNativeSettings.open('settings');
              }
            },
            {
              text: APP_STRINGS.TRY_AGAIN_BTN,
              handler: () => {
                this.confirmVisit$ = this.confirmEndVisit$();
              }
            }
          ]
        });

        return of(TRY_AGAIN_ALERT.present());
      } else {
        return of(this.onUpdateActivityReasonsSuccess());
      }
    }
  }

  /**
   * Begins the counter for the wait time handling service
   */
  waitTimeHandler(): void {
    if (this.activityService.canAddOtherWaitingTime(this.timeline)) {
      if (this.activityService.have5MinutesPassedSinceVisitOrLastTest(this.visit)) {
        this.activityService.createWaitTime(this.timeline, this.visit);
      }
      else if (!this.activityService.waitTimeStarted) {
        let counterTime: number = this.activityService.counterTime -
          this.activityService.minutesPassedSinceVisitOrLastTest(this.visit);
        clearTimeout(this.activityService.waitTimer);
        this.activityService.waitTimer = window.setTimeout(
          () => {
            this.activityService.createWaitTime(this.timeline, this.visit);
          },
          counterTime * 1000 * 60,
          []
        );
      }
    }
  }

  /**
   * displays a modal to allow the editing of a wait time
   * @param activity the wait time being clicked
   */
  async editWaitTime(activity: ActivityModel) {
    const MODAL = this.modalCtrl.create(PAGE_NAMES.WAIT_TIME_REASONS_PAGE, {
      waitActivity: activity
    });
    MODAL.onDidDismiss((data) => {
      activity.waitReason = data.waitActivity.waitReason;
      activity.notes = data.waitActivity.notes;
      this.activityService.updateActivities();
    });
    if (activity.activityType === VISIT.ACTIVITY_TYPE_WAIT) {
      await MODAL.present();
    }
  }

  /**
   * removes items from local storage and navigates to the confirmation page
   * @return {boolean} true when function has finished
   */
  onUpdateActivityReasonsSuccess(): boolean {
    this.storageService.delete(STORAGE.VISIT);
    this.storageService.delete(STORAGE.STATE);
    this.storageService.delete(STORAGE.ACTIVITIES);
    this.activityService.waitTimeStarted = false;
    this.visitService.visit = {} as VisitModel;
    this.activityService.activities = [];
    this.showLoading('');

    this.navCtrl.push(PAGE_NAMES.CONFIRMATION_PAGE, {
      testStationName: this.visit.testStationName
    });

    return true;
  }

  /**
   * updates each wait time with the wait reason that was selected by the user
   * @param activities
   * @return {Observable<any>}
   */
  createActivityReasonsToPost$(activities: ActivityModel[]): Observable<any> {
    const activityWithReasons = this.activityService.createActivitiesForUpdateCall(activities);
    if (activityWithReasons.length > 0) {
      return this.activityService.updateActivityReasons(activityWithReasons).pipe(
        map((activityReasonResp) => {
          this.logProvider.dispatchLog({
            type: LOG_TYPES.INFO,
            message: `${this.oid} - ${activityReasonResp.status} ${activityReasonResp.statusText}
            for API call to ${activityReasonResp.url}`,
            timestamp: Date.now()
          });
          return this.onUpdateActivityReasonsSuccess();
        }),
        catchError((error) => {
          this.showLoading('');

          this.logProvider.dispatchLog({
            type: `${LOG_TYPES.ERROR}-activityService.updateActivityReasons in visit-timeline.ts`,
            message: `${this.oid} - ${JSON.stringify(error)}`,
            timestamp: Date.now()
          });

          return of(null);
        })
      );
    } else {
      return of(this.onUpdateActivityReasonsSuccess());
    }
  }
}
