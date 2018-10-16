import {Pipe, PipeTransform} from '@angular/core';
import {Events} from "ionic-angular";

@Pipe({
  name: 'searchBy',
  pure: false
})

export class SearchPipe implements PipeTransform {
  constructor(public events: Events){}

  transform(items: any[], filter: any, properties: string[]): any {
    if (!items || !filter) {
      if(filter === '') {
        items.forEach(
          elem => delete elem['searchProperty']
        )
      }
      return items;
    }
    let filteredArray = items.filter(
      item => {
        for (let key in item) {
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
    );
    return this.sortAlphabetically(filteredArray, properties[0]);
  }

  private sortAlphabetically(array, keyToSort) {
    return array.sort((a, b) => {
      if (a[keyToSort] < b[keyToSort]) return -1;
      if (a[keyToSort] > b[keyToSort]) return 1;
      return 0;
    })
  }

}
