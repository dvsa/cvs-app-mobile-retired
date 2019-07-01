import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { Component } from "@angular/core";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { DATE_FORMAT, APP_STRINGS, VEHICLE_TYPE } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-vehicle-additional',
  templateUrl: 'vehicle-additional.html',
})
export class VehicleAdditionalPage {
  VEHICLE_TYPE: typeof VEHICLE_TYPE=VEHICLE_TYPE;
  vehicleData: VehicleModel;
  dateFormat: string;
  appStrings: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public commonFunc: CommonFunctionsService) {
    this.vehicleData = navParams.get('vehicleData');
    this.viewCtrl = viewCtrl;
    this.dateFormat = DATE_FORMAT.DD_MM_YYYY;
    this.appStrings = APP_STRINGS;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.VEHICLE_DETAILS);
  }

}
