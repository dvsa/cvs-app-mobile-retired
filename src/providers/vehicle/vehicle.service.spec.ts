import { TestBed } from "@angular/core/testing";
import { VehicleModel } from "../../models/vehicle/vehicle.model";
import { TechRecordDataMock } from "../../assets/data-mocks/tech-record-data.mock";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../assets/data-mocks/data-model/test-type-data-model.mock";
import { VisitService } from "../visit/visit.service";
import { VisitServiceMock } from "../../../test-config/services-mocks/visit-service.mock";
import { of } from "rxjs/observable/of";
import { HTTPService } from "../global/http.service";
import { VehicleService } from "./vehicle.service";
import { PreparersModel } from "../../models/reference-data-models/preparers.model";
import { ODOMETER_METRIC } from "../../app/app.enums";

describe('Provider: VehicleService', () => {
  let vehicleService: VehicleService;
  let visitService: VisitService;
  let httpService: HTTPService;
  let httpServiceSpy: any;

  const VEHICLE: VehicleModel = TechRecordDataMock.VehicleData;
  const TEST_TYPE: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const PREPARER: PreparersModel = {
    preparerId: "AK4434",
    preparerName: "Durrell Vehicles Limited"
  };


  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HTTPService', [{
      'getTechRecords': of(TechRecordDataMock.VehicleData)
    }]);

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
    newVehicle = vehicleService.createVehicle(VEHICLE);
    expect(newVehicle.techRecord.length).toBe(1);
  });

  it('should add a test-type to vehicle.testTypes array', () => {
    let newVehicle = vehicleService.createVehicle(VEHICLE);
    expect(newVehicle.testTypes.length).toBe(0);
    vehicleService.addTestType(newVehicle, TEST_TYPE);
    expect(newVehicle.testTypes.length).toBe(1);
  });

  it('should add odometer values', () => {
    let odomReading: string = '1234';
    let odomMetric: ODOMETER_METRIC = ODOMETER_METRIC.KILOMETRES;
    let newVehicle = vehicleService.createVehicle(VEHICLE);
    expect(newVehicle.odometerMetric).toBeFalsy();
    expect(newVehicle.odometerReading).toBeFalsy();
    vehicleService.setOdometer(newVehicle, odomReading, odomMetric);
    expect(newVehicle.odometerReading).toBe(odomReading);
    expect(newVehicle.odometerMetric).toBe(odomMetric);
  })

  it('should remove the added test-type from vehicle.testTypes array', () => {
    let newVehicle = vehicleService.createVehicle(VEHICLE);
    expect(newVehicle.testTypes.length).toBe(0);
    vehicleService.addTestType(newVehicle, TEST_TYPE);
    expect(newVehicle.testTypes.length).toBe(1);
    vehicleService.removeTestType(newVehicle, TEST_TYPE);
    expect(newVehicle.testTypes.length).toBe(0);
  });

  it('should add preparer to vehicle', () => {
    let newVehicle = vehicleService.createVehicle(VEHICLE);
    expect(newVehicle.preparerId).toBeFalsy();
    expect(newVehicle.preparerName).toBeFalsy();
    vehicleService.addPreparer(newVehicle, PREPARER);
    expect(newVehicle.preparerId).toBeTruthy();
    expect(newVehicle.preparerName).toBeTruthy();
  });

  it('should format odometer reading value', () => {
    let number = '1000';
    expect(vehicleService.formatOdometerReadingValue(number)).toBe('1,000');
  })
});
