import { PreparersModel } from "../reference-data-models/preparers.model";
import { TEST_REPORT_STATUSES } from "../../app/app.enums";
import { VehicleModel } from "../vehicle/vehicle.model";

export interface TestReportModel {
  startTime: Date;
  endTime: Date;
  testStatus: TEST_REPORT_STATUSES;
  cancellationReason: string;
  vehicles: VehicleModel[];
  preparer: PreparersModel | string;
}
