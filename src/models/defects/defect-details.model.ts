import { LocationMetadataModel } from "../reference-data-models/defects.reference-model";

export interface DefectDetailsModel {
  imNumber: number;
  imDescription: string;
  additionalInformation?: DefectAdditionalInformationModel;
  itemNumber: number;
  itemDescription: string;
  deficiencyRef: string;
  deficiencyId?: string;
  deficiencySubId?: string;
  deficiencyCategory: string;
  deficiencyText?: string;
  stdForProhibition?: boolean;
  prs?: boolean;
  /* ------------------------------------------------- */
  metadata: DefectsMetadataModel;
}

export interface DefectAdditionalInformationModel {
  location: DefectLocationModel;
  notes: string;
}

export interface DefectsMetadataModel {
  category: {
    additionalInfo?: AdditionalInfoMetadataModel;
  }
}

export interface AdditionalInfoMetadataModel {
  location: LocationMetadataModel;
  notes: boolean;
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


