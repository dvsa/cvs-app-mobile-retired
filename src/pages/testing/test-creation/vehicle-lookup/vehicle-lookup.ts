import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VehicleService} from '../../../../providers/vehicle.service';
import {TestReportModel} from '../../../../models/tests/test-report.model';
import {VisitModel} from '../../../../models/visit.model';
import {VehicleModel} from "../../../../models/vehicle.model";
import {TestReportService} from "../../../../providers/test-report/test-report.service";

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html'
})
export class VehicleLookupPage {
  testReport: TestReportModel;
  visit: VisitModel;
  searchVal: string = '';

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private vehicleService: VehicleService,
              private testReportService: TestReportService) {
    this.testReport = this.testReportService.getTestReport();
    this.visit = navParams.get('visit');
  }

  ionViewWillEnter() {
    this.searchVal = '';
  };

  searchVehicle(ev: any): void {
    let searchedValue = ev.target.value;
    this.vehicleService.searchVehicle(searchedValue).subscribe(
        (vehicleFound: VehicleModel) => {
          if (vehicleFound != null) {
            this.navCtrl.push('VehicleDetailsPage', {
                vehicle: vehicleFound
              }
            );
          }
        }
      );
  }

  close(): void {
    if (this.navCtrl.getPrevious().component.name == 'VisitTimelinePage') {
      this.visit.removeTestReport(this.testReport);
    }
    this.navCtrl.pop();
  }
}
