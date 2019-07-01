import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { APP_STRINGS } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-trailer-brakes',
  templateUrl: 'trailer-brakes.html',
})
export class TrailerBrakesPage {
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
