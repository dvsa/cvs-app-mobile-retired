import { VehicleTestModel } from "../vehicle-test.model";

export interface VehicleModel {
  vrms: VrmModel[];
  vin: string;
  techRecord: TechRecordModel[];
  testResultsHistory?: VehicleTestModel[];
  odometerReading?: string;
  odometerMetric?: string;
  preparerId?: string;
  preparerName?: string;
  testTypes?: VehicleTestModel[];
}

export interface VrmModel {
  vrm: string;
  isPrimary: boolean;
}

export interface BrakeForceWheelModel {
  serviceBrakeForce: number;
  secondaryBrakeForce: number;
  parkingBrakeForce: number;
}

export interface BrakeModel {
  brakeCode: string;
  dataTrBrakeOne: string;
  dataTrBrakeTwo: string;
  dataTrBrakeThree: string;
  parkingBrakeMrk: string;
  retarderBrakeOne: string;
  retarderBrakeTwo: string;
  brakeForceWheelsNotLocked: BrakeForceWheelModel;
  brakeForceWheelsUpToHalfLocked: BrakeForceWheelModel;
}

export interface AxelsModel {
  axleNumber: number
  weights: WeightsModel;
  tyres: TyresModel;
}

export interface WeightsModel {
  kerbWeight: number;
  ladenWeight: number;
  gbWeight: number;
  designWeight: number;
}

export interface TyresModel {
  tyreSize: string;
  plyRating: string;
  fitmentCode: string;
  dataTrPsvAxles: number;
  speedCategorySymbol: string;
  tyreCode: number;
}

export interface TechRecordModel {
  chassisMake: string;
  chassisModel: string;
  bodyMake: string;
  bodyModel: string;
  bodyType: string;
  manufactureDate: number;
  regnDate: string;
  coifDate: string;
  ntaNumber: string;
  conversionRefNo: string;
  seatsLowerDeck: number;
  seatsUpperDeck: number;
  standingCapacity: number;
  speedRestriction: number;
  speedLimiterMrk: boolean;
  tachoExemptMrk: boolean;
  dispensations: string;
  remarks: string;
  reasonForCreation: string;
  statusCode: string;
  unladenWeight: number;
  grossKerbWeight: number;
  grossLadenWeight: number;
  grossGbWeight: number;
  grossDesignWeight: number;
  grossUnladenWeight: number;
  noOfAxles: number;
  brakeCode: string;
  vehicleClass: string;
  vehicleType: string;
  vehicleSize: string;
  vehicleConfiguration: string;
  brakes: BrakeModel;
  axles: AxelsModel[];
}
