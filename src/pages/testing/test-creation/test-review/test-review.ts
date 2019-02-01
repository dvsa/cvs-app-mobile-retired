import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VisitModel } from "../../../../models/visit/visit.model";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { ODOMETER_METRIC, TEST_TYPE_RESULTS } from "../../../../app/app.enums";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";

@IonicPage()
@Component({
  selector: 'page-test-review',
  templateUrl: 'test-review.html',
})
export class TestReviewPage {
  visit: VisitModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonFunctions: CommonFunctionsService, private vehicleService: VehicleService) {
    this.visit = this.navParams.get('visit');
  }

  getVehicleTypeIconToShow(vehicle: VehicleModel) {
    return vehicle.techRecord[0].vehicleType.toLowerCase();
  }

  getOdometerStringToBeDisplayed(vehicle) {
      let unit = vehicle.odometerMetric === ODOMETER_METRIC.KILOMETRES ? 'km' : 'mi';
      return this.vehicleService.formatOdometerReadingValue(vehicle.odometerReading) + ' ' + unit;
  }
}
