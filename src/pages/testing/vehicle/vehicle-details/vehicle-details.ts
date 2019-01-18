import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { TestModel } from '../../../../models/tests/test.model';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { TestService } from "../../../../providers/test/test.service";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { DATE_FORMAT } from "../../../../app/app.enums";
import { TestResultModel } from "../../../../models/tests/test-result.model";

@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html'
})
export class VehicleDetailsPage {
  vehicleData: VehicleModel;
  testData: TestModel;
  testResultHistory: TestResultModel[];
  fromTestCreatePage: boolean;
  dateFormat: string = DATE_FORMAT.DD_MM_YYYY;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private testReportService: TestService,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public commonFunc: CommonFunctionsService) {
    this.vehicleData = navParams.get('vehicle');
    this.testData = navParams.get('test');
    this.testResultHistory = navParams.get('testResultsHistory');
    this.fromTestCreatePage = navParams.get('fromTestCreatePage');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Identify Vehicle');
  }

  goToPreparerPage(): void {
    let confirm = this.alertCtrl.create({
      title: 'Confirm vehicle',
      message: 'This action will confirm the vehicle for testing.',
      buttons: [
        {
          text: 'Cancel',
        }, {
          text: 'Confirm',
          handler: () => {
            this.testReportService.addVehicle(this.testData, this.vehicleData);
            this.navCtrl.push('AddPreparerPage', {
              vehicle: this.vehicleData,
              test: this.testData
            });
          }
        }
      ]
    });
    confirm.present();
  }

  showMoreDetails(pageName: string): void {
    this.navCtrl.push(pageName, {
      vehicleData: this.vehicleData
    });
  }

  goToVehicleTestResultsHistory() {
    this.navCtrl.push('VehicleHistoryPage', {
      vehicleData: this.vehicleData,
      testResultsHistory: this.testResultHistory,
    });
  }

  onTestHistory() {
    this.navCtrl.push('VehicleHistoryPage');
  }
}
