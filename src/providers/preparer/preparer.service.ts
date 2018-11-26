import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { from } from "rxjs/observable/from";
import { STORAGE } from "../../app/app.enums";
import { StorageService } from "../natives/storage.service";
import { PreparersModel } from "../../models/preparers/preparers.model";


@Injectable()
export class PreparerService {

  constructor(private storageService: StorageService) {
  }

  getPreparersFromStorage(): Observable<PreparersModel[]> {
    return from(this.storageService.read(STORAGE.PREPARERS))
  }

  search(array: PreparersModel[], filter: string): PreparersModel[] {
    if (!array) return [];
    if (!filter) return array;

    filter = filter.toLowerCase();

    return array.filter((eachItem) => {
      return eachItem["preparerId"].toLowerCase().includes(filter);
    })
  }
}
