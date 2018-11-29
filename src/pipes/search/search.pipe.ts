import { Pipe, PipeTransform } from '@angular/core';

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
  }
}
