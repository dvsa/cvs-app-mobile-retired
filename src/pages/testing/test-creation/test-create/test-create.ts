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
import { PhoneService } from '../../../../providers/natives/phone.service';
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { StateReformingService } from "../../../../providers/global/state-reforming.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import {
  APP,
  APP_STRINGS,
  ODOMETER_METRIC,
  TEST_COMPLETION_STATUS,
  TEST_TYPE_INPUTS,
  TEST_TYPE_RESULTS
} from "../../../../app/app.enums";
import { TestTypesFieldsMetadata } from "../../../../assets/app-data/test-types-data/test-types-fields.metadata";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { CountryOfRegistrationData } from "../../../../assets/app-data/country-of-registration/country-of-registration.data";

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
  countriesArr = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public phoneService: PhoneService,
              public alertCtrl: AlertController,
              public visitService: VisitService,
              public stateReformingService: StateReformingService,
              private vehicleService: VehicleService,
              private events: Events,
              private commonFunctions: CommonFunctionsService,
              private modalCtrl: ModalController) {
    this.testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
  }

  ngOnInit() {
    this.testCompletionStatus = TEST_COMPLETION_STATUS;
    let lastTestIndex = this.visitService.visit.tests.length - 1;
    this.testData = Object.keys(this.visitService.visit).length ? this.visitService.visit.tests[lastTestIndex] : this.navParams.get('test');
  }

  ionViewWillEnter() {
    if (this.visitService.caching == 'true') this.stateReformingService.saveNavStack(this.navCtrl);
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
      let unit = this.testData.vehicles[index].odometerMetric === ODOMETER_METRIC.KILOMETRES ? 'km' : 'mi';
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
    this.navCtrl.push('TestTypesListPage', {vehicleData: vehicle});
  }

  onVehicleDetails(vehicle: VehicleModel) {
    this.navCtrl.push('VehicleDetailsPage', {vehicle: vehicle, fromTestCreatePage: true});
  }

  openTest(vehicle: VehicleModel, vehicleTest: TestTypeModel): void {
    if (!this.isTestAbandoned(vehicleTest)) {
      this.navCtrl.push('CompleteTestPage', {
        vehicle: vehicle,
        vehicleTest: vehicleTest,
        completedFields: this.completedFields
      });
    } else {
      this.navCtrl.push('TestAbandoningPage', {
        vehicleTest: vehicleTest,
        selectedReasons: vehicleTest.reasons,
        editMode: false
      });
    }
  }

  onOdometer(index: number) {
    this.navCtrl.push('OdometerReadingPage', {vehicle: this.testData.vehicles[index]});
  }

  onCountryOfRegistration(vehicle: VehicleModel) {
    const MODAL = this.modalCtrl.create('RegionReadingPage', {
      vehicle: vehicle
    });
    MODAL.present();
  }

  onVehicleCategory(vehicle: VehicleModel) {
    const MODAL = this.modalCtrl.create('CategoryReadingPage', {
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
    this.navCtrl.push('ReasonsSelectionPage', {vehicleTest: vehicleTest});
  }

  onCancel() {
    this.navCtrl.push('TestCancelPage', {
      test: this.testData
    });
  }

  reviewTest(): void {
    let finishedTest;
    let requiredFieldsCompleted = true;
    for (let vehicle of this.testData.vehicles) {
      if (!vehicle.countryOfRegistration || !vehicle.euVehicleCategory || !vehicle.odometerReading) {
        requiredFieldsCompleted = false;
      }
      finishedTest = vehicle.testTypes.every((test: TestTypeModel) => {
        return test.completionStatus != TEST_COMPLETION_STATUS.IN_PROGRESS || test.testResult === TEST_TYPE_RESULTS.ABANDONED;
      });
    }
    if (!finishedTest || !requiredFieldsCompleted) {
      let alert = this.alertCtrl.create({
        title: APP_STRINGS.TEST_NOT_COMPLETE,
        subTitle: APP_STRINGS.COMPLETE_ALL_TESTS,
        buttons: [APP_STRINGS.OK]
      });
      alert.present();
    } else {
      this.navCtrl.push('TestReviewPage', {visit: this.visitService.visit})
    }
  }
}
