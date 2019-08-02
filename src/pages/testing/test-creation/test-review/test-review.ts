import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  ViewController,
  NavController,
  NavParams, LoadingController
} from 'ionic-angular';
import { VisitModel } from "../../../../models/visit/visit.model";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import {
  APP,
  APP_STRINGS,
  DATE_FORMAT,
  DEFICIENCY_CATEGORY,
  ODOMETER_METRIC, PAGE_NAMES,
  TEST_REPORT_STATUSES,
  TEST_TYPE_INPUTS,
  TEST_TYPE_RESULTS,
  LOCAL_STORAGE,
  FIREBASE,
  LOG_TYPES,
  VEHICLE_TYPE
} from "../../../../app/app.enums";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { TestTypesFieldsMetadata } from "../../../../assets/app-data/test-types-data/test-types-fields.metadata";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestModel } from "../../../../models/tests/test.model";
import { TestResultService } from "../../../../providers/test-result/test-result.service";
import { TestService } from "../../../../providers/test/test.service";
import { Observable } from "rxjs";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { VisitService } from "../../../../providers/visit/visit.service";
import { catchError, tap } from "rxjs/operators";
import { StateReformingService } from "../../../../providers/global/state-reforming.service";
import { StorageService } from '../../../../providers/natives/storage.service';
import { DefectsService } from "../../../../providers/defects/defects.service";
import { AuthService } from "../../../../providers/global/auth.service";
import { Store } from "@ngrx/store";
import { Log, LogsModel } from "../../../../modules/logs/logs.model";
import * as logsActions from "../../../../modules/logs/logs.actions";
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";
import { ActivityService } from "../../../../providers/activity/activity.service";
import { Firebase } from "@ionic-native/firebase";

