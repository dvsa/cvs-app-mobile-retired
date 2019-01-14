import { Component } from '@angular/core';
import { VehicleModel } from '../../../../../models/vehicle/vehicle.model';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from "../../../../../providers/utils/common-functions";
import { DATE_FORMAT } from "../../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-vehicle-additional',
  templateUrl: 'vehicle-additional.html',
})
export class VehicleAdditionalPage {
  vehicleData: VehicleModel;
  dateFormat: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              public commonFunc: CommonFunctionsService) {
    this.vehicleData = navParams.get('vehicleData');
    this.viewCtrl = viewCtrl;
    this.dateFormat = DATE_FORMAT.DD_MM_YYYY;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Vehicle details');
  }

}
