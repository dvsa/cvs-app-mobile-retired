import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { TestReport } from '../../../../models/testReport';
import { TestSubmittedPage } from '../../testSubmitted/testSubmitted';

import { VehicleTestService } from '../../../../services/vehicleTest.service';

@Component({
  selector: 'page-testSummary',
  templateUrl: 'testSummary.html'
})
export class TestSummaryPage {

  testReport: TestReport;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private vehicleTestService: VehicleTestService, public alertCtrl: AlertController) {
    this.testReport = navParams.get('testReport');
  }

  submitTest() {
    this.testReport.endTestReport();
    
    var promises:Promise<any>[] = [];

    this.testReport.getVehicles().forEach(vehicle => {
      vehicle.getVehicleTests().forEach(vehicleTest => {
        promises.push(this.vehicleTestService.postVehicleTest(vehicleTest, vehicle));
      });
    });

    Promise.all(promises).then(() => {
      this.navCtrl.push(TestSubmittedPage, {'testReport': this.testReport});
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Test was not submitted',
        subTitle: 'Please close the session and reopen the application.',
        buttons: ['OK']
      })
      alert.present();
    });
  }
}
