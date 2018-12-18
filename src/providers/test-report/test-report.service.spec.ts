import { TestReportService } from "./test-report.service";
import { TestBed } from "@angular/core/testing";
import { VehicleModel } from "../../models/vehicle.model";
import { PreparersModel } from "../../models/reference-data-models/preparers.model";
import { VehicleTestModel } from "../../models/vehicle-test.model";
import { PreparersDataMock } from "../../assets/data-mocks/preparers-data.mock";
import { TEST_REPORT_TITLES } from "../../app/app.enums";

describe('Provider: TestReportService', () => {
  let testReportService: TestReportService;

  const vehicle = new VehicleModel('aa12bcd', '123456', 'psv', 4, 'german', 'cabrio', 123, 'rigid', 'small');
  const vehicleTest = new VehicleTestModel('testName', false, new Date(), 12, new Date());

  const preparerData = PreparersDataMock.PreparersData;
  const PREPARER_ADDED: PreparersModel = preparerData[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestReportService
      ]
    });

    testReportService = TestBed.get(TestReportService);
  });

  afterEach(() => {
    testReportService = null;
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

  it('should get the correct testReport title', () => {
    testReportService.addVehicle(vehicle);
    testReportService.testReport.vehicles[0].addVehicleTest(vehicleTest);
    expect(testReportService.getTestReportTitle(testReportService.testReport)).toEqual(TEST_REPORT_TITLES.SINGLE_TEST);
    testReportService.testReport.vehicles[0].addVehicleTest(vehicleTest);
    expect(testReportService.getTestReportTitle(testReportService.testReport)).toEqual(TEST_REPORT_TITLES.LINKED_TEST);
    testReportService.addVehicle(vehicle);
    expect(testReportService.getTestReportTitle(testReportService.testReport)).toEqual(TEST_REPORT_TITLES.COMBINED_TEST);
  });
});
