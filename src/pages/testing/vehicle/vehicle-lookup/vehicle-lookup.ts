import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestResultModel } from "../../../../models/tests/test-result.model";
import { tap } from "rxjs/operators";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";

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
              public visitService: VisitService) {
    this.testData = navParams.get('test');
  }

  ionViewWillEnter() {
    this.searchVal = '';
  };

  searchVehicle(searchedValue: string): void {
    const LOADING = this.loadingCtrl.create({
      content: 'Loading...'
    })
    LOADING.present();
    this.vehicleService.getVehicleTechRecord(searchedValue.toUpperCase()).subscribe(
      (vehicleTechRecord: VehicleTechRecordModel) => {
        let vehicleData = this.vehicleService.createVehicle(vehicleTechRecord);
        this.vehicleService.getTestResultsHistory(vehicleData.vin).pipe(
          tap(
            () => {
              LOADING.dismiss();
            }
          )
        ).subscribe(
          (testResultHistory: TestResultModel[]) => {
            this.navCtrl.push('VehicleDetailsPage', {
              test: this.testData,
              testResultsHistory: testResultHistory,
              vehicle: vehicleData
            });
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
}
