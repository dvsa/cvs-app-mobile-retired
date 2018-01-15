import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { VehicleDetailsPage } from '../vehicleDetails/vehicleDetails';
import { AddDefectPage } from './addDefect/addDefect';
import { DefectDetailsPage } from './defectDetails/defectDetails';

import { Vehicle } from '../../../../models/vehicle';
import { VehicleTest } from '../../../../models/vehicleTest';
import { Defect } from '../../../../models/defect';

@Component({
  selector: 'page-completeTest',
  templateUrl: 'completeTest.html'
})
export class CompleteTestPage {

  vehicle: Vehicle;
  vehicleTest: VehicleTest; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTest = navParams.get('test');
  }

  finishTest() {
    this.vehicleTest.endVehicleTest();
    this.navCtrl.pop();
  }

  openVehicleDetails() {
    this.navCtrl.push(VehicleDetailsPage, {'vehicle': this.vehicle});
  }

  addDefect() {
    this.navCtrl.push(AddDefectPage, {'test': this.vehicleTest});
  }

  openDefect(defect: Defect) {
    this.navCtrl.push(DefectDetailsPage, {'test':this.vehicleTest, 'defect': defect});
  }

  public convertToNumber(event):number {  return +event; }
}
