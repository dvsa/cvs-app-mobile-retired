import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { VehicleModel } from '../../../../../models/vehicle/vehicle.model';
import { Observer } from 'rxjs';
import { TestResultModel } from '../../../../../models/tests/test-result.model';
import { APP_STRINGS, PAGE_NAMES, STORAGE } from '../../../../../app/app.enums';
import { AuthService } from '../../../../../providers/global/auth.service';
import { VehicleService } from '../../../../../providers/vehicle/vehicle.service';
import { StorageService } from '../../../../../providers/natives/storage.service';
// import { Firebase } from '@ionic-native/firebase';
import { TestModel } from '../../../../../models/tests/test.model';
import { LogsProvider } from '../../../../../modules/logs/logs.service';

@IonicPage()
@Component({
  selector: 'multiple-tech-records-selection',
  templateUrl: 'multiple-tech-records-selection.html'
})
export class MultipleTechRecordsSelectionPage {
  combinationTestData: TestModel;
  vehicles: VehicleModel[];
  oid: string;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
  isAtLeastOneSkeleton: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    public vehicleService: VehicleService,
    public storageService: StorageService,
    // private firebase: Firebase,
    private alertCtrl: AlertController,
    private logProvider: LogsProvider
  ) {
    this.vehicles = this.navParams.get('vehicles');
    this.combinationTestData = navParams.get('test');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.IDENTIFY_VEHICLE);
    this.isAtLeastOneSkeleton = this.vehicles.some((vehicle) => {
      return this.vehicleService.isVehicleSkeleton(vehicle);
    });
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
        this.logProvider.dispatchLog({
          type:
            'error-vehicleService.getTestResultsHistory-openVehicleDetails in multiple-tech-records-selection.ts',
          message: `${this.oid} - ${error.status} ${error.error} for API call to ${error.url}`,
          timestamp: Date.now()
        });

        // this.firebase.logEvent('test_error', {
        //   content_type: 'error',
        //   item_id: 'Failed retrieving the testResultsHistory'
        // });
        this.storageService.update(STORAGE.TEST_HISTORY + selectedVehicle.systemNumber, []);
        this.goToVehicleDetails(selectedVehicle);
      },
      complete: function() {}
    };

    if (this.vehicleService.isVehicleSkeleton(selectedVehicle)) {
      LOADING.dismiss();
      this.vehicleService.createSkeletonAlert(this.alertCtrl);
    } else {
      this.vehicleService
        .getTestResultsHistory(selectedVehicle.systemNumber)
        .subscribe(testHistoryResponseObserver)
        .add(() => {
          LOADING.dismiss();
        });
    }
  }

  goToVehicleDetails(selectedVehicle: VehicleModel) {
    this.navCtrl.push(PAGE_NAMES.VEHICLE_DETAILS_PAGE, {
      test: this.combinationTestData,
      vehicle: selectedVehicle
    });
  }
}
