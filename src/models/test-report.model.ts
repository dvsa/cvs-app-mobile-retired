import { VehicleModel } from './vehicle.model';
import { PreparersModel } from "./reference-data-models/preparers.model";

export interface TestReportModel {
  startTime: Date;
  endTime: Date;
  vehicles: VehicleModel[];
  preparer: PreparersModel | string;
}
