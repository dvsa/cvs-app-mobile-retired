import { Component } from '@angular/core';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { APP_STRINGS, VEHICLE_TYPE, TECH_RECORD_STATUS } from '../../../../app/app.enums';
import { get, orderBy } from 'lodash'
import { AxelsModel } from '../../../../models/vehicle/tech-record.model';

@IonicPage()
@Component({
  selector: 'page-vehicle-weights',
  templateUrl: 'vehicle-weights.html'
})
export class VehicleWeightsPage {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  TECH_RECORD_STATUS: typeof TECH_RECORD_STATUS = TECH_RECORD_STATUS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
  vehicleData: VehicleModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public commonFunc: CommonFunctionsService
  ) {

    this.viewCtrl = viewCtrl;
  }

  ionViewWillEnter() {
    this.vehicleData = this.navParams.get('vehicleData');
    const axleData: AxelsModel[] = get(this.vehicleData, 'techRecord.axles', null)
    if(axleData && axleData.length) {
      this.vehicleData.techRecord.axles = orderBy(axleData, ['axleNumber'], ['asc'])
    }
    this.viewCtrl.setBackButtonText(APP_STRINGS.VEHICLE_DETAILS);
  }
}
