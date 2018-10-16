import {Injectable} from "@angular/core";
import {StorageService} from "../natives/storage.service";
import {Observable} from "rxjs";
import {AtfModel} from "../../models/atf.model";
import {from} from "rxjs/observable/from";
import {STORAGE} from "../../app/app.enums";

@Injectable()
export class AtfService {

  constructor(private storageService: StorageService) {
  }

  getAtfsFromStorage(): Observable<AtfModel[]> {
    return from(this.storageService.read(STORAGE.ATFS))
  }

}
