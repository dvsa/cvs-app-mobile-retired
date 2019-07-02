export interface VehicleTechRecordModel {
  vrms: VrmModel[];
  vin: string;
  techRecord: TechRecordModel[];
  /* -------- ONLY FOR TRL -------- */
  trailerId?: string;
}


export interface TechRecordModel {
  bodyType: BodyTypeModel;
  manufactureYear: number;
  regnDate: string;
  ntaNumber: string;
  conversionRefNo: string;
  speedLimiterMrk: boolean;
  tachoExemptMrk: boolean;
  reasonForCreation: string;
  statusCode: string;
  grossKerbWeight: number;
  grossLadenWeight: number;
  noOfAxles: number;
  brakeCode: string;
  vehicleType: string;
  axles: AxelsModel[];
  notes: string;
  euVehicleCategory: string;
  countryOfRegistration: string;
  /* -------- ONLY FOR PSV -------- */
  chassisMake?: string;
  chassisModel?: string;
  bodyMake?: string;
  bodyModel?: string;
  vehicleClass?: VehicleClassModel;
  vehicleSize?: string;
  vehicleConfiguration?: string;
  coifDate?: string;
  unladenWeight?: number;
  grossGbWeight?: number;
  grossDesignWeight?: number;
  grossUnladenWeight?: number;
  seatsLowerDeck?: number;
  seatsUpperDeck?: number;
  standingCapacity?: number;
  speedRestriction?: number;
  dispensations?: string;
  remarks?: string;
  brakes?: BrakeModel;
  /* -------- ONLY FOR HGV/TRL -------- */
  make?: string;
  model?: string;
  functionCode?: string;
  tyreUseCode?: string;
  roadFriendly?: boolean;
  drawbarCouplingFitted?: boolean;
  /* -------- ONLY FOR HGV -------- */
  trainGbWeight?: number;
  trainDesignWeight?: number;
  maxTrainGbWeight?: number;
  maxTrainDesignWeight?: number;
  euroStandard?: number;
  frontAxleTo5thWheelMin?: number;
  frontAxleTo5thWheelMax?: number;
  frontAxleTo5thWheelCouplingMin?: number;
  frontAxleTo5thWheelCouplingMax?: number;
  /* -------- ONLY FOR TRL -------- */
  firstUseDate?: string;
  maxLoadOnCoupling?: number;
  suspensionType?: string;
  couplingType?: string;
  dimensions?: string | {};
  frontAxleToRearAxle?: number;
  rearAxleToRearTrl?: number;
  couplingCenterToRearAxleMin?: number;
  couplingCenterToRearAxleMax?: number;
  couplingCenterToRearTrlMin?: number;
  couplingCenterToRearTrlMax?: number;
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
  brakeCode?: string;
  dataTrBrakeOne?: string;
  dataTrBrakeTwo?: string;
  dataTrBrakeThree?: string;
  retarderBrakeOne?: string;
  retarderBrakeTwo?: string;
  brakeCodeOriginal?: string;
  brakeForceWheelsNotLocked?: BrakeForceWheelModel;
  brakeForceWheelsUpToHalfLocked?: BrakeForceWheelModel;
  /* -------- ONLY FOR TRL -------- */
  loadSensingValve?: boolean;
  antilockBrakingSystem?: boolean;
}

export interface AxelsModel {
  parkingBrakeMrk?: boolean;
  axleNumber: number
  weights?: WeightsModel;
  tyres: TyresModel;
  /* -------- ONLY FOR TRL -------- */
  axleBrakeProperties?: AxleBrakePropertiesModel;
}

export interface WeightsModel {
  kerbWeight?: number;
  ladenWeight?: number;
  gbWeight: number;
  designWeight: number;
}

export interface TyresModel {
  tyreSize: string;
  plyRating: string;
  fitmentCode: string;
  dataTrPsvAxles?: number;
  tyreCode: number;
  dataTrAxles?: number;
  /* -------- ONLY FOR PSV -------- */
  speedCategorySymbol?: string;
}

export interface BodyTypeModel {
  code: string;
  description: string;
}

export interface VehicleClassModel {
  code: string;
  description: string;
}

export interface AxleBrakePropertiesModel {
  brakeActuator: number;
  leverLenght: number;
  springBrakeParking: number;
}
