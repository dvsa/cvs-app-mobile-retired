import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { VisitModel } from "../../../../models/visit/visit.model";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import {
  APP_STRINGS,
  DATE_FORMAT, DEFICIENCY_CATEGORY,
  ODOMETER_METRIC,
  TEST_TYPE_INPUTS,
  TEST_TYPE_RESULTS
} from "../../../../app/app.enums";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { CompleteTestPage } from "../complete-test/complete-test";
import { TestTypesFieldsMetadata } from "../../../../assets/app-data/test-types-data/test-types-fields.metadata";

@IonicPage()
@Component({
  selector: 'page-test-review',
  templateUrl: 'test-review.html',
})
export class TestReviewPage implements OnInit {
  visit: VisitModel;
  completedFields = [];
  appStrings;
  dateFormat;
  testTypeResults;
  deficiencyCategory;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public commonFunctions: CommonFunctionsService,
              private vehicleService: VehicleService,
              private defectsService: DefectsService,
              private modalCtrl: ModalController) {
    this.visit = this.navParams.get('visit');
  }

  ngOnInit(): void {
    this.appStrings = APP_STRINGS;
    this.dateFormat = DATE_FORMAT;
    this.testTypeResults = TEST_TYPE_RESULTS;
    this.deficiencyCategory = DEFICIENCY_CATEGORY;
  }

  getVehicleTypeIconToShow(vehicle: VehicleModel) {
    return vehicle.techRecord[0].vehicleType.toLowerCase();
  }

  getOdometerStringToBeDisplayed(vehicle) {
    let unit = vehicle.odometerMetric === ODOMETER_METRIC.KILOMETRES ? 'km' : 'mi';
    return this.vehicleService.formatOdometerReadingValue(vehicle.odometerReading) + ' ' + unit;
  }

  completeFields(testType) {
    if (testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] = testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT];
    }
    if (testType[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER] = testType[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER];
    }
    if (testType[TEST_TYPE_INPUTS.SIC_LAST_DATE]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = testType[TEST_TYPE_INPUTS.SIC_LAST_DATE];
    }
    if (testType[TEST_TYPE_INPUTS.CERTIFICATE_NUMBER]) {
      this.completedFields[TEST_TYPE_INPUTS.CERTIFICATE_NUMBER] = testType[TEST_TYPE_INPUTS.CERTIFICATE_NUMBER];
    }
  }

  getTestTypeOptionalFieldsToDisplay(testType, field) {
    let testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
    for (let testTypeFieldMetadata of testTypesFieldsMetadata) {
      if (testType.id === testTypeFieldMetadata.testTypeId) {
        return field === 'defects' ? testTypeFieldMetadata.hasDefects : testTypeFieldMetadata.hasNotes;
      }
    }
  }

  openTestDetailsPage(vehicle, testType) {
    this.completeFields(testType);
    const MODAL = this.modalCtrl.create('CompleteTestPage', {
      vehicle: vehicle,
      vehicleTest: testType,
      completedFields: this.completedFields,
      fromTestReview: true
    });
    MODAL.onDidDismiss(data => {
      for (let key of Object.keys(this.completedFields)) {
        if (!data[key] && data[key] !== false) {
          this.navCtrl.pop();
        }
      }
    });
    MODAL.present();
  }
}
