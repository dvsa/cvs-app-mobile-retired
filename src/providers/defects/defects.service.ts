import {Injectable} from "@angular/core";

@Injectable()
export class DefectsService {

  constructor() {}

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
  }
}
