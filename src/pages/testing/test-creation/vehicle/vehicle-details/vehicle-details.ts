import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { TestReportModel } from '../../../../../models/tests/test-report.model';
import { VehicleModel } from '../../../../../models/vehicle/vehicle.model';
import { TestReportService } from "../../../../../providers/test-report/test-report.service";
import { CommonFunctionsService } from "../../../../../providers/utils/common-functions";
import { DATE_FORMAT } from "../../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html'
})
export class VehicleDetailsPage {
  testReport: TestReportModel;
  vehicleData: VehicleModel;
  dateFormat: string;

  constructor(public navCtrl: NavController, 
              private navParams: NavParams, 
              private testReportService: TestReportService, 
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public commonFunc: CommonFunctionsService) {
    this.testReport = this.testReportService.getTestReport();
    this.vehicleData = navParams.get('vehicle');
    this.viewCtrl = viewCtrl;
    this.dateFormat = DATE_FORMAT.DD_MM_YYYY;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Identify Vehicle');
  }

  addVehicle(): void {
    let self = this;
    this.testReportService.addVehicle(this.vehicleData);
    if (self.navCtrl.getByIndex(self.navCtrl.length() - 3).component.name == 'VisitTimelinePage') {
      this.navCtrl.insert(this.navCtrl.length() - 2, 'TestCreatePage')
        .then(() => {
            self.navCtrl.popTo(self.navCtrl.getByIndex(self.navCtrl.length() - 3));
          }
        );
    } else {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
    }
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
            this.testReportService.addVehicle(this.vehicleData);
            this.navCtrl.push('AddPreparerPage');
          }
        }
      ]
    });
    confirm.present();
  }

  refuseVehicle(): void {

  }

  showMoreDetails(pageName: string): void {
    this.navCtrl.push(pageName, {
      vehicleData: this.vehicleData
      });
  }
}
