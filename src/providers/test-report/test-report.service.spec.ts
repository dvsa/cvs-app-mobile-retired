import { TestReportService } from "./test-report.service";
import { TestBed } from "@angular/core/testing";
import { PreparersModel } from "../../models/reference-data-models/preparers.model";
import { PreparersDataMock } from "../../assets/data-mocks/reference-data-mocks/preparers-data.mock";
import { VehicleDetailsDataMock } from "../../assets/data-mocks/vehicle-details-data.mock";
import { VehicleModel } from "../../models/vehicle/vehicle.model";
import { VehicleService } from "../vehicle/vehicle.service";

describe('Provider: TestReportService', () => {
  let testReportService: TestReportService;
  let vehicleService: VehicleService;

  const vehicle: VehicleModel = VehicleDetailsDataMock.VehicleData;

  const preparerData = PreparersDataMock.PreparersData;
  const PREPARER_ADDED: PreparersModel = preparerData[0];

  let vehicleServiceSpy: any;

  beforeEach(() => {
    vehicleServiceSpy = jasmine.createSpyObj('vehicleService', ['createVehicle', 'addTestType', 'removeTestType'])

    TestBed.configureTestingModule({
      providers: [
        TestReportService,
        {provide: VehicleService, useValue: vehicleServiceSpy},
      ]
    });

    testReportService = TestBed.get(TestReportService);
    vehicleService = TestBed.get(VehicleService);
  });

  afterEach(() => {
    testReportService = null;
    vehicleService = null;
  });

  it('should return the test report model', () => {
    testReportService.testReport = {
      startTime: new Date(),
      endTime: null,
      testStatus: null,
      cancellationReason: '',
      vehicles: [vehicle],
      preparer: null
    };
    const gotTestReport = testReportService.getTestReport();
    expect(gotTestReport).toEqual(testReportService.testReport);
  });

  it('should assign the startTime to the report', () => {
    testReportService.createTestReport();
    expect(testReportService.testReport.startTime).toBeTruthy();
  });

  it('should assign the endTime to the report', () => {
    testReportService.endTestReport();
    expect(testReportService.testReport.endTime).toBeTruthy();
  });

  it('should add a vehicle to the vehicles array of testReport', () => {
    expect(testReportService.testReport.vehicles.length).toEqual(0);
    testReportService.addVehicle(vehicle);
    expect(testReportService.testReport.vehicles.length).toEqual(1);
  });

  it('should add a preparer to the testReport', () => {
    expect(testReportService.testReport.preparer).toBeFalsy();
    testReportService.addPreparer(PREPARER_ADDED);
    expect(testReportService.testReport.preparer).toEqual(PREPARER_ADDED);
  });
});
