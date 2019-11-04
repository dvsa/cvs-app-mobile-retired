import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { ADR_DETAILS, APP_STRINGS, VEHICLE_TYPE } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-vehicle-adr-details',
  templateUrl: 'vehicle-adr-details.html',
})
export class VehicleAdrDetailsPage {
  vehicleData: VehicleModel;
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  ADR_DETAILS: typeof ADR_DETAILS = ADR_DETAILS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;

  constructor(private navParams: NavParams,
              private commonFunc: CommonFunctionsService,
              private viewCtrl: ViewController) {
    this.vehicleData = this.navParams.get('vehicleData');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.VEHICLE_DETAILS);
  }
}
