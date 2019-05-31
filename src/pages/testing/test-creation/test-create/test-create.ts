import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  AlertController,
  Events,
  IonicPage,
  ItemSliding,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { StateReformingService } from "../../../../providers/global/state-reforming.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import {
  APP,
  APP_STRINGS, FIREBASE,
  ODOMETER_METRIC, PAGE_NAMES,
  TEST_COMPLETION_STATUS,
  TEST_TYPE_INPUTS,
  TEST_TYPE_RESULTS
} from "../../../../app/app.enums";
import { TestTypesFieldsMetadata } from "../../../../assets/app-data/test-types-data/test-types-fields.metadata";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { CountryOfRegistrationData } from "../../../../assets/app-data/country-of-registration/country-of-registration.data";
import { CallNumber } from "@ionic-native/call-number";
import { AppService } from "../../../../providers/global/app.service";
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";

@IonicPage()
@Component({
  selector: 'page-test-create',
  templateUrl: 'test-create.html',
})
export class TestCreatePage implements OnInit {
  @ViewChildren('slidingItem') slidingItems: QueryList<ItemSliding>;
  testData: TestModel;
  testTypesFieldsMetadata;
  testCompletionStatus;
  completedFields = {};
  changeOpacity: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public callNumber: CallNumber,
              public alertCtrl: AlertController,
              public appService: AppService,
              public visitService: VisitService,
              public stateReformingService: StateReformingService,
              private vehicleService: VehicleService,
              private events: Events,
              private commonFunctions: CommonFunctionsService,
              private modalCtrl: ModalController,
              private firebaseLogsService: FirebaseLogsService) {
    this.testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
  }

  ngOnInit() {
    this.stateReformingService.saveNavStack(this.navCtrl);
    this.testCompletionStatus = TEST_COMPLETION_STATUS;
    let lastTestIndex = this.visitService.visit.tests.length - 1;
    this.testData = Object.keys(this.visitService.visit).length ? this.visitService.visit.tests[lastTestIndex] : this.navParams.get('test');
  }

  ionViewWillEnter() {
    this.events.subscribe(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS, (completedFields) => {
      this.completedFields = completedFields;
    });
  }

  ionViewWillLeave() {
    this.events.unsubscribe(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS);
    if (this.slidingItems.length) {
      this.slidingItems.forEach(slidingItem => {
        slidingItem.close();
      });
    }
  }

  getCountryStringToBeDisplayed(vehicle: VehicleModel) {
    let corData = CountryOfRegistrationData.CountryData;
    for (let elem of corData) {
      if (vehicle.countryOfRegistration === elem.key) {
        return elem.value.split(' -')[0];
      }
    }
  }

  doesOdometerDataExist(index: number) {
    if (this.testData.vehicles[index].odometerReading) {
      return this.testData.vehicles[index].odometerReading.length && this.testData.vehicles[index].odometerMetric.length;
    }
  }

  getOdometerStringToBeDisplayed(index: number) {
    if (this.doesOdometerDataExist(index)) {
      let unit = this.commonFunctions.getDistanceType(this.testData.vehicles[index].odometerMetric);
      return this.vehicleService.formatOdometerReadingValue(this.testData.vehicles[index].odometerReading) + ' ' + unit;
    } else {
      return 'Enter';
    }
  }

  getVehicleTypeIconToShow(vehicle: VehicleModel) {
    return vehicle.techRecord.vehicleType.toLowerCase();
  }

  getTestTypeStatus(testType: TestTypeModel) {
    let isInProgress = true;
    for (let testTypeFieldMetadata of this.testTypesFieldsMetadata) {
      if (testType.testTypeId === testTypeFieldMetadata.testTypeId && testTypeFieldMetadata.sections.length) {
        isInProgress = false;
        testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
        for (let section of testTypeFieldMetadata.sections) {
          for (let input of section.inputs) {
            if (!testType[input.testTypePropertyName] && testType[input.testTypePropertyName] !== false) {
              if ((input.testTypePropertyName !== TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER
                && input.testTypePropertyName !== TEST_TYPE_INPUTS.SIC_LAST_DATE) || (testTypeFieldMetadata.category === 'B'
                && (input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER || input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_LAST_DATE))) {
                isInProgress = true;
                testType.completionStatus = TEST_COMPLETION_STATUS.IN_PROGRESS;
              }
            } else {
              if (!this.completedFields.hasOwnProperty(input.testTypePropertyName) && input.testTypePropertyName !== 'testResult' && input.testTypePropertyName !== 'certificateNumber') {
                this.completedFields[input.testTypePropertyName] = testType[input.testTypePropertyName];
              }
            }
          }
        }
      } else if (testType.testTypeId === testTypeFieldMetadata.testTypeId && !testTypeFieldMetadata.sections.length) {
        isInProgress = false;
        testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
      }
    }
    return isInProgress ? 'In progress' : 'Edit';
  }

  addVehicleTest(vehicle: VehicleModel): void {
    this.navCtrl.push(PAGE_NAMES.TEST_TYPES_LIST_PAGE, {vehicleData: vehicle});
  }

  onVehicleDetails(vehicle: VehicleModel) {
    this.navCtrl.push(PAGE_NAMES.VEHICLE_DETAILS_PAGE, {vehicle: vehicle, fromTestCreatePage: true});
  }

  openTest(vehicle: VehicleModel, vehicleTest: TestTypeModel): void {
    if (!this.isTestAbandoned(vehicleTest)) {
      this.navCtrl.push(PAGE_NAMES.COMPLETE_TEST_PAGE, {
        vehicle: vehicle,
        vehicleTest: vehicleTest,
        completedFields: this.completedFields
      });
    } else {
      this.navCtrl.push(PAGE_NAMES.TEST_ABANDONING_PAGE, {
        vehicleTest: vehicleTest,
        selectedReasons: vehicleTest.reasons,
        editMode: false
      });
    }
  }

  onOdometer(index: number) {
    this.firebaseLogsService.add_odometer_reading_time.add_odometer_reading_start_time = Date.now();

    const MODAL = this.modalCtrl.create(PAGE_NAMES.ODOMETER_READING_PAGE, {
      vehicle: this.testData.vehicles[index]
    });
    MODAL.present();
  }

  onCountryOfRegistration(vehicle: VehicleModel) {
    const MODAL = this.modalCtrl.create(PAGE_NAMES.REGION_READING_PAGE, {
      vehicle: vehicle
    });
    MODAL.present();
  }

  onVehicleCategory(vehicle: VehicleModel) {
    const MODAL = this.modalCtrl.create(PAGE_NAMES.CATEGORY_READING_PAGE, {
      vehicle: vehicle
    });
    MODAL.present();
  }

  onRemoveVehicleTest(vehicle: VehicleModel, vehicleTest: TestTypeModel, slidingItem: ItemSliding) {
    slidingItem.close();
    const alert = this.alertCtrl.create({
      title: APP_STRINGS.REMOVE_TEST_TITLE,
      message: APP_STRINGS.REMOVE_TEST_MSG,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          role: 'cancel'
        },
        {
          text: APP_STRINGS.REMOVE,
          handler: () => {
            this.removeVehicleTest(vehicle, vehicleTest);
          }
        }
      ]
    });

    alert.present();
  }

  removeVehicleTest(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    this.vehicleService.removeSicFields(vehicle, this.completedFields);
    this.vehicleService.removeTestType(vehicle, vehicleTest);
  }

  isTestAbandoned(vehicleTest: TestTypeModel) {
    return vehicleTest.reasons.length > 0;
  }

  onAbandonVehicleTest(vehicleTest) {
    this.navCtrl.push(PAGE_NAMES.REASONS_SELECTION_PAGE, {vehicleTest: vehicleTest});
  }

  onCancel() {
    this.navCtrl.push(PAGE_NAMES.TEST_CANCEL_PAGE, {
      test: this.testData
    });
  }

  reviewTest(): void {
    let noTestAdded: boolean;
    this.changeOpacity = true;
    let finishedTest;
    let requiredFieldsCompleted = true;
    for (let vehicle of this.testData.vehicles) {
      if (!vehicle.countryOfRegistration || !vehicle.euVehicleCategory || !vehicle.odometerReading) {
        this.logMissingFields(vehicle);
        requiredFieldsCompleted = false;
      }
      finishedTest = vehicle.testTypes.every((test: TestTypeModel) => {
        return test.completionStatus != TEST_COMPLETION_STATUS.IN_PROGRESS || test.testResult === TEST_TYPE_RESULTS.ABANDONED;
      });
      noTestAdded = vehicle.testTypes.length > 0;
    }
    if (!finishedTest || !requiredFieldsCompleted) {
      let alert = this.alertCtrl.create({
        title: APP_STRINGS.TEST_NOT_COMPLETE,
        subTitle: APP_STRINGS.COMPLETE_ALL_TESTS,
        buttons: [APP_STRINGS.OK]
      });
      alert.present();
      this.firebaseLogsService.logEvent(FIREBASE.TEST_ERROR, FIREBASE.ERROR, FIREBASE.NOT_ALL_TESTS_COMPLETED);
      if (!finishedTest) {
        this.firebaseLogsService.logEvent(FIREBASE.TEST_REVIEW_UNSUCCESSFUL, FIREBASE.NOT_ALL_TESTS_COMPLETED);
      }
      alert.onDidDismiss(() => this.changeOpacity = false);
    } else if (!noTestAdded) {
      let alert = this.alertCtrl.create({
        title: APP_STRINGS.NO_TESTS_ADDED,
        subTitle: APP_STRINGS.PLEASE_ADD_TEST,
        buttons: [APP_STRINGS.OK]
      });
      alert.present();
      this.firebaseLogsService.logEvent(FIREBASE.TEST_ERROR, FIREBASE.ERROR, FIREBASE.NO_TEST_ADDED);
      this.firebaseLogsService.logEvent(FIREBASE.TEST_REVIEW_UNSUCCESSFUL, FIREBASE.MISSING_MADATORY_FIELD, FIREBASE.NO_TEST_ADDED);
      alert.onDidDismiss(() => this.changeOpacity = false);
    } else {
      this.changeOpacity = false;
      this.navCtrl.push(PAGE_NAMES.TEST_REVIEW_PAGE, {visit: this.visitService.visit})
    }
  }

  logMissingFields(vehicle) {
    if (!vehicle.countryOfRegistration) this.firebaseLogsService.logEvent(FIREBASE.TEST_REVIEW_UNSUCCESSFUL, FIREBASE.MISSING_MADATORY_FIELD, FIREBASE.COUNTRY_OF_REGISTRATION);
    if (!vehicle.euVehicleCategory) this.firebaseLogsService.logEvent(FIREBASE.TEST_REVIEW_UNSUCCESSFUL, FIREBASE.MISSING_MADATORY_FIELD, FIREBASE.EU_VEHICLE_CATEGORY);
    if (!vehicle.odometerReading) this.firebaseLogsService.logEvent(FIREBASE.TEST_REVIEW_UNSUCCESSFUL, FIREBASE.MISSING_MADATORY_FIELD, FIREBASE.ODOMETER_READING);
  }
}
