import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { VehicleLookupPage } from '../../../testing/testCreation/vehicleLookup/vehicleLookup';
import { TestsListPage } from '../../../testing/testCreation/testsList/testsList';
import { CompleteTestPage } from '../completeTest/completeTest';
import { TestSummaryPage } from '../testSummary/testSummary';

import { TestReport } from '../../../../models/testReport';
import { Vehicle } from '../../../../models/vehicle';
import { VehicleTest } from '../../../../models/vehicleTest';

@Component({
  selector: 'page-testCreate',
  templateUrl: 'testCreate.html',
})
export class TestCreatePage {

  testReport: TestReport;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
