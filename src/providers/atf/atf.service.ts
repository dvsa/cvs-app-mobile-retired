import {Injectable} from "@angular/core";
import {StorageService} from "../natives/storage.service";
import {Observable} from "rxjs";
import {AtfModel} from "../../models/atf.model";
import {from} from "rxjs/observable/from";
import {STORAGE} from "../../app/app.enums";

@Injectable()
export class AtfService {
  orderedArray: any[] = [];

  constructor(private storageService: StorageService) {
  }

  getAtfsFromStorage(): Observable<AtfModel[]> {
    return from(this.storageService.read(STORAGE.ATFS))
  }

  sortAndSearchATF(items: any[], filter: string, properties: string[]): any[] {
    let filteredArray: any[] = [];
    if (!items || !filter) {
      if ((filter === '' || filter == undefined) && Array.isArray(items[0])) {
        items.forEach(
          (elem: AtfModel[]) => {
            elem.forEach(
              (elem: AtfModel) => {
                elem.searchProperty = properties[0];
              }
            )
          }
        )
      }
      return this.orderedArray.length > 0 ? this.orderedArray : this.groupByLetter(items, properties[0]);
    }
    items.forEach(
      (elem) => {
        let arrGroup: any[] = elem.filter(
          (item: AtfModel) => {
            for (let key in item) {
              let propIndex: number = properties.indexOf(key);
              if (propIndex != -1) {
                if (item[key].toString().toLowerCase().includes(filter.toLowerCase())) {
                  item.searchProperty = properties[propIndex];
                  return item;
                }
              } else {
                continue;
              }
            }
          }
        )
        if (arrGroup.length) filteredArray.push(arrGroup);
      }
    )
    return filteredArray;
  }

  boldSearchVal(str: string, find: string):string {
    if (!find) return str;
    if (!str.toLowerCase().includes(find.toLowerCase())) return str;

    let findIndex = str.toLowerCase().search(find.toLowerCase());
    let strArr = [];
    for (let i = 0; i < find.length; i++) {
      strArr.push(str[findIndex + i]);
    }
    let re = str.substr(findIndex, find.length);
    let res = strArr.join('');
    return str.replace(re, `<strong>${res}</strong>`);
  }

  groupByLetter(array: any[], groupBy: string): any[] {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let newArr = [], arrGroup = [];
    for (let i = 0; i < alphabet.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[j][groupBy].charAt(0).toLowerCase() == alphabet[i]) {
          arrGroup.push(array[j])
        }
      }
      if (arrGroup.length) {
        newArr.push(arrGroup);
        arrGroup = [];
      }
    }
    if (!this.orderedArray.length) this.orderedArray = newArr;
    return newArr;
  }

}
