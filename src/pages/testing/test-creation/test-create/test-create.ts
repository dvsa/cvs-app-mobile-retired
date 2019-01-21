import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IonicPage, NavController, AlertController, ItemSliding, NavParams } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { PhoneService } from '../../../../providers/natives/phone.service'
import { TestService } from "../../../../providers/test/test.service";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { StateReformingService } from "../../../../providers/global/state-reforming.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { StorageService } from "../../../../providers/natives/storage.service";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { ODOMETER_METRIC } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-test-create',
  templateUrl: 'test-create.html',
})
export class TestCreatePage implements OnInit {
  @ViewChildren('slidingItem') slidingItems: QueryList<ItemSliding>;
  testData: TestModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public phoneService: PhoneService,
              public alertCtrl: AlertController,
              public visitService: VisitService,
              public stateReformingService: StateReformingService,
              private vehicleService: VehicleService) {
  }

  ngOnInit() {
    let lastTestIndex = this.visitService.visit.tests.length - 1;
    this.testData = Object.keys(this.visitService.visit).length ? this.visitService.visit.tests[lastTestIndex] : this.navParams.get('test');
    this.stateReformingService.saveNavStack(this.navCtrl);
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
        vehicleTest: vehicleTest
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
