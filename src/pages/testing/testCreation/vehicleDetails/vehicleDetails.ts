import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TestCreatePage } from '../../../testing/testCreation/testCreate/testCreate';

import { TestReport } from '../../../../models/testReport';
import { Vehicle } from '../../../../models/vehicle';

@Component({
  selector: 'page-vehicleDetails',
  templateUrl: 'vehicleDetails.html'
})
export class VehicleDetailsPage {

  testReport: TestReport;
  vehicle: Vehicle;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.testReport = navParams.get('testReport');
    this.vehicle = navParams.get('vehicle');
  }

  addVehicle() {
    var self = this;

    this.testReport.addVehicle(this.vehicle);

    if (self.navCtrl.getByIndex(self.navCtrl.length()-3).component.name == "VisitTimelinePage") {
      this.navCtrl.insert(this.navCtrl.length()-2, TestCreatePage, {'testReport': this.testReport}).then(() => {
        self.navCtrl.popTo(self.navCtrl.getByIndex(self.navCtrl.length()-3));
      });
    } else {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
    }
  }
}
