import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { Component } from "@angular/core";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { DATE_FORMAT, APP_STRINGS, VEHICLE_TYPE, TECH_RECORD_STATUS } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-vehicle-additional',
  templateUrl: 'vehicle-additional.html',
})
export class VehicleAdditionalPage {
  VEHICLE_TYPE: typeof VEHICLE_TYPE=VEHICLE_TYPE;
  TECH_RECORD_STATUS: typeof TECH_RECORD_STATUS = TECH_RECORD_STATUS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
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
