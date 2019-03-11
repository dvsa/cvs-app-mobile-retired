import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { APP_STRINGS, DATE_FORMAT, STORAGE } from "../../../../app/app.enums";
import { StorageService } from "../../../../providers/natives/storage.service";

@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html'
})
export class VehicleDetailsPage {
  vehicleData: VehicleModel;
  testData: TestModel;
  fromTestCreatePage: boolean;
  dateFormat: string = DATE_FORMAT.DD_MM_YYYY;
  changeOpacity: boolean = false;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public storageService: StorageService,
              public commonFunc: CommonFunctionsService) {
    this.vehicleData = navParams.get('vehicle');
    this.testData = navParams.get('test');
    this.fromTestCreatePage = navParams.get('fromTestCreatePage');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.fromTestCreatePage ? APP_STRINGS.TEST : APP_STRINGS.IDENTIFY_VEHICLE);
  }

  goToPreparerPage(): void {
    this.changeOpacity = true;
    let confirm = this.alertCtrl.create({
      title: APP_STRINGS.CONFIRM_VEHICLE,
      message: APP_STRINGS.CONFIRM_VEHICLE_MSG,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
        }, {
          text: APP_STRINGS.CONFIRM,
          handler: () => {
            this.navCtrl.push('AddPreparerPage', {
              vehicle: this.vehicleData,
              test: this.testData
            });
          }
        }
      ]
    });
    confirm.present();
    confirm.onDidDismiss(() => this.changeOpacity = false);
  }

  showMoreDetails(pageName: string): void {
    this.navCtrl.push(pageName, {
      vehicleData: this.vehicleData
    });
  }

  goToVehicleTestResultsHistory() {
    this.storageService.read(STORAGE.TEST_HISTORY).then(
      data => {
        this.navCtrl.push('VehicleHistoryPage', {
          vehicleData: this.vehicleData,
          testResultsHistory: data ? data : [],
        });
      }
    )
  }
}
