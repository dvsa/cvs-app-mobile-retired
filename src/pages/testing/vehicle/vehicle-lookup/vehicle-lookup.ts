import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { TestService } from "../../../../providers/test/test.service";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VisitModel } from "../../../../models/visit/visit.model";
import { VisitService } from "../../../../providers/visit/visit.service";

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html'
})
export class VehicleLookupPage {
  testData: TestModel;
  searchVal: string = '';
  loading: any;

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
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.vehicleService.getVehicleTechRecord(searchedValue.toUpperCase()).subscribe(
      (vehicleTechRecord: VehicleModel) => {
        let vehicleData = this.vehicleService.createVehicle(vehicleTechRecord);
        this.vehicleService.getTestResultsHistory(vehicleData.vin).subscribe(
          (testResultHistory) => {
            this.loading.dismiss();
            this.navCtrl.push('VehicleDetailsPage', {
              test: this.testData,
              testResultsHistory: testResultHistory,
              vehicle: vehicleData
            });
          })
      },
      () => {
        this.loading.dismiss();
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
