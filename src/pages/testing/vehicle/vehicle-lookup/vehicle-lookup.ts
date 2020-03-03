import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestResultModel } from "../../../../models/tests/test-result.model";
import { map, tap } from "rxjs/operators";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { APP_STRINGS, PAGE_NAMES, STORAGE, VEHICLE_TYPE, FIREBASE_SCREEN_NAMES } from "../../../../app/app.enums";
import { StorageService } from "../../../../providers/natives/storage.service";
import { Observable, Observer } from "rxjs";
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
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";
import { AppService } from '../../../../providers/global/app.service';
import { VehicleLookupSearchCriteriaData } from "../../../../assets/app-data/vehicle-lookup-search-criteria/vehicle-lookup-search-criteria.data";

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html'
})
export class VehicleLookupPage {
  testData: TestModel;
  searchVal: string = '';
  oid: string;
  title: string = '';
  searchPlaceholder = '';
  isCombinationTest: boolean = false;
  selectedSearchCriteria: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitService: VisitService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public storageService: StorageService,
              private openNativeSettings: OpenNativeSettings,
              private vehicleService: VehicleService,
              private firebase: Firebase,
              private firebaseLogsService: FirebaseLogsService,
              private callNumber: CallNumber,
              private authService: AuthService,
              private store$: Store<LogsModel>,
              public appService: AppService,
              private modalCtrl: ModalController) {
    this.testData = navParams.get('test');
  }

  ionViewWillEnter() {
    this.searchVal = '';
    if (this.testData.vehicles.length) {
      this.isCombinationTest = true;
    }
    this.selectedSearchCriteria = this.canSearchOnlyTrailers() ? VehicleLookupSearchCriteriaData.DefaultVehicleLookupSearchCriteriaTrailersOnly : VehicleLookupSearchCriteriaData.DefaultVehicleLookupSearchCriteria;
    this.searchPlaceholder = this.getSearchFieldPlaceholder();
    this.title = this.canSearchOnlyTrailers() ? APP_STRINGS.IDENTIFY_TRAILER : APP_STRINGS.IDENTIFY_VEHICLE;
  };

  doesHgvExist() {
    for (let vehicle of this.testData.vehicles) {
      if (vehicle.techRecord.vehicleType === VEHICLE_TYPE.HGV) return true;
    }
    return false;
  }

  canSearchOnlyTrailers() {
    return this.isCombinationTest && this.doesHgvExist();
  }

  ionViewDidEnter() {
    this.firebaseLogsService.setScreenName(FIREBASE_SCREEN_NAMES.VEHICLE_SEARCH);
  }

  searchVehicle(searchedValue: string): void {
    const LOADING = this.loadingCtrl.create({
      content: 'Loading...'
    });
    LOADING.present();
    this.oid = this.authService.getOid();

    this.vehicleService.getVehicleTechRecords(searchedValue.toUpperCase(), this.getTechRecordQueryParam().queryParam)
      .subscribe((vehicleData) => {
          const testHistoryResponseObserver: Observer<TestResultModel[]> = {
            next: () => {
              this.goToVehicleDetails(vehicleData[0]);
            },
            error: (error) => {
              const log: Log = {
                type: 'error',
                message: `${this.oid} - ${error.status} ${error.error} for API call to ${error.url}`,
                timestamp: Date.now(),
              };
              this.store$.dispatch(new logsActions.SaveLog(log));
              this.firebase.logEvent('test_error', {
                content_type: 'error',
                item_id: "Failed retrieving the testResultsHistory"
              });
              this.storageService.update(STORAGE.TEST_HISTORY + vehicleData[0].systemNumber, []);
              this.goToVehicleDetails(vehicleData[0]);
            },
            complete: function () {
            }
          };

          if (vehicleData.length > 1) {
            this.goToMultipleTechRecordsSelection(vehicleData).then(() => {
              LOADING.dismiss();
            });
          } else if (vehicleData.length === 1 && this.vehicleService.isVehicleSkeleton(vehicleData[0])) {
            this.vehicleService.createSkeletonAlert(this.alertCtrl);
            LOADING.dismiss();
          } else {
            this.vehicleService.getTestResultsHistory(vehicleData[0].systemNumber).subscribe(testHistoryResponseObserver).add(() => {
              LOADING.dismiss();
            });
          }
        },
        (error) => {
          const log: Log = {
            type: 'error',
            message: `${this.oid} - ${error.status} ${error.error || error.message} for API call to ${error.url}`,
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
      title: APP_STRINGS.VEHICLE_NOT_FOUND,
      message: APP_STRINGS.VEHICLE_NOT_FOUND_MESSAGE,
      enableBackdropDismiss: false,
      buttons: ['OK']
    });
    alert.present();
    this.firebase.logEvent('test_error', {content_type: 'error', item_id: "Vehicle not found"});
  }

  goToVehicleDetails(vehicleData: VehicleModel) {
    this.navCtrl.push(PAGE_NAMES.VEHICLE_DETAILS_PAGE, {
      test: this.testData,
      vehicle: vehicleData
    });
  }

  goToMultipleTechRecordsSelection(multipleVehicleData: VehicleModel[]) {
    return this.navCtrl.push(PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION, {
      test: this.testData,
      vehicles: multipleVehicleData
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

  getSearchFieldPlaceholder() {
    return APP_STRINGS.ENTER + ' ' + this.selectedSearchCriteria.charAt(0).toLowerCase() + this.selectedSearchCriteria.slice(1);
  }

  onChangeSearchCriteria() {
    const MODAL = this.modalCtrl.create(PAGE_NAMES.VEHICLE_LOOKUP_SEARCH_CRITERIA_SELECTION, {
      selectedSearchCriteria: this.selectedSearchCriteria,
      trailersOnly: this.canSearchOnlyTrailers()
    });
    MODAL.present();
    MODAL.onDidDismiss(data => {
      this.selectedSearchCriteria = data.selectedSearchCriteria;
      this.searchPlaceholder = this.getSearchFieldPlaceholder();
    });
  }

  getTechRecordQueryParam() {
    return VehicleLookupSearchCriteriaData.VehicleLookupQueryParameters.find(queryParamItem => {
      return queryParamItem.text === this.selectedSearchCriteria;
    })
  }
}
