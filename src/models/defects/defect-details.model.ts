import { LocationMetadataModel } from "../reference-data-models/defects.reference-model";

export interface DefectDetailsModel {
  ref: string;
  deficiencyId?: string;
  deficiencySubId?: string;
  deficiencyText?: string;
  deficiencyCategory: string;
  metadata: DefectsMetadataModel;
  location?: DefectLocationModel;
  notes?: string;
  prs?: boolean;
}

export interface DefectsMetadataModel {
  category: {
    imNumber: number;
    imDescription: string
    additionalInfo?: AdditionalInfoMetadataModel,
  },
  item: {
    itemNumber: number;
    itemDescription: string
  }
}

export interface AdditionalInfoMetadataModel {
  location: LocationMetadataModel,
  notes: boolean
}

export interface DefectLocationModel {
  vertical?: string | null;
  horizontal?: string | null;
  lateral?: string | null;
  longitudinal?: string | null;
  rowNumber?: number | null;
  seatNumber?: number | null;
  axleNumber?: number | null;
}


