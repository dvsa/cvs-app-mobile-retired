import { TestBed } from "@angular/core/testing";
import { TechRecordDataMock } from "../../assets/data-mocks/tech-record-data.mock";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../assets/data-mocks/data-model/test-type-data-model.mock";
import { VisitService } from "../visit/visit.service";
import { VisitServiceMock } from "../../../test-config/services-mocks/visit-service.mock";
import { HTTPService } from "../global/http.service";
import { VehicleService } from "./vehicle.service";
import { PreparersReferenceDataModel } from "../../models/reference-data-models/preparers.model";
import { ODOMETER_METRIC, TEST_TYPE_RESULTS } from "../../app/app.enums";
import { VehicleTechRecordModel } from "../../models/vehicle/tech-record.model";
import { VehicleDataMock } from "../../assets/data-mocks/vehicle-data.mock";

describe('Provider: VehicleService', () => {
  let vehicleService: VehicleService;
  let visitService: VisitService;
  let httpService: HTTPService;
  let httpServiceSpy: any;
  let vehicle = VehicleDataMock.VehicleData;

  const VEHICLE_TECH_RECORD: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
  const TEST_TYPE: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const PREPARER: PreparersReferenceDataModel = {
    preparerId: "AK4434",
    preparerName: "Durrell Vehicles Limited"
  };


  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['getTechRecords', 'getTestResultsHistory']);

    TestBed.configureTestingModule({
      providers: [
        VehicleService,
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: HTTPService, useValue: httpServiceSpy},
      ]
    });
    vehicleService = TestBed.get(VehicleService);
    visitService = TestBed.get(VisitService);
    httpService = TestBed.get(HTTPService);
  });

  afterEach(() => {
    vehicleService = null;
    visitService = null;
    httpService = null;
  });

  it('should create a new vehicle', () => {
    let newVehicle;
    expect(newVehicle).toBeUndefined();
    newVehicle = vehicleService.createVehicle(VEHICLE_TECH_RECORD);
    expect(newVehicle.techRecord).toBeDefined();
    expect(newVehicle.vrm).toEqual('BQ91YHQ');
  });

  it('should create a vehicle with null VRM if vrms array is empty', () => {
    let newVehicle;
    expect(newVehicle).toBeUndefined();
    let vehicleTechRecord = {...VEHICLE_TECH_RECORD};
    vehicleTechRecord.vrms = [];
    newVehicle = vehicleService.createVehicle(vehicleTechRecord);
    expect(newVehicle.techRecord).toBeDefined();
    expect(newVehicle.vrm).toBeNull();
  });

  it('should add a test-type to vehicle.testTypes array', () => {
    let newVehicle = vehicleService.createVehicle(VEHICLE_TECH_RECORD);
    expect(newVehicle.testTypes.length).toBe(0);
    vehicleService.addTestType(newVehicle, TEST_TYPE);
    expect(newVehicle.testTypes.length).toBe(1);
  });

  it('should add odometer values', () => {
    let odomReading: string = '1234';
    let odomMetric: ODOMETER_METRIC = ODOMETER_METRIC.KILOMETRES;
    let newVehicle = vehicleService.createVehicle(VEHICLE_TECH_RECORD);
    expect(newVehicle.odometerMetric).toBeFalsy();
    expect(newVehicle.odometerReading).toBeFalsy();
    vehicleService.setOdometer(newVehicle, odomReading, odomMetric);
    expect(newVehicle.odometerReading).toBe(odomReading);
    expect(newVehicle.odometerMetric).toBe(odomMetric);
  });

  it('should remove the added test-type from vehicle.testTypes array', () => {
    let newVehicle = vehicleService.createVehicle(VEHICLE_TECH_RECORD);
    expect(newVehicle.testTypes.length).toBe(0);
    vehicleService.addTestType(newVehicle, TEST_TYPE);
    expect(newVehicle.testTypes.length).toBe(1);
    vehicleService.removeTestType(newVehicle, TEST_TYPE);
    expect(newVehicle.testTypes.length).toBe(0);
  });

  it('should add preparer to vehicle', () => {
    let newVehicle = vehicleService.createVehicle(VEHICLE_TECH_RECORD);
    expect(newVehicle.preparerId).toBeFalsy();
    expect(newVehicle.preparerName).toBeFalsy();
    vehicleService.addPreparer(newVehicle, PREPARER);
    expect(newVehicle.preparerId).toBeTruthy();
    expect(newVehicle.preparerName).toBeTruthy();
  });

  it('should format odometer reading value', () => {
    let number = '1000';
    expect(vehicleService.formatOdometerReadingValue(number)).toBe('1,000');

    number = null;
    expect(vehicleService.formatOdometerReadingValue(null)).toBeNull();
  });

  it('should check if httpService.getTechRecords was called', () => {
    vehicleService.getVehicleTechRecord('BQ91YHQ', 'all');
    expect(httpService.getTechRecords).toHaveBeenCalled();
  });

  it('should check if httpService.getTestResultsHistory was called', () => {
    vehicleService.getTestResultsHistory('BQ91YHQ');
    expect(httpService.getTestResultsHistory).toHaveBeenCalled();
  });

  it('should test hasOnlyOneTestTypeWithSic', () => {
    for (let i = 0; i <= 3; i++) vehicle.testTypes.push(TEST_TYPE);
    vehicle.testTypes.push({
      name: 'annual test',
      testTypeName: 'Annual test',
      testTypeId: '1',
      certificateNumber: null,
      testTypeStartTimestamp: '2018-12-19T00:00:00.000Z',
      testTypeEndTimestamp: null,
      numberOfSeatbeltsFitted: null,
      lastSeatbeltInstallationCheckDate: null,
      seatbeltInstallationCheckDate: false,
      prohibitionIssued: null,
      additionalNotesRecorded: null,
      testResult: TEST_TYPE_RESULTS.PASS,
      reasonForAbandoning: null,
      additionalCommentsForAbandon: null,
      defects: [],
      reasons: [],
      linkedIds: null
    });
    let onlyOne = vehicleService.hasOnlyOneTestTypeWithSic(vehicle);
    expect(onlyOne).toBeTruthy();
  });
});
