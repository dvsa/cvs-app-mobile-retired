import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VehicleModel} from '../../../../models/vehicle.model';
import {VehicleTestModel} from '../../../../models/vehicle-test.model';
import {DefectModel} from '../../../../models/defect.model';

@IonicPage()
@Component({
  selector: 'page-complete-test',
  templateUrl: 'complete-test.html'
})
export class CompleteTestPage {
  vehicle: VehicleModel;
  vehicleTest: VehicleTestModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTest = navParams.get('test');
  }

  finishTest(): void {
    this.vehicleTest.endVehicleTest();
    this.navCtrl.pop();
  }

  openVehicleDetails(): void {
    this.navCtrl.push('VehicleDetailsPage', {vehicle: this.vehicle});
  }

  addDefect(): void {
    this.navCtrl.push('AddDefectPage', {test: this.vehicleTest});
  }

  openDefect(defect: DefectModel): void {
    this.navCtrl.push('DefectDetailsPage', {test: this.vehicleTest, defect: defect});
  }

  public convertToNumber(event): number {
    return +event;
  }
}
