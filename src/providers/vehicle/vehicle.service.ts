import { VehicleModel } from '../../models/vehicle/vehicle.model';
import { CommonRegExp } from '../utils/common-regExp';
import { HTTPService } from '../global/http.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { VisitService } from '../visit/visit.service';
import { TestTypeModel } from '../../models/tests/test-type.model';
import { VehicleTechRecordModel } from '../../models/vehicle/tech-record.model';
import { PreparersReferenceDataModel } from '../../models/reference-data-models/preparers.model';
import { CountryOfRegistrationData } from '../../assets/app-data/country-of-registration/country-of-registration.data';
import { APP_STRINGS, STORAGE, TEST_TYPE_INPUTS } from '../../app/app.enums';
import { HttpResponse } from '@angular/common/http';
import { TestResultModel } from '../../models/tests/test-result.model';
import { StorageService } from '../natives/storage.service';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { AlertController } from 'ionic-angular';
import { LogsProvider } from '../../modules/logs/logs.service';

@Injectable()
export class VehicleService {
  constructor(
    private httpService: HTTPService,
    public visitService: VisitService,
    public storageService: StorageService,
    private authenticationService: AuthenticationService,
    private logProvider: LogsProvider
  ) {}

  createVehicle(vehicleTechRecord: VehicleTechRecordModel): VehicleModel {
    let newVehicle: VehicleModel = {} as VehicleModel;

    newVehicle.systemNumber = vehicleTechRecord.systemNumber;
    newVehicle.vrm = vehicleTechRecord.vrms.length
      ? vehicleTechRecord.vrms.find((elem) => elem.isPrimary).vrm
      : null;
    newVehicle.vin = vehicleTechRecord.vin;
    if (vehicleTechRecord.trailerId) newVehicle.trailerId = vehicleTechRecord.trailerId;
    newVehicle.techRecord = vehicleTechRecord.techRecord[0];
    newVehicle.testResultsHistory = [];
    newVehicle.countryOfRegistration = CountryOfRegistrationData.DefaultCountryData.key;
    newVehicle.euVehicleCategory = vehicleTechRecord.techRecord[0].euVehicleCategory || null;
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

  getVehicleTechRecords(
    searchedValue: string,
    searchCriteriaQueryParam: string
  ): Observable<VehicleModel[]> {
    return this.httpService
      .getTechRecords(searchedValue.toUpperCase(), searchCriteriaQueryParam)
      .map((techRecordsResponse: HttpResponse<VehicleTechRecordModel[]>) => {
        this.logProvider.dispatchLog({
          type: 'info',
          message: `${this.authenticationService.tokenInfo.oid} - ${techRecordsResponse.status} ${techRecordsResponse.statusText} for API call to ${techRecordsResponse.url}`,
          timestamp: Date.now()
        });

        return techRecordsResponse.body.map(this.createVehicle);
      })
      .map((techRecords: VehicleModel[]) => {
        return techRecords.sort((a, b) => this.compareVehicles(a, b));
      });
  }

  getTestResultsHistory(systemNumber: string): Observable<TestResultModel[]> {
    return this.httpService.getTestResultsHistory(systemNumber).map((data) => {
      this.logProvider.dispatchLog({
        type: 'info',
        message: `${this.authenticationService.tokenInfo.oid} - ${data.status} ${data.statusText} for API call to ${data.url}`,
        timestamp: Date.now()
      });

      this.storageService.update(STORAGE.TEST_HISTORY + systemNumber, data.body);
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
      if (
        testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] ||
        testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] === false
      ) {
        testsFound++;
      }
    }
    return testsFound === 1;
  }

  removeSicFields(vehicle, fields) {
    if (this.hasOnlyOneTestTypeWithSic(vehicle)) {
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_CARRIED_OUT))
        delete fields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT];
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER))
        delete fields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER];
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_LAST_DATE))
        delete fields[TEST_TYPE_INPUTS.SIC_LAST_DATE];
    }
  }

  formatOdometerReadingValue(string: string): string {
    return string ? string.replace(CommonRegExp.ODOMETER_VALUE, ',') : null;
  }

  createSkeletonAlert(alertCtrl: AlertController) {
    const ALERT = alertCtrl.create({
      title: APP_STRINGS.SKELETON_ALERT_TITLE,
      message: APP_STRINGS.SKELETON_ALERT_MESSAGE,
      buttons: [APP_STRINGS.OK]
    });
    ALERT.present();
  }

  isVehicleSkeleton(vehicle: VehicleModel) {
    return vehicle.techRecord.recordCompleteness === APP_STRINGS.SKELETON;
  }

  compareVehicles(vehicle1: VehicleModel, vehicle2: VehicleModel): number {
    if (!this.isVehicleSkeleton(vehicle1) && this.isVehicleSkeleton(vehicle2)) {
      return -1;
    }
    if (this.isVehicleSkeleton(vehicle1) && !this.isVehicleSkeleton(vehicle2)) {
      return 1;
    }
    const first = vehicle1.techRecord.chassisMake || vehicle1.techRecord.make;
    const second = vehicle2.techRecord.chassisMake || vehicle2.techRecord.make;
    return first.localeCompare(second);
  }

  displayVehicleCategoryKey(key: string): string {
    return key === 'l1e-a' ? 'l1e-A' : key;
  }
}
