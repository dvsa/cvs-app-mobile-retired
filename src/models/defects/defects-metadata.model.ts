import { DefectLocationModel } from "../defect-location.model";

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
  location: DefectLocationModel,
  notes: boolean
}
