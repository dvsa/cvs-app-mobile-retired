import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { 
  TEST_TYPE_RESULTS, 
  DEFICIENCY_CATEGORY, 
  DEFAULT_VALUES, 
  APP_STRINGS, 
  ODOMETER_METRIC 
} from '../../../../app/app.enums';
import {
  TestsWithoutCertificate,
  TestsWithoutSeatbelts,
  TestsWithoutDefects
} from '../../../../assets/app-data/test-required-fields/test-required-fields.data';
import { TestTypeModel } from "../../../../models/tests/test-type.model";

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
  selectedTestType: TestTypeModel;
  testTypeResults: {};
  defaultValues: {};
  testsWithoutCertificate: any;
  testsWithoutSeatbelts: any;
  testsWithoutDefects: any;
  doesNotHaveCert: boolean;
  doesNotHaveDefects: boolean;
  doesNotHaveBelts: boolean;
  doesNotHaveExpiry: boolean;
  isTestResultAbandon: boolean;
  isTestResultFail: boolean;
  testResultColor: string;
  distanceType: string;


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
    this.testTypeResults = TEST_TYPE_RESULTS;
    this.defaultValues = DEFAULT_VALUES;

    this.setTestMetadata();
    this.compareTestWithMetadata();

    this.isTestResultAbandon = this.commonFunc.checkForMatch(this.selectedTestType.testResult, TEST_TYPE_RESULTS.ABANDONED);
    this.isTestResultFail = this.commonFunc.checkForMatch(this.selectedTestType.testResult, TEST_TYPE_RESULTS.FAIL);
    this.testResultColor = this.commonFunc.getTestResultColor(this.selectedTestType.testResult);
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.TEST_HISTORY);
  }

  setTestMetadata(){
    this.testsWithoutCertificate = TestsWithoutCertificate.TestsWithoutCertificate;
    this.testsWithoutSeatbelts = TestsWithoutSeatbelts.TestsWithoutSeatbelts;
    this.testsWithoutDefects = TestsWithoutDefects.TestsWithoutDefects;
    this.distanceType = this.commonFunc.getDistanceType(this.testResultHistory[this.testIndex].odometerReadingUnits);
  }

  compareTestWithMetadata(){
    this.doesNotHaveCert = this.commonFunc.checkForMatchInArray(this.selectedTestType.testTypeName, this.testsWithoutCertificate);
    this.doesNotHaveDefects = this.commonFunc.checkForMatchInArray(this.selectedTestType.testTypeName, this.testsWithoutDefects);
    this.doesNotHaveBelts = this.commonFunc.checkForMatchInArray(this.selectedTestType.testTypeName, this.testsWithoutSeatbelts);
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

}
