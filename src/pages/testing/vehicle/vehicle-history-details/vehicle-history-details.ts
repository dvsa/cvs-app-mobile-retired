import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { TEST_RESULT, DEFICIENCY_CATEGORY, DEFAULT_VALUES } from '../../../../app/app.enums';
import {
  TestsWithoutCertificate,
  TestsWithoutTestExpiry,
  TestsWithoutSeatbelts,
  TestsWithoutDefects
} from '../../../../assets/app-data/test-required-fields/test-required-fields.data';

@IonicPage()
@Component({
  selector: 'page-vehicle-history-details',
  templateUrl: 'vehicle-history-details.html',
})
export class VehicleHistoryDetailsPage {
  testResultHistory: any;
  testIndex: number;
  testTypeIndex: number;
  selectedTestResult: string;
  selectedTestType: string;
  testResult: {};
  defaultValues: {};
  testsWithoutCertificate: any;
  testsWithoutTestExpiry: any;
  testsWithoutSeatbelts: any;
  testsWithoutDefects: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public commonFunc: CommonFunctionsService) {
    this.testResultHistory = navParams.get('testResultHistory');
    this.testIndex = navParams.get('testIndex');
    this.testTypeIndex = navParams.get('testTypeIndex');
  }

  ngOnInit() {
    this.selectedTestResult = this.testResultHistory[this.testIndex];
    this.selectedTestType = this.testResultHistory[this.testIndex].testTypes[this.testTypeIndex];
    this.testResult = TEST_RESULT;
    this.defaultValues = DEFAULT_VALUES;
    this.testsWithoutCertificate = TestsWithoutCertificate.TestsWithoutCertificate;
    this.testsWithoutTestExpiry = TestsWithoutTestExpiry.TestsWithoutTestExpiry;
    this.testsWithoutSeatbelts = TestsWithoutSeatbelts.TestsWithoutSeatbelts;
    this.testsWithoutDefects = TestsWithoutDefects.TestsWithoutDefects;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Test history');
  }

  getDeficiencyColor(deficiencyCategory: string): string {
    switch (deficiencyCategory.toLowerCase()) {
      case DEFICIENCY_CATEGORY.ADVISORY:
        return 'light';
      case DEFICIENCY_CATEGORY.DANGEROUS:
        return 'dark';
      case DEFICIENCY_CATEGORY.MAJOR:
        return 'danger';
      case DEFICIENCY_CATEGORY.MINOR:
        return 'attention';
    }
  }

  getTestResultColor(testResult: string): string {
    switch (testResult.toLowerCase()) {
      case TEST_RESULT.PASS:
        return 'secondary';
      case TEST_RESULT.FAIL:
        return 'danger';
      case TEST_RESULT.PRS:
        return 'primary';
    }
  }
}
