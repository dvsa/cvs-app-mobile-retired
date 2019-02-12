import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestResultModel } from "../../../../models/tests/test-result.model";
import { catchError, map, tap } from "rxjs/operators";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { STORAGE } from "../../../../app/app.enums";
import { StorageService } from "../../../../providers/natives/storage.service";

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html'
})
export class VehicleLookupPage {
  testData: TestModel;
  searchVal: string = '';

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private vehicleService: VehicleService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public storageService: StorageService,
              public visitService: VisitService) {
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
        let vehicleData = this.vehicleService.createVehicle(vehicleTechRecord);
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
            this.goToVehicleDetails(vehicleData);
            LOADING.dismiss();
          })
      },
      () => {
        LOADING.dismiss();
        this.showAlert();
      });
  }

  close(): void {
    if (this.navCtrl.getPrevious().component.name == 'VisitTimelinePage') {
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
  }

  goToVehicleDetails(vehicleData, testResultHistory?: TestResultModel[]) {
    this.navCtrl.push('VehicleDetailsPage', {
      test: this.testData,
      vehicle: vehicleData
    });
  }
}
