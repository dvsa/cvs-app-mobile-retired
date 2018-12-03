import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TestReportModel} from '../../../../models/test-report.model';
import {VehicleModel} from '../../../../models/vehicle.model';

@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html'
})
export class VehicleDetailsPage {
  testReport: TestReportModel;
  vehicle: VehicleModel;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.testReport = navParams.get('testReport');
    this.vehicle = navParams.get('vehicle');
  }

  addVehicle(): void {
    let self = this;
    this.testReport.addVehicle(this.vehicle);
    if (self.navCtrl.getByIndex(self.navCtrl.length() - 3).component.name == 'VisitTimelinePage') {
      this.navCtrl.insert(this.navCtrl.length() - 2, 'TestCreatePage', {testReport: this.testReport})
        .then(() => {
            self.navCtrl.popTo(self.navCtrl.getByIndex(self.navCtrl.length() - 3));
          }
        );
    } else {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
    }
  }

  goToPreparerPage(): void {
    this.testReport.addVehicle(this.vehicle);
    this.navCtrl.push('AddPreparerPage', {testReport: this.testReport});
  }

  refuseVehicle(): void {

  }
}
