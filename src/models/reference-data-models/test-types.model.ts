import { VEHICLE_CONFIGURATION, VEHICLE_SIZE, VEHICLE_TYPE } from "../../app/app.enums";

export interface TestTypesReferenceDataModel {
  id: string;
  name: string;
  testTypeName?: string | null;
  forVehicleType: string[] | VEHICLE_TYPE;
  forVehicleSize: string[] | VEHICLE_SIZE;
  forVehicleConfiguration: string[] | VEHICLE_CONFIGURATION;
  testTypeClassification?: string;
  forVehicleAxles?: number[] | null;
  nextTestTypesOrCategories?: TestTypesReferenceDataModel[];
}