@IonicPage()
@Component({
  selector: 'page-test-review',
  templateUrl: 'test-review.html',
})
export class TestReviewPage implements OnInit {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  visit: VisitModel;
  latestTest: TestModel;
  completedFields = [];
  appStrings;
  dateFormat;
  testTypeResults;
  deficiencyCategory;
  submitInProgress: boolean = false;
  isTestSubmitted: string;
  oid: string;
  vehicleBeingReviewed: number;
  vehicle: VehicleModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitService: VisitService,
              public commonFunctions: CommonFunctionsService,
              public viewCtrl: ViewController,
              public defectsService: DefectsService,
              private vehicleService: VehicleService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private testResultService: TestResultService,
              private stateReformingService: StateReformingService,
              private openNativeSettings: OpenNativeSettings,
              private testService: TestService,
              private loadingCtrl: LoadingController,
              private storageService: StorageService,
              private firebase: Firebase,
              private authService: AuthService,
              private store$: Store<LogsModel>,
              private firebaseLogsService: FirebaseLogsService,
              private activityService: ActivityService) {

    this.visit = this.visitService.visit;
    this.latestTest = this.visitService.getLatestTest();

    this.vehicleBeingReviewed = this.navParams.get('vehicleBeingReviewed') || 0;
    this.vehicle = this.latestTest.vehicles[this.vehicleBeingReviewed];
  }

  ngOnInit(): void {
    this.appStrings = APP_STRINGS;
    this.dateFormat = DATE_FORMAT;
    this.testTypeResults = TEST_TYPE_RESULTS;
    this.deficiencyCategory = DEFICIENCY_CATEGORY;
    this.storageService.watchStorage().subscribe(() => {
      this.isTestSubmitted = localStorage.getItem(LOCAL_STORAGE.IS_TEST_SUBMITTED);
      this.isTestSubmitted ? this.viewCtrl.showBackButton(false) : this.viewCtrl.showBackButton(true);
    });

    this.viewCtrl.setBackButtonText(this.navParams.get('backButtonText') || APP_STRINGS.TEST);
  }

  getVehicleTypeIconToShow(vehicle: VehicleModel) {
    return vehicle.techRecord.vehicleType.toLowerCase();
  }

  getOdometerStringToBeDisplayed(vehicle) {
    let unit = vehicle.odometerMetric === ODOMETER_METRIC.KILOMETRES ? 'km' : 'mi';
    return this.vehicleService.formatOdometerReadingValue(vehicle.odometerReading) + ' ' + unit;
  }

  completeFields(testType) {
    if (testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] = testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT];
    }
    if (testType[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER] = testType[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER];
    }
    if (testType[TEST_TYPE_INPUTS.SIC_LAST_DATE]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = testType[TEST_TYPE_INPUTS.SIC_LAST_DATE];
    }
  }

  getTestTypeOptionalFieldsToDisplay(testType: TestTypeModel, field) {
    let testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
    for (let testTypeFieldMetadata of testTypesFieldsMetadata) {
      if (testType.testTypeId === testTypeFieldMetadata.testTypeId) {
        return field === 'defects' ? testTypeFieldMetadata.hasDefects : testTypeFieldMetadata.hasNotes;
      }
    }
  }

  /**
   * Opens a test overview page as a modal (sliding from bottom)
   */
  openTestDetailsPage(vehicle, testType) {
    let initialTestType = this.commonFunctions.cloneObject(testType);
    this.completeFields(testType);
    const MODAL = this.modalCtrl.create(PAGE_NAMES.COMPLETE_TEST_PAGE, {
      vehicle: vehicle,
      vehicleTest: testType,
      completedFields: this.completedFields,
      fromTestReview: true
    });
    MODAL.onDidDismiss(data => {
      if (initialTestType[TEST_TYPE_INPUTS.CERTIFICATE_NUMBER] && !data[TEST_TYPE_INPUTS.CERTIFICATE_NUMBER]) {
        this.navCtrl.pop();
      }
    });
    MODAL.present();
  }

  /**
   * Handler for the next button
   * Go to next vehicle if there are vehicles left, otherwise submit test
   */
  goToNextPage() {
    if (this.vehicleBeingReviewed < this.latestTest.vehicles.length - 1)
      this.navCtrl.push(PAGE_NAMES.TEST_REVIEW_PAGE, {
        vehicleBeingReviewed: this.vehicleBeingReviewed + 1,
        backButtonText: this.title
      });
    else this.submitTest();
  }

  goToTestCreatePage() {
    this.navCtrl.push(PAGE_NAMES.TEST_CREATE_PAGE);
  }

  /**
   * Handler for the submit button
   */
  submitTest() {
    if (!this.submitInProgress) {
      const ALERT = this.alertCtrl.create({
        title: APP_STRINGS.SUBMIT_TEST,
        message: APP_STRINGS.SUBMIT_TEST_MESSAGE,
        buttons: [
          {
            text: APP_STRINGS.CANCEL,
            handler: () => {
              this.submitInProgress = false;
            }
          },
          {
            text: APP_STRINGS.SUBMIT,
            handler: () => {
              this.storageService.setItem(LOCAL_STORAGE.IS_TEST_SUBMITTED, 'true');
              this.submitInProgress = true;
              this.latestTest.status = TEST_REPORT_STATUSES.SUBMITTED;
              this.testService.endTestReport(this.latestTest);
              this.submit(this.latestTest);
            }
          }
        ]
      });
      ALERT.present();
    }
  }

  /**
   * Algorithm to submit a test containing multiple vehicles
   */
  submit(test) {
    let stack: Observable<any>[] = [];
    this.oid = this.authService.getOid();
    const TRY_AGAIN_ALERT = this.alertCtrl.create({
      title: APP_STRINGS.UNABLE_TO_SUBMIT_TESTS_TITLE,
      message: APP_STRINGS.NO_INTERNET_CONNECTION,
      buttons: [{
        text: APP_STRINGS.SETTINGS_BTN,
        handler: () => {
          this.openNativeSettings.open('settings');
        }
      }, {
        text: APP_STRINGS.TRY_AGAIN_BTN,
        handler: () => {
          this.submit(test);
        }
      }]
    });

    TRY_AGAIN_ALERT.onDidDismiss(() => {
      this.submitInProgress = false;
    });

    const LOADING = this.loadingCtrl.create({
      content: 'Loading...'
    });
    LOADING.present();

    for (let vehicle of test.vehicles) {
      let testResult = this.testResultService.createTestResult(this.visit, test, vehicle);
      stack.push(this.testResultService.submitTestResult(testResult).pipe(catchError((error: any) => {
        const log: Log = {
          type: 'error',
          message: `${this.oid} - ${error.status} ${error.error.errors ? error.error.errors[0] : error.error} for API call to ${error.url} with the body message ${JSON.stringify(testResult)}`,
          timestamp: Date.now(),
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
        return Observable.throw(error);
      })));
      Observable.forkJoin(stack).subscribe(
        (response: any) => {
          const log: Log = {
            type: 'info',
            message: `${this.oid} - ${response[0].status} ${response[0].body} for API call to ${response[0].url}`,
            timestamp: Date.now(),
          };
          this.store$.dispatch(new logsActions.SaveLog(log));
          this.firebaseLogsService.logEvent(FIREBASE.SUBMIT_TEST);
          let activity = this.activityService.createActivityBodyForCall(this.visitService.visit, testResult, false);
          this.activityService.submitActivity(activity).subscribe(
            (resp) => {
              const log: Log = {
                type: LOG_TYPES.INFO,
                message: `${this.oid} - ${resp.status} ${resp.statusText} for API call to ${resp.url}`,
                timestamp: Date.now(),
              };
              this.store$.dispatch(new logsActions.SaveLog(log));
              let activityIndex = this.activityService.activities.map((activity) => activity.endTime).indexOf(testResult.testStartTimestamp);
              if (activityIndex > -1) this.activityService.activities[activityIndex].id = resp.body.id;
              this.activityService.updateActivities();
            },
            (error) => {
              const log: Log = {
                type: LOG_TYPES.ERROR,
                message: `${this.oid} - ${error.status} ${error.error.error} for API call to ${error.url}`,
                timestamp: Date.now(),
              };
              this.store$.dispatch(new logsActions.SaveLog(log));
              this.firebase.logEvent('test_error', {content_type: 'error', item_id: "Wait activity submission failed"});
            });
          this.storageService.removeItem(LOCAL_STORAGE.IS_TEST_SUBMITTED);
          LOADING.dismiss();
          this.submitInProgress = false;
          this.navCtrl.push(PAGE_NAMES.CONFIRMATION_PAGE, {testerEmailAddress: this.visit.testerEmail});
        },
        (error) => {
          LOADING.dismiss();
          TRY_AGAIN_ALERT.present();
          this.firebaseLogsService.logEvent(FIREBASE.TEST_ERROR, FIREBASE.ERROR, FIREBASE.TEST_SUBMISSION_FAILED);
        }
      )
    }
  }

  getCountryStringToBeDisplayed(vehicle: VehicleModel) {
    return this.commonFunctions.getCountryStringToBeDisplayed(vehicle);
  }

  isVehicleOfType(vehicle: VehicleModel, ...vehicleType: VEHICLE_TYPE[]) {
    return this.commonFunctions.checkForMatchInArray(vehicle.techRecord.vehicleType, vehicleType);
  }

  get nextButtonText(): string {
    switch (this.latestTest.vehicles.length) {
      case 1:
        return APP_STRINGS.SUBMIT_TEST;
      case this.vehicleBeingReviewed + 1:
        return APP_STRINGS.SUBMIT_TESTS;
      default:
        return APP_STRINGS.NEXT_VEHICLE;
    }
  }

  get title(): string {
    return `Test review ${this.latestTest.vehicles.length > 1 ? ' (' + (this.vehicleBeingReviewed + 1) + ' of ' + this.latestTest.vehicles.length + ')' : ''}`;
  }
}
