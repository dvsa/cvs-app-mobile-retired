import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { VehicleDetailsPage } from '../../../testing/testCreation/vehicleDetails/vehicleDetails';

import { VehicleService } from '../../../../services/vehicle.service';

import { TestReport } from '../../../../models/testReport';
import { Visit } from '../../../../models/visit';

@Component({
  selector: 'page-vehicleLookup',
  templateUrl: 'vehicleLookup.html'
})
export class VehicleLookupPage {

  testReport: TestReport;
  visit: Visit;

  constructor(public navCtrl: NavController, private navParams: NavParams, private vehicleService: VehicleService) {
    this.testReport = navParams.get('testReport');
    this.visit = navParams.get('visit');
  }

  searchVehicle(ev: any) {
    let searchedValue = ev.target.value;

    this.vehicleService.searchVehicle(searchedValue).subscribe(vehicleFound => {
      if (vehicleFound != null) {
        this.navCtrl.push(VehicleDetailsPage, {'testReport': this.testReport, 'vehicle': vehicleFound});
      }
    });
  }

  close() {
    if (this.navCtrl.getPrevious().component.name == "VisitTimelinePage") {
      this.visit.removeTestReport(this.testReport);
    }
    this.navCtrl.pop();
  }

}
