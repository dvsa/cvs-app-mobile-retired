import { TestTypeModel } from "./test-type.model";

export  class TestResultModel {
  vrm: string;
  vin: string;
  testStationName: string;
  testStationNumber: string;
  testStationType: string;
  testerName: string;
  testerId: string;
  testStartTime: string;
  testEndTime: string;
  testStatus: string;
  reasonForCancelation: string;
  vehicleClass: string;
  numberOfSeats: number;
  vehicleStatus: string;
  vehicleConfiguration: string;
  odometerReading: string;
  odometerMetric: string;
  preparerId: string;
  preparerName: string;
  testTypes: TestTypeModel[];
}
