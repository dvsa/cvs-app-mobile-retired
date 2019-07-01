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
import { HttpResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Log, LogsModel } from "../../../../modules/logs/logs.model";
import { AuthService } from "../../../../providers/global/auth.service";
import * as logsActions from "../../../../modules/logs/logs.actions";

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html'
})
export class VehicleLookupPage {
  testData: TestModel;
  searchVal: string = '';
  oid: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitService: VisitService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public storageService: StorageService,
              private openNativeSettings: OpenNativeSettings,
              private vehicleService: VehicleService,
              private firebase: Firebase,
              private callNumber: CallNumber,
              private authService: AuthService,
              private store$: Store<LogsModel>) {
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
    this.oid = this.authService.getOid();
    this.vehicleService.getVehicleTechRecord(searchedValue.toUpperCase()).subscribe(
      (vehicleTechRecord: HttpResponse<VehicleTechRecordModel>) => {
        const log: Log = {
          type: 'info',
          message: `${this.oid} - ${vehicleTechRecord.status} ${vehicleTechRecord.statusText} for API call to ${vehicleTechRecord.url}`,
          timestamp: Date.now(),
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
        let vehicleData: VehicleModel = this.vehicleService.createVehicle(vehicleTechRecord.body);
        this.vehicleService.getTestResultsHistory(vehicleData.vin).pipe(
          tap(
            () => {
              LOADING.dismiss();
            }
          ),
          map((data) => {
            this.storageService.update(STORAGE.TEST_HISTORY, data.body);
            return data;
          }),
        ).subscribe(
          (testResultHistory: HttpResponse<TestResultModel[]>) => {
            const log: Log = {
              type: 'info',
              message: `${this.oid} - ${testResultHistory.status} ${testResultHistory.statusText} for API call to ${testResultHistory.url}`,
              timestamp: Date.now(),
            };
            this.store$.dispatch(new logsActions.SaveLog(log));
            this.goToVehicleDetails(vehicleData, testResultHistory.body);
          },
          (error) => {
            const log: Log = {
              type: 'error',
              message: `${this.oid} - ${error.status} ${error.error} for API call to ${error.url}`,
              timestamp: Date.now(),
            };
            this.store$.dispatch(new logsActions.SaveLog(log));
            this.storageService.update(STORAGE.TEST_HISTORY, []);
            LOADING.dismiss();
            this.goToVehicleDetails(vehicleData);
            this.firebase.logEvent('test_error', {
              content_type: 'error',
              item_id: "Failed retrieving the testResultsHistory"
            });
          })
      },
      (error) => {
        const log: Log = {
          type: 'error',
          message: `${this.oid} - ${error.status} ${error.error} for API call to ${error.url}`,
          timestamp: Date.now(),
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
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
