import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterByName',
  pure: false
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(
      item => item.name.toString().toLowerCase().includes(filter.toLowerCase())
    );
  }
}
