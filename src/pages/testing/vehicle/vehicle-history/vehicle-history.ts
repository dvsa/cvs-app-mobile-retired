import { Component } from '@angular/core';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { TEST_TYPE_RESULTS } from '../../../../app/app.enums';
import { TestResultModel } from "../../../../models/tests/test-result.model";

@IonicPage()
@Component({
  selector: 'page-vehicle-history',
  templateUrl: 'vehicle-history.html',
})

export class VehicleHistoryPage {
  vehicleData: VehicleModel;
  testResultHistory: TestResultModel[];
  testTypeResults: {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public commonFunc: CommonFunctionsService) {
    this.vehicleData = navParams.get('vehicleData');
    this.testResultHistory = navParams.get('testResultsHistory');
  }

  ngOnInit(){
    this.testTypeResults = TEST_TYPE_RESULTS;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Vehicle details');
  }

  showTestDetails(testIndex: number, testTypeIndex: number): void {
    this.navCtrl.push('VehicleHistoryDetailsPage', {
      testResultHistory: this.testResultHistory,
      testIndex: testIndex,
      testTypeIndex: testTypeIndex
    });
  }

  getTestResultColor(testResult: string): string {
    switch (testResult.toLowerCase()) {
      case TEST_TYPE_RESULTS.PASS:
        return 'secondary';
      case TEST_TYPE_RESULTS.FAIL:
      case TEST_TYPE_RESULTS.ABANDONED: 
        return 'danger';
      case TEST_TYPE_RESULTS.PRS:
        return 'primary';
    }
  }
}
