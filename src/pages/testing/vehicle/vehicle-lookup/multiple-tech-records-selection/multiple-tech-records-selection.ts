import { Component, OnInit } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {VehicleModel} from '../../../../../models/vehicle/vehicle.model';
import {Observer} from 'rxjs';
import {TestResultModel} from '../../../../../models/tests/test-result.model';
import {Log, LogsModel} from '../../../../../modules/logs/logs.model';
import * as logsActions from '../../../../../modules/logs/logs.actions';
import {APP_STRINGS, PAGE_NAMES, STORAGE} from '../../../../../app/app.enums';
import {AuthService} from '../../../../../providers/global/auth.service';
import {VehicleService} from '../../../../../providers/vehicle/vehicle.service';
import {StorageService} from '../../../../../providers/natives/storage.service';
import {Firebase} from '@ionic-native/firebase';
import {Store} from '@ngrx/store';
import {TestModel} from '../../../../../models/tests/test.model';

@IonicPage()
@Component({
  selector: 'multiple-tech-records-selection',
  templateUrl: 'multiple-tech-records-selection.html',
})
export class MultipleTechRecordsSelectionPage implements OnInit {
  combinationTestData: TestModel;
  vehicles: VehicleModel[];
  oid: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              private authService: AuthService,
              private vehicleService: VehicleService,
              public storageService: StorageService,
              private firebase: Firebase,
              private store$: Store<LogsModel>,) {
    this.vehicles = this.navParams.get('vehicles');
    this.combinationTestData = navParams.get('test');
  }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.IDENTIFY_VEHICLE);
  }

  openVehicleDetails(selectedVehicle: VehicleModel): void {
    const LOADING = this.loadingCtrl.create({
      content: 'Loading...'
    });
    LOADING.present();
    this.oid = this.authService.getOid();

    const testHistoryResponseObserver: Observer<TestResultModel[]> = {
      next: () => {
        this.goToVehicleDetails(selectedVehicle);
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
        this.storageService.update(STORAGE.TEST_HISTORY+selectedVehicle.systemNumber, []);
        this.goToVehicleDetails(selectedVehicle);
      },
      complete: function () {}
    };

    this.vehicleService.getTestResultsHistory(selectedVehicle.systemNumber).subscribe(testHistoryResponseObserver).add(()=>{
      LOADING.dismiss();
    });
  }

  goToVehicleDetails(selectedVehicle: VehicleModel) {
    this.navCtrl.push(PAGE_NAMES.VEHICLE_DETAILS_PAGE, {
      test: this.combinationTestData,
      vehicle: selectedVehicle
    });
  }
}
