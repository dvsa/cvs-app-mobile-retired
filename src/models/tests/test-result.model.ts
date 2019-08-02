import { TestTypeModel } from "./test-type.model";
import { VehicleClassModel } from "../vehicle/tech-record.model";

export class TestResultModel {
  testResultId: string;
  /* VISIT */
  testStationName: string;
  testStationPNumber: string;
  testStationType: string;
  testerName: string;
  testerStaffId: string;
  testerEmailAddress: string;
  /* TEST */
  testStartTimestamp: string;
  testEndTimestamp: string;
  testStatus: string;
  reasonForCancellation: string | null;
  /* VEHICLE */
  vrm?: string; // PSV + HGV
  trailerId?: string; // TRL
  vin: string;
  vehicleClass: VehicleClassModel;
  vehicleType: string;
  vehicleConfiguration: string;
  odometerReading?: number | null; // PSV + HGV
  odometerReadingUnits?: string | null; // PSV + HGV
  preparerId: string;
  preparerName: string;
  euVehicleCategory: string | null;
  countryOfRegistration: string | null;
  noOfAxles: number;
  vehicleSize?: string; // PSV
  numberOfSeats?: number; // PSV (seatsLowerDeck + seatsUpperDeck)
  /* TEST TYPES */
  testTypes: TestTypeModel[];
}
