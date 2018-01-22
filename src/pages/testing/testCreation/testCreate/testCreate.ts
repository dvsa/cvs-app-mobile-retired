import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { VehicleLookupPage } from '../../../testing/testCreation/vehicleLookup/vehicleLookup';
import { TestsListPage } from '../../../testing/testCreation/testsList/testsList';
import { CompleteTestPage } from '../completeTest/completeTest';
import { TestSummaryPage } from '../testSummary/testSummary';
import { ATFIssuePage } from '../../../atfIssue/atfIssue';

import { TestReport } from '../../../../models/testReport';
import { Vehicle } from '../../../../models/vehicle';
import { VehicleTest } from '../../../../models/vehicleTest';
import { PhoneService } from '../../../../services/phone.service'

/**
 * Generated class for the TestCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-testCreate',
  templateUrl: 'testCreate.html',
})
export class TestCreatePage {

  testReport: TestReport;

  constructor(public navCtrl: NavController, public navParams: NavParams, public phoneService: PhoneService) {
    this.testReport = navParams.get('testReport');
  }
  
  ngOnInit() {
    
  }
	
	presentSearchVehicle() {
		this.navCtrl.push(VehicleLookupPage, {'testReport': this.testReport});
  }
	
	addVehicleTest(vehicle: Vehicle) {
		this.navCtrl.push(TestsListPage, {'vehicle': vehicle});
	}

  openTest(vehicle: Vehicle, vehicleTest: VehicleTest) {
    this.navCtrl.push(CompleteTestPage, {'vehicle': vehicle, 'test': vehicleTest});
  }

  reviewTest() {
    this.navCtrl.push(TestSummaryPage, {'testReport': this.testReport});
  }

  launchDialer() {
    this.phoneService.callPhoneNumber('00447976824451');
  }

  addATFIssue() {
    this.navCtrl.push(ATFIssuePage);
  }

}
