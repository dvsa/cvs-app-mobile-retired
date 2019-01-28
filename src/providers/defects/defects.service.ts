import { Injectable } from "@angular/core";
import { DefectCategoryModel } from "../../models/reference-data-models/defects.model";
import { Observable } from "rxjs";
import { from } from "rxjs/observable/from";
import { STORAGE } from "../../app/app.enums";
import { StorageService } from "../natives/storage.service";
import { DEFICIENCY_CATEGORY } from "../../app/app.enums";
import { CommonFunctionsService } from "../utils/common-functions";

@Injectable()
export class DefectsService {

  constructor(private storageService: StorageService, private commonFunctions: CommonFunctionsService) {
  }

  getDefectsFromStorage(): Observable<DefectCategoryModel[]> {
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

  orderDefectsArray(array, key, order?) {
    return array.sort(this.commonFunctions.orderBy(key, order));
  }
}
