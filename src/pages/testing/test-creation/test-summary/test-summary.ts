import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, IonicPage} from 'ionic-angular';
import {TestReportModel} from '../../../../models/test-report.model';
import {VehicleTestService} from '../../../../providers/vehicle-test.service';
import {Observable} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-test-summary',
  templateUrl: 'test-summary.html'
})
export class TestSummaryPage {
  testReport: TestReportModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vehicleTestService: VehicleTestService, public alertCtrl: AlertController) {
    this.testReport = navParams.get('testReport');
  }

  submitTest(): void {
    this.testReport.endTestReport();
    let observables: Observable<any>[] = [];
    this.testReport.getVehicles().forEach(vehicle => {
      vehicle.getVehicleTests().forEach(vehicleTest => {
        observables.push(this.vehicleTestService.postVehicleTest(vehicleTest, vehicle));
      });
    });

    Observable.forkJoin(observables).subscribe(
        () => {
          this.navCtrl.push('TestSubmittedPage', {testReport: this.testReport});
        },
        (error) => {
          let alert = this.alertCtrl.create({
            title: 'Test was not submitted',
            subTitle: 'Please close the session and reopen the application.',
            buttons: ['OK']
          })
          alert.present();
        }
      );
  }
}
