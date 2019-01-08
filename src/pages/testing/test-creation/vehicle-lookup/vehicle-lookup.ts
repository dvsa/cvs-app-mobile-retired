import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TestReportModel } from '../../../../models/tests/test-report.model';
import { VisitModel } from '../../../../models/visit.model';
import { TestReportService } from "../../../../providers/test-report/test-report.service";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html'
})
export class VehicleLookupPage {
  testReport: TestReportModel;
  visit: VisitModel;
  searchVal: string = '';
  loading: any;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private vehicleService: VehicleService,
              private testReportService: TestReportService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.testReport = this.testReportService.getTestReport();
    this.visit = navParams.get('visit');
  }

  ionViewWillEnter() {
    this.searchVal = '';
  };

  searchVehicle(searchedValue: string): void {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

    searchedValue = searchedValue ? searchedValue : 'BQ91YHQ';

    this.vehicleService.getVehicleTechRecord(searchedValue).subscribe(
      (data: VehicleModel) => {
        this.loading.dismiss();
        let vehicleData = this.vehicleService.createVehicle(data);
        this.navCtrl.push('VehicleDetailsPage', {vehicle: vehicleData});
      },
      err => {
        this.loading.dismiss();
        this.showAlert();
      });
  }

  close(): void {
    if (this.navCtrl.getPrevious().component.name == 'VisitTimelinePage') {
      this.visit.removeTestReport(this.testReport);
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
