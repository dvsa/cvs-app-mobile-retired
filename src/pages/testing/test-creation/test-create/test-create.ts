import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ItemSliding} from 'ionic-angular';
import { TestReportModel } from '../../../../models/test-report.model';
import { VehicleModel } from '../../../../models/vehicle.model';
import { VehicleTestModel } from '../../../../models/vehicle-test.model';
import { PhoneService } from '../../../../providers/natives/phone.service'

@IonicPage()
@Component({
  selector: 'page-test-create',
  templateUrl: 'test-create.html',
})
export class TestCreatePage {

  testReport: TestReportModel;
  @ViewChildren('slidingItem') slidingItems: QueryList<ItemSliding>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public phoneService: PhoneService,
              public alertCtrl: AlertController) {
    this.testReport = navParams.get('testReport');
  }

  ionViewWillLeave() {
    if(this.slidingItems.length) {
      this.slidingItems.forEach(slidingItem => {
        slidingItem.close();
      });
    }
  }

	presentSearchVehicle(): void {
		this.navCtrl.push('VehicleLookupPage', {testReport: this.testReport});
  }

	addVehicleTest(vehicle: VehicleModel): void {
		this.navCtrl.push('TestsListPage', {vehicle: vehicle});
	}

  openTest(vehicle: VehicleModel, vehicleTest: VehicleTestModel): void {
    this.navCtrl.push('CompleteTestPage', {vehicle: vehicle, vehicleTest: vehicleTest});
  }

  reviewTest(): void {
    this.navCtrl.push('TestSummaryPage', {testReport: this.testReport});
  }

  launchDialer(): void {
    this.phoneService.callPhoneNumber('00447976824451');
  }

  addATFIssue(): void {
    this.navCtrl.push('ATFIssuePage');
  }

  onRemoveVehicleTest(vehicle: VehicleModel, vehicleTest: VehicleTestModel, slidingItem: ItemSliding) {
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

  removeVehicleTest(vehicle: VehicleModel, vehicleTest: VehicleTestModel) {
    vehicle.removeVehicleTest(vehicleTest);
  }

}
