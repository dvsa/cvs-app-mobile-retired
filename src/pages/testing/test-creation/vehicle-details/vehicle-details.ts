import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TestReportModel} from '../../../../models/test-report.model';
import {VehicleModel} from '../../../../models/vehicle.model';
import {TestReportService} from "../../../../providers/test-report/test-report.service";

@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html'
})
export class VehicleDetailsPage {
  testReport: TestReportModel;
  vehicle: VehicleModel;

  constructor(public navCtrl: NavController, private navParams: NavParams, private testReportService: TestReportService) {
    this.testReport = this.testReportService.getTestReport();
    this.vehicle = navParams.get('vehicle');
  }

  addVehicle(): void {
    let self = this;
    this.testReportService.addVehicle(this.vehicle);
    if (self.navCtrl.getByIndex(self.navCtrl.length() - 3).component.name == 'VisitTimelinePage') {
      this.navCtrl.insert(this.navCtrl.length() - 2, 'TestCreatePage')
        .then(() => {
            self.navCtrl.popTo(self.navCtrl.getByIndex(self.navCtrl.length() - 3));
          }
        );
    } else {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
    }
  }

  goToPreparerPage(): void {
    this.testReportService.addVehicle(this.vehicle);
    this.navCtrl.push('AddPreparerPage');
  }

  refuseVehicle(): void {

  }
}
