import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { TestReportModel } from '../../../../models/test-report.model';
import { VehicleModel } from '../../../../models/vehicle.model';
import { VehicleTestModel } from '../../../../models/vehicle-test.model';
import { PhoneService } from '../../../../providers/phone.service'

@IonicPage()
@Component({
  selector: 'page-test-create',
  templateUrl: 'test-create.html',
})
export class TestCreatePage {

  testReport: TestReportModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public phoneService: PhoneService) {
    this.testReport = navParams.get('testReport');
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

}
