import { TestModel } from "../../models/tests/test.model";
import { TEST_REPORT_TITLES } from "../../app/app.enums";
import { VehicleModel } from "../../models/vehicle/vehicle.model";

export class TestService {

  constructor() {
  }

  createTest() {
    let newTest = {} as TestModel;
    newTest.startTime = new Date().toISOString();
    newTest.endTime = null;
    newTest.status = null;
    newTest.reasonForCancellation = null;
    newTest.vehicles = []
    return newTest;
  }

  endTestReport(test: TestModel) {
    test.endTime = new Date().toISOString();
  }

  addVehicle(test: TestModel, vehicle: VehicleModel) {
    test.vehicles.push(vehicle);
  }

  getTestReportTitle(testReport: TestModel): string {
    if (testReport.vehicles.length < 2) {
      for (const vehicle of testReport.vehicles) {
        if (vehicle.testTypes.length > 1) {
          return TEST_REPORT_TITLES.LINKED_TEST;
        }
      }
      return TEST_REPORT_TITLES.SINGLE_TEST;
    } else {
      return TEST_REPORT_TITLES.COMBINED_TEST;
    }
  }

}
