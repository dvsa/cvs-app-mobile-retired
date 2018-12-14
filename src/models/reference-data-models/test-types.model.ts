export interface TestTypesModel {
  id: string;
  name: string;
  forVehicleType: string[];
  forVehicleSize: string[];
  forVehicleConfiguration: string[];
  forVehicleAxles?: number[];
  nextTestTypesOrCategories?: TestTypesModel[];
}
