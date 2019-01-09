import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { Observable } from "rxjs";
import { TestReportService } from "../../../../providers/test-report/test-report.service";
import { TestReportModel } from "../../../../models/tests/test-report.model";

@IonicPage()
@Component({
  selector: 'page-test-summary',
  templateUrl: 'test-summary.html'
})
export class TestSummaryPage {
  testReport: TestReportModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private testReportService: TestReportService) {
    this.testReport = this.testReportService.getTestReport();
  }

  submitTest(): void {
    this.testReportService.endTestReport();
    let observables: Observable<any>[] = [];
    this.testReport.vehicles.forEach(vehicle => {
      vehicle.testTypes.forEach(vehicleTest => {
        console.log('submit test', vehicleTest);
      });
    });

    Observable.forkJoin(observables).subscribe(
      () => {
        this.navCtrl.push('TestSubmittedPage');
      },
      (error) => {
        let alert = this.alertCtrl.create({
          title: 'Test was not submitted',
          subTitle: 'Please close the session and reopen the application.',
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
}
