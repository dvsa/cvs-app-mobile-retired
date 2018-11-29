import {AdditionalInfoModel} from "./additional-info.model";

export interface DefectCategoryModel {
  imNumber: number;
  imDescription: string;
  forVehicleType: string[];
  additionalInfo: AdditionalInfoModel;
  items: DefectItemModel[];
}

export interface DefectItemModel {
  itemNumber: number;
  itemDescription: string;
  forVehicleType: string[];
  deficiencies: DefectDeficiencyModel[];
}

export interface DefectDeficiencyModel {
  ref: string;
  deficiencyId: string;
  deficiencySubId: string;
  deficiencyCategory: string;
  deficiencyText: string;
  stdForProhibition: boolean;
  forVehicleType: string[];
}
