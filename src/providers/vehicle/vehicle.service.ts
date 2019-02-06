import { VehicleModel } from "../../models/vehicle/vehicle.model";
import { CommonRegExp } from "../utils/common-regExp";
import { HTTPService } from "../global/http.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { VisitService } from "../visit/visit.service";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { TechRecordModel, VehicleTechRecordModel } from "../../models/vehicle/tech-record.model";
import { PreparersReferenceDataModel } from "../../models/reference-data-models/preparers.model";
import { CountryOfRegistrationData } from "../../assets/app-data/country-of-registration/country-of-registration.data";
import { TECH_RECORD_STATUS } from "../../models/models.enums";

@Injectable()
export class VehicleService {

  constructor(private httpService: HTTPService, public visitService: VisitService) {
  }

  createVehicle(vehicleTechRecord: VehicleTechRecordModel): VehicleModel {
    let newVehicle: VehicleModel = {} as VehicleModel;
    newVehicle.vrm = vehicleTechRecord.vrms.find((elem) => elem.isPrimary).vrm;
    newVehicle.vin = vehicleTechRecord.vin;
    newVehicle.techRecord = [];
    newVehicle.techRecord.push(this.getCurrentTechRecord(vehicleTechRecord));
    newVehicle.testResultsHistory = [];
    newVehicle.countryOfRegistration = CountryOfRegistrationData.DefaultCountryData.key;
    newVehicle.euVehicleCategory = '';
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

  addPreparer(vehicle: VehicleModel, value: PreparersReferenceDataModel): void {
    vehicle.preparerId = value.preparerId;
    vehicle.preparerName = value.preparerName;
    if (this.visitService.easterEgg == 'false') this.visitService.updateVisit();
  }


  getVehicleTechRecord(param): Observable<VehicleTechRecordModel> {
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

  getCurrentTechRecord(vehicle: VehicleModel | VehicleTechRecordModel): TechRecordModel {
    let currentArray = vehicle.techRecord.find(
      (techRec: TechRecordModel) => {
        return techRec['statusCode'] == TECH_RECORD_STATUS.CURRENT
      });
    return currentArray;
  }

  formatOdometerReadingValue(string: string): string {
    return string.replace(CommonRegExp.ODOMETER_VALUE, ",");
  }

}
