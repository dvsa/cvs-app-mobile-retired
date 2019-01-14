import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, IonicPage} from 'ionic-angular';
import {Observable} from "rxjs";
import {TestService} from "../../../../providers/test/test.service";
import {TestModel} from "../../../../models/tests/test.model";

@IonicPage()
@Component({
  selector: 'page-test-summary',
  templateUrl: 'test-summary.html'
})
export class TestSummaryPage {
  testData: TestModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private testReportService: TestService) {
    this.testData = this.navParams.get('test');
  }

  submitTest(): void {
    this.testReportService.endTestReport(this.testData);
    let observables: Observable<any>[] = [];
    this.testData.vehicles.forEach(vehicle => {
      vehicle.testTypes.forEach(vehicleTest => {
        console.log('submit test', vehicleTest);
      });
    });

    Observable.forkJoin(observables).subscribe(
        () => {
          this.navCtrl.push('TestSubmittedPage', {
            test: this.testData
          });
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
