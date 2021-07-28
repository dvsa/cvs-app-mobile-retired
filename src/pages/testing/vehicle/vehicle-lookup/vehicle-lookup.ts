import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL,
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_VALUE
} from './../../../../app/app.enums';
import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import { _throw } from 'rxjs/observable/throw';
import { Observable, Observer } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CallNumber } from '@ionic-native/call-number';

import { TestModel } from '../../../../models/tests/test.model';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { VisitService } from '../../../../providers/visit/visit.service';
import { TestResultModel } from '../../../../models/tests/test-result.model';
import { APP_STRINGS, PAGE_NAMES, STORAGE, VEHICLE_TYPE } from '../../../../app/app.enums';
import { StorageService } from '../../../../providers/natives/storage.service';
import { default as AppConfig } from '../../../../../config/application.hybrid';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { AuthenticationService } from '../../../../providers/auth/authentication/authentication.service';
import { AnalyticsService } from '../../../../providers/global';
import { AppService } from '../../../../providers/global/app.service';
import { VehicleLookupSearchCriteriaData } from '../../../../assets/app-data/vehicle-lookup-search-criteria/vehicle-lookup-search-criteria.data';
import { ActivityService } from '../../../../providers/activity/activity.service';
import { LogsProvider } from '../../../../modules/logs/logs.service';

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html'
})
export class VehicleLookupPage {
  testData: TestModel;
  searchVal: string = '';
  title: string = '';
  searchPlaceholder = '';
  isCombinationTest: boolean = false;
  selectedSearchCriteria: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public visitService: VisitService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storageService: StorageService,
    private openNativeSettings: OpenNativeSettings,
    private vehicleService: VehicleService,
    private analyticsService: AnalyticsService,
    private authenticationService: AuthenticationService,
    private callNumber: CallNumber,
    public appService: AppService,
    private modalCtrl: ModalController,
    private activityService: ActivityService,
    private logProvider: LogsProvider
  ) {
    this.testData = navParams.get('test');
  }

  ionViewWillEnter() {
    this.searchVal = '';
    if (this.testData.vehicles.length) {
      this.isCombinationTest = true;
    }
    this.selectedSearchCriteria = this.canSearchOnlyTrailers()
      ? VehicleLookupSearchCriteriaData.DefaultVehicleLookupSearchCriteriaTrailersOnly
      : VehicleLookupSearchCriteriaData.DefaultVehicleLookupSearchCriteria;
    this.searchPlaceholder = this.getSearchFieldPlaceholder();
    this.title = this.canSearchOnlyTrailers()
      ? APP_STRINGS.IDENTIFY_TRAILER
      : APP_STRINGS.IDENTIFY_VEHICLE;
  }

  doesHgvLgvExist() {
    for (let vehicle of this.testData.vehicles) {
      if (
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.HGV ||
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.LGV
      )
        return true;
    }
    return false;
  }

  canSearchOnlyTrailers() {
    return this.isCombinationTest && this.doesHgvLgvExist();
  }

  ionViewDidEnter() {
    this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VEHICLE_SEARCH);
  }

  /**
   * When clicking the search button, check if the visit is open
   */
  onSearchVehicle(searchedValue: string): void {
    const LOADING = this.loadingCtrl.create({
      content: 'Loading...'
    });
    LOADING.present();

    this.activityService.isVisitStillOpen().subscribe(
      (response) => {
        if (response.body) {
          this.searchVehicle(searchedValue, LOADING);
        } else {
          this.visitService.createDataClearingAlert(LOADING).present();
        }
      },
      (isVisitStillOpenError) => {
        this.searchVal = '';
        LOADING.dismiss();
        this.showAlert();
      }
    );
  }

  searchVehicle(searchedValue: string, LOADING) {
    const { oid } = this.authenticationService.tokenInfo;

    this.vehicleService
      .getVehicleTechRecords(
        searchedValue.toUpperCase(),
        this.getTechRecordQueryParam().queryParam
      )
      .subscribe(
        (vehicleData) => {
          const testHistoryResponseObserver: Observer<TestResultModel[]> = {
            next: () => {
              this.goToVehicleDetails(vehicleData[0]);
            },
            error: (error) => {
              this.logProvider.dispatchLog({
                type:
                  'error-vehicleService.getTestResultsHistory-searchVehicle in vehicle-lookup.ts',
                message: `${oid} - ${error.status} ${error.error} for API call to ${error.url}`,
                timestamp: Date.now()
              });

              this.trackErrorOnSearchRecord(ANALYTICS_VALUE.TEST_RESULT_HISTORY_FAILED);

              this.storageService.update(STORAGE.TEST_HISTORY + vehicleData[0].systemNumber, []);
              this.goToVehicleDetails(vehicleData[0]);
            },
            complete: function() {}
          };
          if (vehicleData.length > 1) {
            this.goToMultipleTechRecordsSelection(vehicleData).then(() => {
              LOADING.dismiss();
            });
          } else if (
            vehicleData.length === 1 &&
            this.vehicleService.isVehicleSkeleton(vehicleData[0])
          ) {
            this.vehicleService.createSkeletonAlert(this.alertCtrl);
            LOADING.dismiss();
          } else {
            this.vehicleService
              .getTestResultsHistory(vehicleData[0].systemNumber)
              .subscribe(testHistoryResponseObserver)
              .add(() => {
                LOADING.dismiss();
              });
          }
        },
        (error) => {
          this.logProvider.dispatchLog({
            type: 'error-vehicleService.getTestResultsHistory-searchVehicle in vehicle-lookup.ts',
            message: `${oid} - ${error.status} ${error.error} for API call to ${error.url}`,
            timestamp: Date.now()
          });

          this.searchVal = '';
          LOADING.dismiss();
          this.showAlert();
          this.trackErrorOnSearchRecord(ANALYTICS_VALUE.TEST_RECORD_FAILED);
        }
      );
  }

  private async trackErrorOnSearchRecord(value: string) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.TEST_ERROR,
      label: value
    });
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
    this.trackErrorOnSearchRecord(ANALYTICS_VALUE.VEHICLE_NOT_FOUND);
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
        },
        {
          text: 'Call Technical Support',
          handler: () => {
            this.callNumber.callNumber(AppConfig.app.KEY_PHONE_NUMBER, true).then(
              (data) => console.log(data),
              (err) => console.log(err)
            );
            return false;
          }
        },
        {
          text: 'Try again',
          handler: () => {
            this.vehicleService.getTestResultsHistory(vehicleData.vin);
          }
        }
      ]
    });
    alert.present();
    return _throw('Something bad happened; please try again later.');
  }

  getSearchFieldPlaceholder() {
    return (
      APP_STRINGS.ENTER +
      ' ' +
      this.selectedSearchCriteria.charAt(0).toLowerCase() +
      this.selectedSearchCriteria.slice(1)
    );
  }

  onChangeSearchCriteria() {
    const MODAL = this.modalCtrl.create(PAGE_NAMES.VEHICLE_LOOKUP_SEARCH_CRITERIA_SELECTION, {
      selectedSearchCriteria: this.selectedSearchCriteria,
      trailersOnly: this.canSearchOnlyTrailers()
    });
    MODAL.present();
    MODAL.onDidDismiss((data) => {
      this.selectedSearchCriteria = data.selectedSearchCriteria;
      this.searchPlaceholder = this.getSearchFieldPlaceholder();
    });
  }

  getTechRecordQueryParam() {
    return VehicleLookupSearchCriteriaData.VehicleLookupQueryParameters.find((queryParamItem) => {
      return queryParamItem.text === this.selectedSearchCriteria;
    });
  }
}
