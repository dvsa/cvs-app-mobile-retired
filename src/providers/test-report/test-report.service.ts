import { TestReportModel } from "../../models/tests/test-report.model";
import { PreparersModel } from "../../models/reference-data-models/preparers.model";
import { TEST_REPORT_TITLES } from "../../app/app.enums";
import { VehicleModel } from "../../models/vehicle/vehicle.model";

export class TestReportService {
  testReport: TestReportModel;

  constructor() {
    this.testReport = {
      startTime: null,
      endTime: null,
      testStatus: null,
      cancellationReason: '',
      vehicles: [],
      preparer: null
    };
  }

  getTestReport() {
    return this.testReport;
  }

  createTestReport() {
    this.testReport.startTime = new Date();
  }

  endTestReport() {
    this.testReport.endTime = new Date();
  }

  addVehicle(vehicle: VehicleModel) {
    this.testReport.vehicles.push(vehicle);
  }

  addPreparer(value: PreparersModel) {
    this.testReport.preparer = value;
  }

  getTestReportTitle(testReport: TestReportModel): string {
    if (testReport.vehicles.length < 2) {
      for (const vehicle of testReport.vehicles) {
        if (vehicle.vehicleTests.length > 1) {
          return TEST_REPORT_TITLES.LINKED_TEST;
        }
      }
      return TEST_REPORT_TITLES.SINGLE_TEST;
    } else {
      return TEST_REPORT_TITLES.COMBINED_TEST;
    }
  }

}
