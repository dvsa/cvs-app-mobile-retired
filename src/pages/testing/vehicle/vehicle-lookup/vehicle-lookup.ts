import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestResultModel } from "../../../../models/tests/test-result.model";
import { catchError, map, tap } from "rxjs/operators";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { PAGE_NAMES, STORAGE, APP_STRINGS } from "../../../../app/app.enums";
import { StorageService } from "../../../../providers/natives/storage.service";
import { Observable } from "rxjs";
import { AppConfig } from "../../../../../config/app.config";
import { _throw } from "rxjs/observable/throw";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { CallNumber } from "@ionic-native/call-number";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { Firebase } from '@ionic-native/firebase';

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html'
})
export class VehicleLookupPage {
  testData: TestModel;
  searchVal: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitService: VisitService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public storageService: StorageService,
              private openNativeSettings: OpenNativeSettings,
              private vehicleService: VehicleService,
              private firebase: Firebase,
              private callNumber: CallNumber) {
    this.testData = navParams.get('test');
  }

  ionViewWillEnter() {
    this.searchVal = '';
  };

  searchVehicle(searchedValue: string): void {
    const LOADING = this.loadingCtrl.create({
      content: 'Loading...'
    });
    LOADING.present();
    searchedValue = searchedValue.replace(/\s+/g, '');
    this.vehicleService.getVehicleTechRecord(searchedValue.toUpperCase()).subscribe(
      (vehicleTechRecord: VehicleTechRecordModel) => {
        let vehicleData: VehicleModel = this.vehicleService.createVehicle(vehicleTechRecord);
        this.vehicleService.getTestResultsHistory(vehicleData.vin).pipe(
          tap(
            () => {
              LOADING.dismiss();
            }
          ),
          map((data) => {
            this.storageService.update(STORAGE.TEST_HISTORY, data);
            return data;
          }),
        ).subscribe(
          (testResultHistory: TestResultModel[]) => {
            this.goToVehicleDetails(vehicleData, testResultHistory);
          },
          () => {
            this.storageService.update(STORAGE.TEST_HISTORY, []);
            LOADING.dismiss();
            this.goToVehicleDetails(vehicleData);
            this.firebase.logEvent('test_error', {content_type: 'error', item_id: "Failed retrieving the testResultsHistory"});
          })
      },
      () => {
        this.searchVal = '';
        LOADING.dismiss();
        this.showAlert();
        this.firebase.logEvent('test_error', {content_type: 'error', item_id: "Failed retrieving the techRecord"});
      }
    );
  }

  close(): void {
    if (this.navCtrl.getPrevious().component.name == PAGE_NAMES.VISIT_TIMELINE_PAGE) {
      this.visitService.removeTest(this.testData);
    }
    this.navCtrl.pop();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Vehicle not found',
      subTitle: 'You can find a vehicle by typing in its registration number or vehicle identification/chassis number',
      enableBackdropDismiss: false,
      buttons: ['OK']
    });
    alert.present();
    this.firebase.logEvent('test_error', {content_type: 'error', item_id: "Vehicle not found"});
  }

  goToVehicleDetails(vehicleData, testResultHistory?: TestResultModel[]) {
    this.navCtrl.push(PAGE_NAMES.VEHICLE_DETAILS_PAGE, {
      test: this.testData,
      vehicle: vehicleData
    });
  }

  private handleError(vehicleData: VehicleModel): Observable<any> {
    let alert = this.alertCtrl.create({
        title: 'Unable to load data',
        enableBackdropDismiss: false,
        message: 'Make sure you are connected to the internet and try again',
        buttons: [
          {
            text: APP_STRINGS.SETTINGS_BTN,
            handler: () => {
              this.openNativeSettings.open('settings');
              this.handleError(vehicleData);
            }
          }, {
            text: 'Call Technical Support',
            handler: () => {
              this.callNumber.callNumber(AppConfig.KEY_PHONE_NUMBER, true).then(
                data => console.log(data),
                err => console.log(err)
              );
              return false
            }
          }, {
            text: 'Try again',
            handler: () => {
              this.vehicleService.getTestResultsHistory(vehicleData.vin);
            }
          }
        ]
      }
    );
    alert.present();
    return _throw(
      'Something bad happened; please try again later.'
    );
  }

}
