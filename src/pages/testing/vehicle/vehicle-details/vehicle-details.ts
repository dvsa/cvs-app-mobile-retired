import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { APP_STRINGS, DATE_FORMAT, FIREBASE, PAGE_NAMES, STORAGE, VEHICLE_TYPE, TECH_RECORD_STATUS } from "../../../../app/app.enums";
import { StorageService } from "../../../../providers/natives/storage.service";
import { AppConfig } from "../../../../../config/app.config";
import { CallNumber } from "@ionic-native/call-number";
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";

@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html'
})
export class VehicleDetailsPage {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  TECH_RECORD_STATUS: typeof TECH_RECORD_STATUS = TECH_RECORD_STATUS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
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
              public commonFunc: CommonFunctionsService,
              private callNumber: CallNumber,
              private firebaseLogsService: FirebaseLogsService) {
    this.vehicleData = navParams.get('vehicle');
    this.testData = navParams.get('test');
    this.fromTestCreatePage = navParams.get('fromTestCreatePage');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.fromTestCreatePage ? APP_STRINGS.TEST : APP_STRINGS.IDENTIFY_VEHICLE);
  }

  ionViewDidEnter() {
    this.firebaseLogsService.search_vehicle_time.search_vehicle_end_time = Date.now();

    this.firebaseLogsService.search_vehicle_time.search_vehicle_time_taken = this.firebaseLogsService.differenceInHMS(this.firebaseLogsService.search_vehicle_time.search_vehicle_start_time, this.firebaseLogsService.search_vehicle_time.search_vehicle_end_time);
    this.firebaseLogsService.logEvent(FIREBASE.SEARCH_VEHICLE_TIME_TAKEN, FIREBASE.SEARCH_VEHICLE_START_TIME, this.firebaseLogsService.search_vehicle_time.search_vehicle_start_time.toString(), FIREBASE.SEARCH_VEHICLE_END_TIME, this.firebaseLogsService.search_vehicle_time.search_vehicle_end_time.toString(), FIREBASE.SEARCH_VEHICLE_TIME_TAKEN, this.firebaseLogsService.search_vehicle_time.search_vehicle_time_taken);

    this.firebaseLogsService.confirm_vehicle_time.confirm_vehicle_start_time = Date.now();
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
            this.loggingInAlertHandler();

            this.navCtrl.push(PAGE_NAMES.ADD_PREPARER_PAGE, {
              vehicle: this.vehicleData,
              test: this.testData
            }).then(
              (resp) => {
                if (!resp) {
                  const alert = this.alertCtrl.create({
                    title: APP_STRINGS.UNAUTHORISED,
                    message: APP_STRINGS.UNAUTHORISED_TEST_MSG,
                    buttons: [
                      {
                        text: APP_STRINGS.CANCEL,
                        role: 'cancel'
                      },
                      {
                        text: APP_STRINGS.CALL,
                        handler: () => {
                          this.callNumber.callNumber(AppConfig.KEY_PHONE_NUMBER, true).then(
                            data => console.log(data),
                            err => console.log(err)
                          );
                          return false;
                        }
                      }
                    ]
                  });
                  alert.present();
                }
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
        this.navCtrl.push(PAGE_NAMES.VEHICLE_HISTORY_PAGE, {
          vehicleData: this.vehicleData,
          testResultsHistory: data ? data : [],
        });
      }
    )
  }

  loggingInAlertHandler() {
    this.firebaseLogsService.confirm_vehicle_time.confirm_vehicle_end_time = Date.now();

    this.firebaseLogsService.confirm_vehicle_time.confirm_vehicle_time_taken = this.firebaseLogsService.differenceInHMS(this.firebaseLogsService.confirm_vehicle_time.confirm_vehicle_start_time, this.firebaseLogsService.confirm_vehicle_time.confirm_vehicle_end_time);
    this.firebaseLogsService.logEvent(FIREBASE.CONFIRM_VEHICLE_TIME_TAKEN, FIREBASE.CONFIRM_VEHICLE_START_TIME, this.firebaseLogsService.confirm_vehicle_time.confirm_vehicle_start_time.toString(), FIREBASE.CONFIRM_VEHICLE_END_TIME, this.firebaseLogsService.confirm_vehicle_time.confirm_vehicle_end_time.toString(), FIREBASE.CONFIRM_VEHICLE_TIME_TAKEN, this.firebaseLogsService.confirm_vehicle_time.confirm_vehicle_time_taken);

    this.firebaseLogsService.confirm_preparer_time.confirm_preparer_start_time = Date.now();
  }
}
