import {DefectLocationModel} from "./defect-location.model";
import {DefectsMetadataModel} from "./defects-metadata.model";

export interface DefectDetailsModel {
  ref: string;
  deficiencyId?: string;
  deficiencyText?: string;
  deficiencyCategory: string;
  metadata: DefectsMetadataModel;
  location?: DefectLocationModel;
  notes?: string;
  prs?: boolean;
}

