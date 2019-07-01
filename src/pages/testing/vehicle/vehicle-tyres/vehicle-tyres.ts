import { Component } from '@angular/core';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { APP_STRINGS, VEHICLE_TYPE } from '../../../../app/app.enums';

@IonicPage()
@Component({
  selector: 'page-vehicle-tyres',
  templateUrl: 'vehicle-tyres.html',
})
export class VehicleTyresPage {
  VEHICLE_TYPE: typeof VEHICLE_TYPE=VEHICLE_TYPE;
  vehicleData: VehicleModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public commonFunc: CommonFunctionsService) {
    this.vehicleData = navParams.get('vehicleData');
    this.viewCtrl = viewCtrl;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.VEHICLE_DETAILS);
  }

}
