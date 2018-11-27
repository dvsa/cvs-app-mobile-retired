import { Injectable } from "@angular/core";
import { DefectCategoryModel, DefectDeficiencyModel, DefectItemModel, DefectsModel } from "../../models/defects/defects.model";
import { Observable } from "rxjs";
import { AtfModel } from "../../models/atf.model";
import { from } from "rxjs/observable/from";
import { STORAGE } from "../../app/app.enums";
import { StorageService } from "../natives/storage.service";

@Injectable()
export class DefectsService {

  constructor(private storageService: StorageService) {
  }

  getDefectsFromStorage(): Observable<DefectsModel> {
    return from(this.storageService.read(STORAGE.DEFECTS))
  }

  searchDefectCategory(array: DefectCategoryModel[], filter: string) {
    if (!filter) return array;
    return array.filter(
      elem => {
        if (elem.imNumber == filter) return elem;
        if (elem.imDescription.toLowerCase().includes(filter.toLowerCase())) return elem;
      }
    );
  }

  searchDefectItem(array: DefectItemModel[], filter: string) {
    if (!filter) return array;
    return array.filter(
      elem => {
        if (elem.itemNumber == filter) return elem;
        if (elem.itemDescription.toLowerCase().includes(filter.toLowerCase())) return elem;
      }
    );
  }

  searchDeficiency(array: DefectDeficiencyModel[], filter: string) {
    if (!filter) return array;
    return array.filter(
      elem => {
        if (elem.deficiencyId == filter) return elem;
        if (elem.deficiencyText.toLowerCase().includes(filter.toLowerCase())) return elem;
      }
    );
  }

  getBadgeColor(category) {
    switch (category.toLowerCase()) {
      case 'dangerous':
        return 'dark';
      case 'major':
        return 'danger';
      case 'minor':
        return 'attention';
      case 'prs':
        return 'primary';
      case 'advisory':
        return 'light';
    }
  };
}
