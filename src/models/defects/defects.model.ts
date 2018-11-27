import {AdditionalInfoModel} from "./additional-info.model";

export interface DefectsModel {
  categories: DefectCategoryModel[]
}

export interface DefectCategoryModel {
  imNumber: string;
  imDescription: string;
  forVehicleType: string[];
  additionalInfo: AdditionalInfoModel;
  items: DefectItemModel[];
}

export interface DefectItemModel {
  itemNumber: string;
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
