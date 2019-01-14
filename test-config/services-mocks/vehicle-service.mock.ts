import { VehicleModel } from "../../src/models/vehicle/vehicle.model";
import { TestTypeModel } from "../../src/models/tests/test-type.model";
import { PreparersModel } from "../../src/models/reference-data-models/preparers.model";
import { Observable } from "rxjs";
import { CommonRegExp } from "../../src/providers/utils/common-regExp";
import { TechRecordDataMock } from "../../src/assets/data-mocks/tech-record-data.mock";
import { of } from "rxjs/observable/of";

export class VehicleServiceMock {

  createVehicle(vehicle: VehicleModel): VehicleModel {
    let newVehicle: VehicleModel = {} as VehicleModel;
    newVehicle.vrms = vehicle.vrms;
    newVehicle.vin = vehicle.vin;
    newVehicle.techRecord = [];
    newVehicle.techRecord.push(this.getCurrentTechRecord(vehicle));
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

  addPreparer(vehicle: VehicleModel, value: PreparersModel) {
    vehicle.preparerId = value.preparerId;
    vehicle.preparerName = value.preparerName;
  }

  setOdometer(vehicle: VehicleModel, odomReading: string, odomMetric: string) {
    vehicle.odometerReading = odomReading;
    vehicle.odometerMetric = odomMetric;
  }

  getVehicleTechRecord(param): Observable<VehicleModel> {
    return of(TechRecordDataMock.VehicleData);
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

  getVehicleCertificateExpirationDate(vehicle: VehicleModel): Date | string {
    let lastCertificateExpirationDate = vehicle.testResultsHistory[0].expiryDate;
    vehicle.testResultsHistory.forEach(test => {
      if (lastCertificateExpirationDate < test.expiryDate) {
        lastCertificateExpirationDate = test.expiryDate;
      }
    });
    return lastCertificateExpirationDate;
  }

  formatOdometerReadingValue(string: string) {
    return string.replace(CommonRegExp.ODOMETER_VALUE, ",");
  }


}
