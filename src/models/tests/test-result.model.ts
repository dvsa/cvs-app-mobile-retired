import { TestTypeModel } from "./test-type.model";
import { VehicleClassModel } from "../vehicle/tech-record.model";

export class TestResultModel {
  vrm: string; // vehicle
  vin: string; // vehicle
  vehicleId?: string; // vehicle
  testStationName: string; // visit
  testStationPNumber: string; // visit - old: testStationNumber
  testStationType: string; // visit
  testerName: string; // visit
  testerStaffId: string; // visit - old: testerId
  testerEmailAddress: string; // visit
  testStartTimestamp: string; // test - old: testStartTime
  testEndTimestamp: string; // test - old: testEndTime
  testStatus: string; // test
  reasonForCancellation: string; // test
  vehicleClass: VehicleClassModel; // tech record
  vehicleType: string; // tech record
  numberOfSeats: number; // tech record (seatsLowerDeck + seatsUpperDeck)
  vehicleConfiguration: string; // tech record
  odometerReading: number; // vehicle
  odometerReadingUnits: string; // vehicle - old: odometerMetric
  preparerId: string; // vehicle
  preparerName: string; // vehicle
  euVehicleCategory: string; // vehicle
  countryOfRegistration: string; // vehicle
  vehicleSize: string; // tech record
  testTypes: TestTypeModel[];
}
