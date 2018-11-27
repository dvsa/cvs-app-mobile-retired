import { Injectable } from "@angular/core";
import { DefectCategoryModel, DefectDeficiencyModel, DefectItemModel, DefectsReferenceData } from "../../models/defects/defects.model";
import { Observable } from "rxjs";
import { from } from "rxjs/observable/from";
import { STORAGE } from "../../app/app.enums";
import { StorageService } from "../natives/storage.service";
import { DEFICIENCY_CATEGORY } from "../../app/app.enums";

@Injectable()
export class DefectsService {

  constructor(private storageService: StorageService) {
  }

  getDefectsFromStorage(): Observable<DefectsReferenceData> {
    return from(this.storageService.read(STORAGE.DEFECTS))
  }

  searchDefectCategory(array: DefectCategoryModel[], filter: string) {
    if (!filter) return array;
    return array.filter(
      elem => {
        if (elem.imNumber.toString() == filter) return elem;
        if (elem.imDescription.toLowerCase().includes(filter.toLowerCase())) return elem;
      }
    );
  }

  searchDefectItem(array: DefectItemModel[], filter: string) {
    if (!filter) return array;
    return array.filter(
      elem => {
        if (elem.itemNumber.toString() == filter) return elem;
        if (elem.itemDescription.toLowerCase().includes(filter.toLowerCase())) return elem;
      }
    );
  }

  searchDeficiency(array: DefectDeficiencyModel[], filter: string) {
    if (!filter) return array;
    return array.filter(
      elem => {
        if (elem.deficiencyId.toString() == filter) return elem;
        if (elem.deficiencyText.toLowerCase().includes(filter.toLowerCase())) return elem;
      }
    );
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
        return 'primary';
      case DEFICIENCY_CATEGORY.ADVISORY:
        return 'light';
    }
  }
}
