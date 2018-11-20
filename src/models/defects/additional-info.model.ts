import {DefectLocationModel} from "../defect-location.model";

export interface AdditionalInfoModel {
  psv: {
    location?: DefectLocationModel,
    notes?: boolean
  };
  hgv: {
    location?: DefectLocationModel,
    notes?: boolean
  };
  trl: {
    location?: DefectLocationModel,
    notes?: boolean
  };
}
