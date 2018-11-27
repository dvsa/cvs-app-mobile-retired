import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byVehicleType',
  pure: false
})

export class ByVehicleTypePipe implements PipeTransform {
  constructor() {
  }

  transform(items: any[], filter: any): any {
    if (!filter) return items;
    let filteredArray = items.filter((elem) => {
      if (elem.forVehicleType.indexOf(filter) != -1) {
        return elem
      }
    })
    return filteredArray
  }
}
