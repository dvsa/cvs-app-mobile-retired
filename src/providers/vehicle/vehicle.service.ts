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
import { STORAGE, TECH_RECORD_STATUS, TEST_TYPE_INPUTS } from "../../app/app.enums";
import { HttpResponse } from "@angular/common/http";
import { TestResultModel } from "../../models/tests/test-result.model";
import { map } from "rxjs/operators";
import { Log, LogsModel } from "../../modules/logs/logs.model";
import * as logsActions from "../../modules/logs/logs.actions";
import { Store } from "@ngrx/store";
import { StorageService } from "../natives/storage.service";
import { AuthService } from "../global/auth.service";

@Injectable()
export class VehicleService {

  constructor(private httpService: HTTPService,
              public visitService: VisitService,
              private store$: Store<LogsModel>,
              public storageService: StorageService,
              private authService: AuthService) {
  }

  createVehicle(vehicleTechRecord: VehicleTechRecordModel): VehicleModel {
    let newVehicle: VehicleModel = {} as VehicleModel;

    newVehicle.systemNumber = vehicleTechRecord.systemNumber;
    newVehicle.vrm = vehicleTechRecord.vrms.length ? vehicleTechRecord.vrms.find((elem) => elem.isPrimary).vrm : null;
    newVehicle.vin = vehicleTechRecord.vin;
    if (vehicleTechRecord.trailerId) newVehicle.trailerId = vehicleTechRecord.trailerId;
    newVehicle.techRecord = vehicleTechRecord.techRecord[0];
    newVehicle.testResultsHistory = [];
    newVehicle.countryOfRegistration = CountryOfRegistrationData.DefaultCountryData.key;
    newVehicle.euVehicleCategory = null;
    newVehicle.odometerReading = null;
    newVehicle.odometerMetric = null;
    newVehicle.preparerId = null;
    newVehicle.preparerName = null;
    newVehicle.testTypes = [];
    newVehicle.trailerId = vehicleTechRecord.trailerId;
    return newVehicle;
  }

  addTestType(vehicle: VehicleModel, testType: TestTypeModel): void {
    vehicle.testTypes.push(testType);
    this.visitService.updateVisit();
  }

  removeTestType(vehicle: VehicleModel, testType: TestTypeModel): void {
    const foundIndex = vehicle.testTypes.indexOf(testType);
    vehicle.testTypes.splice(foundIndex, 1);
    this.visitService.updateVisit();
  }

  addPreparer(vehicle: VehicleModel, value: PreparersReferenceDataModel): void {
    vehicle.preparerId = value.preparerId;
    vehicle.preparerName = value.preparerName;
    this.visitService.updateVisit();
  }

  getVehicleTechRecords(searchedValue: string, searchCriteriaQueryParam: string): Observable<VehicleModel[]> {
    searchedValue = searchedValue.replace(/\s+/g, '');
    return this.httpService.getTechRecords(searchedValue.toUpperCase(), searchCriteriaQueryParam)
      .map((techRecordsResponse: HttpResponse<VehicleTechRecordModel[]>) => {
        const log: Log = {
          type: 'info',
          message: `${this.authService.getOid()} - ${techRecordsResponse.status} ${techRecordsResponse.statusText} for API call to ${techRecordsResponse.url}`,
          timestamp: Date.now(),
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
        return techRecordsResponse.body.map(this.createVehicle);
      })
      .map((techRecords: VehicleModel[]) => {
        return techRecords.sort((a, b) => {
          //chassisMake attribute for PSVs and make attribute for HGVs and TRLs
          const first = a.techRecord.chassisMake || a.techRecord.make;
          const second = b.techRecord.chassisMake || b.techRecord.make;
          return first.localeCompare(second);
        });
      });
  }

  getTestResultsHistory(systemNumber: string): Observable<TestResultModel[]> {
    return this.httpService.getTestResultsHistory(systemNumber)
      .map((data) => {
        const log: Log = {
          type: 'info',
          message: `${this.authService.getOid()} - ${data.status} ${data.statusText} for API call to ${data.url}`,
          timestamp: Date.now(),
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
        this.storageService.update(STORAGE.TEST_HISTORY, data.body);
        return data.body;
      });
  }

  setOdometer(vehicle: VehicleModel, odomReading: string, odomMetric: string): VehicleModel {
    vehicle.odometerReading = odomReading;
    vehicle.odometerMetric = odomMetric;
    this.visitService.updateVisit();
    return vehicle;
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

  formatOdometerReadingValue(string: string): string {
    return string ? string.replace(CommonRegExp.ODOMETER_VALUE, ",") : null;
  }

}
