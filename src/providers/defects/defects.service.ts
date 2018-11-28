import {Injectable} from "@angular/core";
import { DEFICIENCY_CATEGORY } from "../../app/app.enums";

@Injectable()
export class DefectsService {

  constructor() {}

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
