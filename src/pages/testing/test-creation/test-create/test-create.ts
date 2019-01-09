import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IonicPage, NavController, AlertController, ItemSliding } from 'ionic-angular';
import { TestReportModel } from '../../../../models/tests/test-report.model';
import { PhoneService } from '../../../../providers/natives/phone.service'
import { TestReportService } from "../../../../providers/test-report/test-report.service";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { ODOMETER_METRIC } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-test-create',
  templateUrl: 'test-create.html',
})
export class TestCreatePage implements OnInit {

  testReport: TestReportModel;
  @ViewChildren('slidingItem') slidingItems: QueryList<ItemSliding>;

  constructor(public navCtrl: NavController,
              public phoneService: PhoneService,
              public alertCtrl: AlertController,
              private vehicleService: VehicleService,
              private testReportService: TestReportService) {
  }

  ngOnInit() {
    this.testReport = this.testReportService.getTestReport();
  }

  ionViewWillLeave() {
    if (this.slidingItems.length) {
      this.slidingItems.forEach(slidingItem => {
        slidingItem.close();
      });
    }
  }

  doesOdometerDataExist(index: number) {
    return this.testReport.vehicles[index].odometerReading.length && this.testReport.vehicles[index].odometerMetric.length;
  }

  getOdometerStringToBeDisplayed(index: number) {
    if (this.doesOdometerDataExist(index)) {
      let unit = this.testReport.vehicles[index].odometerMetric === ODOMETER_METRIC.KILOMETRES ? 'km' : 'mi';
      return this.vehicleService.formatOdometerReadingValue(this.testReport.vehicles[index].odometerReading) + ' ' + unit;
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
      this.navCtrl.push('CompleteTestPage', {vehicle: vehicle, vehicleTest: vehicleTest});
    } else {
      this.navCtrl.push('TestAbandoningPage', {
        vehicleTest: vehicleTest,
        selectedReasons: vehicleTest.abandonment.reasons,
        editMode: false
      });
    }
  }

  onOdometer(index: number) {
    this.navCtrl.push('OdometerReadingPage', {vehicle: this.testReport.vehicles[index]});
  }

  reviewTest(): void {
    this.navCtrl.push('TestSummaryPage');
  }

  launchDialer(): void {
    this.phoneService.callPhoneNumber('00447976824451');
  }

  addATFIssue(): void {
    this.navCtrl.push('ATFIssuePage');
  }

  onCancel() {
    this.navCtrl.push('TestCancelPage');
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

  onAbandonVehicleTest(vehicleTest: TestTypeModel) {
    this.navCtrl.push('ReasonsSelectionPage', {vehicleTest: vehicleTest});
  }

  removeVehicleTest(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    this.vehicleService.removeTestType(vehicle, vehicleTest);
  }

  isTestAbandoned(vehicleTest: TestTypeModel) {
    return vehicleTest.abandonment.reasons.length > 0;
  }

}
