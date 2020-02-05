import {VehicleModel} from "../../src/models/vehicle/vehicle.model";
import {TestTypeModel} from "../../src/models/tests/test-type.model";
import {PreparersReferenceDataModel} from "../../src/models/reference-data-models/preparers.model";
import {Observable} from "rxjs";
import {CommonRegExp} from "../../src/providers/utils/common-regExp";
import {TechRecordDataMock} from "../../src/assets/data-mocks/tech-record-data.mock";
import {of} from "rxjs/observable/of";
import {VehicleTechRecordModel} from "../../src/models/vehicle/tech-record.model";
import {HttpEventType, HttpHeaders, HttpResponse} from "@angular/common/http";
import {TestResultModel} from "../../src/models/tests/test-result.model";
import {TestResultsDataMock} from "../../src/assets/data-mocks/test-results-data.mock";
import {TestResultsHistoryDataMock} from "../../src/assets/data-mocks/test-results-history-data.mock";
import {TEST_TYPE_INPUTS} from "../../src/app/app.enums";

export class VehicleServiceMock {

  createVehicle(vehicleTechRecord: VehicleTechRecordModel): VehicleModel {
    let newVehicle: VehicleModel = {} as VehicleModel;
    newVehicle.vrm = vehicleTechRecord.vrms.find((elem) => elem.isPrimary).vrm;
    newVehicle.vin = vehicleTechRecord.vin;
    newVehicle.techRecord = this.getCurrentTechRecord(vehicleTechRecord);
    newVehicle.testResultsHistory = [];
    newVehicle.odometerReading = '';
    newVehicle.odometerMetric = '';
    newVehicle.preparerId = '';
    newVehicle.preparerName = '';
    newVehicle.testTypes = [];
    return newVehicle;
  }

  addTestType(vehicle: VehicleModel, testType: TestTypeModel) {
    vehicle.testTypes.push(testType);
  }

  removeTestType(vehicle: VehicleModel, testType: TestTypeModel) {
    const foundIndex = vehicle.testTypes.indexOf(testType);
    vehicle.testTypes.splice(foundIndex, 1);
  }

  addPreparer(vehicle: VehicleModel, value: PreparersReferenceDataModel) {
    vehicle.preparerId = value.preparerId;
    vehicle.preparerName = value.preparerName;
  }

  setOdometer(vehicle: VehicleModel, odomReading: string, odomMetric: string) {
    vehicle.odometerReading = odomReading;
    vehicle.odometerMetric = odomMetric;
  }

  getVehicleTechRecords(param): Observable<VehicleModel[]> {
    return of([]);
  }

  getTestResultsHistory(): Observable<TestResultModel[]> {
    return of([]);
  }

  getCurrentTechRecord(array) {
    let currentArray = array.techRecord.find(
      techRec => {
        return techRec['statusCode'] == 'current'
      });
    currentArray.noOfAxles = 2;
    currentArray['vehicleSize'] = 'small';
    currentArray['vehicleConfiguration'] = 'rigid';
    return currentArray;
  }

  formatOdometerReadingValue(string: string) {
    return string.replace(CommonRegExp.ODOMETER_VALUE, ",");
  }

  hasOnlyOneTestTypeWithSic(vehicle: VehicleModel) {
    let testsFound = 0;
    for (let testType of vehicle.testTypes) {
      if (testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] || testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] === false) {
        testsFound++;
      }
    }
    return testsFound === 1;
  }

  removeSicFields(vehicle, fields) {
    if (this.hasOnlyOneTestTypeWithSic(vehicle)) {
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_CARRIED_OUT)) delete fields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT];
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER)) delete fields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER];
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_LAST_DATE)) delete fields[TEST_TYPE_INPUTS.SIC_LAST_DATE];
    }
  }
}
