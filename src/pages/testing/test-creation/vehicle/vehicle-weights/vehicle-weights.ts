import { Component } from '@angular/core';
import { VehicleModel } from '../../../../../models/vehicle/vehicle.model';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from "../../../../../providers/utils/common-functions";

@IonicPage()
@Component({
  selector: 'page-vehicle-weights',
  templateUrl: 'vehicle-weights.html',
})
export class VehicleWeightsPage {
  vehicleData: VehicleModel;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              public commonFunc: CommonFunctionsService) {
    this.vehicleData = navParams.get('vehicleData');
    this.viewCtrl = viewCtrl;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Vehicle details');
  }

}
