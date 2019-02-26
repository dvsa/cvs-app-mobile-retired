import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { from } from "rxjs/observable/from";
import { DEFICIENCY_CATEGORY, STORAGE } from "../../app/app.enums";
import { StorageService } from "../natives/storage.service";
import { CommonFunctionsService } from "../utils/common-functions";
import { DefectDetailsModel, DefectsMetadataModel } from "../../models/defects/defect-details.model";
import {
  DefectCategoryReferenceDataModel,
  DefectDeficiencyReferenceDataModel,
  DefectItemReferenceDataModel
} from "../../models/reference-data-models/defects.reference-model";

@Injectable()
export class DefectsService {

  constructor(private storageService: StorageService, private commonFunctions: CommonFunctionsService) {
  }

  getDefectsFromStorage(): Observable<DefectCategoryReferenceDataModel[]> {
    return from(this.storageService.read(STORAGE.DEFECTS))
  }

  searchDefect(array: any[], filter: string, properties: string[]) {
    if (!filter) return array;
    return array.filter(
      elem => {
        return properties.some(
          property => {
            if (typeof elem[property] == "number") {
              if (elem[property].toString() == filter) return true
            } else {
              if (elem[property].toLowerCase().includes(filter.toLowerCase())) return true;
            }
          }
        )
      }
    );
  }

  createDefect(defCat: DefectCategoryReferenceDataModel, defItem: DefectItemReferenceDataModel, deficiency: DefectDeficiencyReferenceDataModel, vehicleType: string, isAdvisory: boolean): DefectDetailsModel {
    let metadata: DefectsMetadataModel = {
      category: {
        additionalInfo: (!isAdvisory) ? defCat.additionalInfo[vehicleType.toLowerCase()] : null
      }
    };

    let defect: DefectDetailsModel = {
      deficiencyRef: (!isAdvisory) ? deficiency.ref : `${defCat.imNumber}.${defItem.itemNumber}`,
      deficiencyCategory: (!isAdvisory) ? deficiency.deficiencyCategory : DEFICIENCY_CATEGORY.ADVISORY,
      deficiencyId: (!isAdvisory) ? deficiency.deficiencyId : null,
      deficiencySubId: (!isAdvisory) ? deficiency.deficiencySubId : null,
      deficiencyText: (!isAdvisory) ? deficiency.deficiencyText : null,
      imNumber: defCat.imNumber,
      imDescription: defCat.imDescription,
      itemNumber: defItem.itemNumber,
      itemDescription: defItem.itemDescription,
      additionalInformation: {
        notes: '',
        location: (!isAdvisory) ? {
          vertical: '',
          horizontal: '',
          lateral: '',
          longitudinal: '',
          rowNumber: null,
          seatNumber: null,
          axleNumber: null
        } : null
      },
      stdForProhibition: (!isAdvisory) ? deficiency.stdForProhibition : null,
      metadata: metadata,
      prs: (!isAdvisory) ? false : null,
    };
    return defect;
  }

  getBadgeColor(category) {
    switch (category.toLowerCase()) {
      case DEFICIENCY_CATEGORY.DANGEROUS:
        return 'dark';
      case DEFICIENCY_CATEGORY.MAJOR:
        return 'danger';
      case DEFICIENCY_CATEGORY.MINOR:
        return 'attention';
      case DEFICIENCY_CATEGORY.PRS:
        return 'tertiary';
      case DEFICIENCY_CATEGORY.ADVISORY:
        return 'light';
    }
  }

  orderDefectsArray(array, key, order?) {
    return array.sort(this.commonFunctions.orderBy(key, order));
  }
}
