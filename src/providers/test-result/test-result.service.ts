import { TestResultModel } from "../../models/tests/test-result.model";
import { VehicleModel } from "../../models/vehicle/vehicle.model";
import { HTTPService } from "../global/http.service";
import { Injectable } from "@angular/core";
import { TEST_TYPE_RESULTS } from "../../app/app.enums";
import { CommonFunctionsService } from "../utils/common-functions";
import { TestTypeService } from "../test-type/test-type.service";

@Injectable()
export class TestResultService {

  constructor(private httpService: HTTPService, private commFunc: CommonFunctionsService, private testTypeService: TestTypeService) {

  }

  createTestResult(visit, test, vehicle: VehicleModel): TestResultModel {
    let newTestResult = {} as TestResultModel;

    newTestResult.vrm = vehicle.vrm;
    newTestResult.vin = vehicle.vin;
    newTestResult.testStationName = visit.testStationName;
    newTestResult.testStationPNumber = visit.testStationPNumber;
    newTestResult.testStationType = visit.testStationType;
    newTestResult.testerName = visit.testerName;
    newTestResult.testerStaffId = visit.testerId;
    newTestResult.testerEmailAddress = visit.testerEmail;
    newTestResult.testStartTimestamp = test.startTime;
    newTestResult.testEndTimestamp = test.endTime;
    newTestResult.testStatus = test.status;
    newTestResult.reasonForCancellation = test.reasonForCancellation;
    newTestResult.vehicleClass = vehicle.techRecord.vehicleClass;
    newTestResult.vehicleType = vehicle.techRecord.vehicleType;
    newTestResult.numberOfSeats = vehicle.techRecord.seatsLowerDeck + vehicle.techRecord.seatsUpperDeck;
    newTestResult.vehicleConfiguration = vehicle.techRecord.vehicleConfiguration;
    newTestResult.odometerReading = parseInt(vehicle.odometerReading); // to match backend implementation
    newTestResult.odometerReadingUnits = vehicle.odometerMetric;
    newTestResult.preparerId = vehicle.preparerId;
    newTestResult.preparerName = vehicle.preparerName;
    newTestResult.euVehicleCategory = vehicle.euVehicleCategory;
    newTestResult.countryOfRegistration = vehicle.countryOfRegistration;
    newTestResult.vehicleSize = vehicle.techRecord.vehicleSize;
    newTestResult.testTypes = vehicle.testTypes;

    return newTestResult;
  }

  concatenateReasonsArray(reasons: string[]) {
    let str = '';
    if (reasons.length > 1) {
      for (let i = 0; i < reasons.length - 1; i++) {
        str += reasons[i] + '. ';
      }
    }
    str += reasons[reasons.length - 1] + '.';

    return str;
  }

  submitTestResult(testResult: TestResultModel) {
    // to match backend implementation
    let newTestResult = this.commFunc.cloneObject(testResult);

    if (!newTestResult.reasonForCancellation) delete newTestResult.reasonForCancellation;
    if (!newTestResult.odometerReading) delete newTestResult.odometerReading;
    if (!newTestResult.odometerReadingUnits) delete newTestResult.odometerReadingUnits;
    if (!newTestResult.euVehicleCategory) delete newTestResult.euVehicleCategory;

    if (newTestResult.testTypes.length) {
      for (let testType of newTestResult.testTypes) {
        if (testType.hasOwnProperty('reasons')) {
          if (testType.reasons.length) {
            testType.reasonForAbandoning = this.concatenateReasonsArray(testType.reasons);
          }
          delete testType.reasons;
        }
        if (testType.certificateNumber.length) {
          testType.certificateNumber = testType.testResult === TEST_TYPE_RESULTS.PASS ? 'LP' + testType.certificateNumber : 'LF' + testType.certificateNumber;
        }
        delete testType.completionStatus;
        delete testType.testTypeCategoryName;
        if (!testType.certificateNumber) delete testType.certificateNumber;
        if (!testType.reasonForAbandoning) delete testType.reasonForAbandoning;
        if (!testType.additionalNotesRecorded) delete testType.additionalNotesRecorded;
        if (!testType.additionalCommentsForAbandon) delete testType.additionalCommentsForAbandon;
        if (!testType.numberOfSeatbeltsFitted) delete testType.numberOfSeatbeltsFitted;
        if (!testType.lastSeatbeltInstallationCheckDate) delete testType.lastSeatbeltInstallationCheckDate;
        if (!testType.seatbeltInstallationCheckDate) delete testType.seatbeltInstallationCheckDate;

        this.testTypeService.endTestType(testType);

        if (testType.defects.length) {
          for (let defect of testType.defects) {
            if (defect.hasOwnProperty('metadata')) delete defect.metadata;
            for (let key in defect.additionalInformation.location) {
              if (!defect.additionalInformation.location[key]) delete defect.additionalInformation.location[key]
            }
            if (!defect.additionalInformation.notes) delete defect.additionalInformation.notes;
          }
        }
      }
    }

    return this.httpService.postTestResult(newTestResult)
  }
}
