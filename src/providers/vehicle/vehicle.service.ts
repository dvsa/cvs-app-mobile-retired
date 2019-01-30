import { TechRecordModel, VehicleModel } from "../../models/vehicle/vehicle.model";
import { CommonRegExp } from "../utils/common-regExp";
import { HTTPService } from "../global/http.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { PreparersModel } from "../../models/reference-data-models/preparers.model";
import { VisitService } from "../visit/visit.service";
import { TestTypeModel } from "../../models/tests/test-type.model";

@Injectable()
export class VehicleService {

  constructor(private httpService: HTTPService, public visitService: VisitService) {
  }

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

  addTestType(vehicle: VehicleModel, testType: TestTypeModel): void {
    vehicle.testTypes.push(testType);
    if (this.visitService.easterEgg == 'false') this.visitService.updateVisit();
  }

  removeTestType(vehicle: VehicleModel, testType: TestTypeModel): void {
    const foundIndex = vehicle.testTypes.indexOf(testType);
    vehicle.testTypes.splice(foundIndex, 1);
    if (this.visitService.easterEgg == 'false') this.visitService.updateVisit();
  }

  addPreparer(vehicle: VehicleModel, value: PreparersModel): void {
    vehicle.preparerId = value.preparerId;
    vehicle.preparerName = value.preparerName;
    if (this.visitService.easterEgg == 'false') this.visitService.updateVisit();
  }


  getVehicleTechRecord(param): Observable<VehicleModel> {
    return this.httpService.getTechRecords(param);
  }

  getTestResultsHistory(vin: string): Observable<any> {
    return this.httpService.getTestResultsHistory(vin);
  }

  setOdometer(vehicle: VehicleModel, odomReading: string, odomMetric: string): VehicleModel {
    vehicle.odometerReading = odomReading;
    vehicle.odometerMetric = odomMetric;
    if (this.visitService.easterEgg == 'false') this.visitService.updateVisit();
    return vehicle;
  }

  getCurrentTechRecord(array): TechRecordModel {
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

  formatOdometerReadingValue(string: string): string {
    return string.replace(CommonRegExp.ODOMETER_VALUE, ",");
  }

}
