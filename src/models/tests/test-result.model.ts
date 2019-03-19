import { TestTypeModel } from "./test-type.model";
import { VehicleClassModel } from "../vehicle/tech-record.model";

export class TestResultModel {
  vrm: string; // vehicle
  vin: string; // vehicle
  testStationName: string; // visit
  testStationPNumber: string; // visit - old: testStationNumber
  testStationType: string; // visit
  testerName: string; // visit
  testerStaffId: string; // visit - old: testerId
  testerEmailAddress: string; // visit
  testStartTimestamp: string; // test - old: testStartTime
  testEndTimestamp: string; // test - old: testEndTime
  testStatus: string; // test
  vehicleClass: VehicleClassModel; // tech record
  vehicleType: string; // tech record
  numberOfSeats: number; // tech record (seatsLowerDeck + seatsUpperDeck)
  vehicleConfiguration: string; // tech record
  odometerReading: number | null; // vehicle
  odometerReadingUnits: string | null; // vehicle - old: odometerMetric
  preparerId: string; // vehicle
  preparerName: string; // vehicle
  euVehicleCategory: string | null; // vehicle
  countryOfRegistration: string | null; // vehicle
  vehicleSize: string; // tech record
  reasonForCancellation: string | null; // test
  testTypes: TestTypeModel[];
}
