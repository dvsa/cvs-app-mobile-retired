import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {TestReportModel} from '../../../../../models/test-report.model';
import {VehicleModel} from '../../../../../models/vehicle.model';
import {TestReportService} from "../../../../../providers/test-report/test-report.service";

@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html'
})
export class VehicleDetailsPage {
  testReport: TestReportModel;
  vehicle: VehicleModel;

  constructor(public navCtrl: NavController, private navParams: NavParams, private testReportService: TestReportService, public viewCtrl: ViewController) {
    this.testReport = this.testReportService.getTestReport();
    this.vehicle = navParams.get('vehicle');
    this.viewCtrl = viewCtrl;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Identify Vehicle');
  }

  addVehicle(): void {
    let self = this;
    this.testReportService.addVehicle(this.vehicle);
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
    this.testReportService.addVehicle(this.vehicle);
    this.navCtrl.push('AddPreparerPage');
  }

  refuseVehicle(): void {

  }

  showVehicleBrakes(): void {
    this.navCtrl.push('VehicleBrakesPage');
  }
  
  showVehicleTyres(): void {
    this.navCtrl.push('VehicleTyresPage');
  }
  
  showVehicleWeights(): void {
    this.navCtrl.push('VehicleWeightsPage');
  }
  
  showVehicleAdditional(): void {
    this.navCtrl.push('VehicleAdditionalPage');
	}
}
