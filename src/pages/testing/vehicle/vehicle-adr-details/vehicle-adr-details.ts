import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import {
  ADR_DETAILS,
  ADR_VEHICLE_TYPE,
  APP_STRINGS,
  DEFAULT_VALUES,
  GUIDANCE_NOTES,
  MEMOS_APPLY,
  VEHICLE_TYPE,
} from '../../../../app/app.enums';
import { AdrDetails } from '../../../../models/vehicle/tech-record.model';

@IonicPage()
@Component({
  selector: 'page-vehicle-adr-details',
  templateUrl: 'vehicle-adr-details.html',
})
export class VehicleAdrDetailsPage {
  vehicleData: VehicleModel;
  adrData: AdrDetails;

  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  ADR_DETAILS: typeof ADR_DETAILS = ADR_DETAILS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
  ADR_VEHICLE_TYPE: typeof ADR_VEHICLE_TYPE = ADR_VEHICLE_TYPE;
  DEFAULT_VALUES: typeof DEFAULT_VALUES = DEFAULT_VALUES;
  MEMOS_APPLY: typeof MEMOS_APPLY = MEMOS_APPLY;
  GUIDANCE_NOTES: typeof GUIDANCE_NOTES = GUIDANCE_NOTES;

  constructor(
    private navParams: NavParams,
    private commonFunc: CommonFunctionsService,
    private viewCtrl: ViewController,
  ) {
    this.vehicleData = this.navParams.get('vehicleData');
    this.adrData = this.vehicleData.techRecord.adrDetails || ({} as AdrDetails);
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.VEHICLE_DETAILS);
  }
}
