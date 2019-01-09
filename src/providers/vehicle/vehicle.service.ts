import { VehicleModel } from "../../models/vehicle/vehicle.model";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { CommonRegExp } from "../utils/common-regExp";
import { map } from "rxjs/operators";
import { STORAGE } from "../../app/app.enums";
import { HTTPService } from "../global/http.service";
import { StorageService } from "../natives/storage.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class VehicleService {

  constructor(private httpService: HTTPService, private storageService: StorageService) {
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

  addTestType(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    vehicle.testTypes.push(vehicleTest)
  }

  removeTestType(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    const foundIndex = vehicle.testTypes.indexOf(vehicleTest);
    vehicle.testTypes.splice(foundIndex, 1);
  }

  getVehicleTechRecord(param): Observable<VehicleModel> {
    return this.httpService.getTechRecords(param).pipe(
      map((data: VehicleModel) => {
        this.storageService.update(STORAGE.TECH_RECORDS, data);
        return data;
      })
    )
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

  getVehicleCertificateExpirationDate(vehicle: VehicleModel): Date {
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
