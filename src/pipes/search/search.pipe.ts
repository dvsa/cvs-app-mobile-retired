import { Pipe, PipeTransform } from '@angular/core';
import { Events } from "ionic-angular";
import { type } from "os";

@Pipe({
  name: 'searchBy',
  pure: false
})

export class SearchPipe implements PipeTransform {
  constructor() {
  }

  transform(items: any[], filter: any, properties: string | string[]): any {
    if (!items || !filter) {
      return items;
    }
    let filteredArray = items.filter(
      item => {
        for (let key in item) {
          if (typeof properties == 'string') {

          } else {
            let propIndex = properties.indexOf(key);
            if (propIndex != -1) {
              if (item[key].toString().toLowerCase().includes(filter.toLowerCase())) {
                item['searchProperty'] = properties[propIndex];
                return item
              }
            } else {
              continue;
            }
          }
        }
      }
    );
    return filteredArray
    // return this.sortAlphabetically(filteredArray, properties[0]);
  }

  private sortAlphabetically(array, keyToSort) {
    return array.sort((a, b) => {
      if (a[keyToSort] < b[keyToSort]) return -1;
      if (a[keyToSort] > b[keyToSort]) return 1;
      return 0;
    })
  }

}
