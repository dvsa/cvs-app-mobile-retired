import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from "../natives/storage.service";
import { from } from "rxjs/observable/from";
import { STORAGE } from "../../app/app.enums";

@Injectable()
export class TestTypesService {

  constructor(private storageService: StorageService) {
  }

  getTestTypesFromStorage(): Observable<any> {
    return from(this.storageService.read(STORAGE.TESTTYPES))
  }
}
