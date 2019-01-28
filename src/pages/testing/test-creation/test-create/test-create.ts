import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IonicPage, NavController, AlertController, ItemSliding, NavParams, Events } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { PhoneService } from '../../../../providers/natives/phone.service';
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { StateReformingService } from "../../../../providers/global/state-reforming.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { APP, ODOMETER_METRIC } from "../../../../app/app.enums";
import { TestTypesFieldsMetadata } from "../../../../assets/app-data/test-types-data/test-types-fields.metadata";

@IonicPage()
@Component({
  selector: 'page-test-create',
  templateUrl: 'test-create.html',
})
export class TestCreatePage implements OnInit, OnDestroy {
  @ViewChildren('slidingItem') slidingItems: QueryList<ItemSliding>;
  testData: TestModel;
  testTypesFieldsMetadata;
  completedFields = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public phoneService: PhoneService,
              public alertCtrl: AlertController,
              public visitService: VisitService,
              public stateReformingService: StateReformingService,
              private vehicleService: VehicleService,
              private events: Events) {
    this.testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
  }

  ngOnInit() {
    let lastTestIndex = this.visitService.visit.tests.length - 1;
    this.testData = Object.keys(this.visitService.visit).length ? this.visitService.visit.tests[lastTestIndex] : this.navParams.get('test');
    this.stateReformingService.saveNavStack(this.navCtrl);
    this.events.subscribe(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS, (completedFields) => {
      this.completedFields = completedFields;
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS);
  }

  ionViewWillLeave() {
    if (this.slidingItems.length) {
      this.slidingItems.forEach(slidingItem => {
        slidingItem.close();
      });
    }
  }

  doesOdometerDataExist(index: number) {
    return this.testData.vehicles[index].odometerReading.length && this.testData.vehicles[index].odometerMetric.length;
  }

  getOdometerStringToBeDisplayed(index: number) {
    if (this.doesOdometerDataExist(index)) {
      let unit = this.testData.vehicles[index].odometerMetric === ODOMETER_METRIC.KILOMETRES ? 'km' : 'mi';
      return this.vehicleService.formatOdometerReadingValue(this.testData.vehicles[index].odometerReading) + ' ' + unit;
    } else {
      return 'Enter';
    }
  }

  presentSearchVehicle(): void {
    this.navCtrl.push('VehicleLookupPage');
  }

  getVehicleTypeIconToShow(vehicle: VehicleModel) {
    return vehicle.techRecord[0].vehicleType.toLowerCase();
  }

  getTestTypeStatus(testType: TestTypeModel) {
    let isInProgress = true;
    for (let testTypeFieldMetadata of this.testTypesFieldsMetadata) {
      if (testType.id === testTypeFieldMetadata.testTypeId && testTypeFieldMetadata.sections.length) {
        isInProgress = false;
        for (let section of testTypeFieldMetadata.sections) {
          for (let input of section.inputs) {
            if (!testType[input.testTypePropertyName] && testType[input.testTypePropertyName] !== false) {
              isInProgress = true;
            } else {
              if (!this.completedFields.hasOwnProperty(input.testTypePropertyName) && input.testTypePropertyName !== 'result' && input.testTypePropertyName !== 'certificateNumber') {
                this.completedFields[input.testTypePropertyName] = testType[input.testTypePropertyName];
              }
            }
          }
        }
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
        selectedReasons: vehicleTest.abandonment.reasons,
        editMode: false
      });
    }
  }

  onOdometer(index: number) {
    this.navCtrl.push('OdometerReadingPage', {vehicle: this.testData.vehicles[index]});
  }

  launchDialer(): void {
    this.phoneService.callPhoneNumber('00447976824451');
  }

  onRemoveVehicleTest(vehicle: VehicleModel, vehicleTest: TestTypeModel, slidingItem: ItemSliding) {
    slidingItem.close();
    const alert = this.alertCtrl.create({
      title: 'Remove test',
      message: 'This action will remove this test from the vehicle.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeVehicleTest(vehicle, vehicleTest);
          }
        }
      ]
    });

    alert.present();
  }

  removeVehicleTest(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    this.vehicleService.removeTestType(vehicle, vehicleTest);
  }

  isTestAbandoned(vehicleTest: TestTypeModel) {
    return vehicleTest.abandonment.reasons.length > 0;
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
    console.log('Visit: ', this.visitService.visit);
  }

}
