import { TestModel } from "../../models/tests/test.model";
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
    newTest.vehicles = [];
    return newTest;
  }

  endTestReport(test: TestModel) {
    test.endTime = new Date().toISOString();
  }

  addVehicle(test: TestModel, vehicle: VehicleModel) {
    test.vehicles.push(vehicle);
  }
}
