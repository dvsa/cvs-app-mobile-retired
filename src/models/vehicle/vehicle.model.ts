  import { TestTypeModel } from "../tests/test-type.model";
  import { TechRecordModel } from "./tech-record.model";
  import { TestResultModel } from "../tests/test-result.model";

  export interface VehicleModel {
    vrm: string;
    vin: string;
    techRecord: TechRecordModel[];
    testResultsHistory?: TestResultModel[];
    odometerReading?: string;
    odometerMetric?: string;
    preparerId?: string;
    preparerName?: string;
    testTypes?: TestTypeModel[];
  }
