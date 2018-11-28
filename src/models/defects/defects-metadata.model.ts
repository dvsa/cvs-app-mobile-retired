import { DefectLocationModel } from "../defect-location.model";

export interface DefectsMetadataModel {
  category: {
    imNumber: string;
    imDescription: string
    additionalInfo?: AdditionalInfoMetadataModel,
  },
  item: {
    itemNumber: string;
    itemDescription: string
  }
}

export interface AdditionalInfoMetadataModel {
  location: DefectLocationModel,
  notes: boolean
}
