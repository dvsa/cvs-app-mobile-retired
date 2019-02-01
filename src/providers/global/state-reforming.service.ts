import { Injectable } from "@angular/core";
import { StorageService } from "../natives/storage.service";
import { STORAGE } from "../../app/app.enums";

@Injectable()
export class StateReformingService {
  stateHistory = [];

  constructor(public storageService: StorageService) {
  }

  saveNavStack(nav) {
    this.stateHistory = [];
    for(let i = 0; i < nav.length(); i++) {
      const view = nav.getByIndex(i);
      this.stateHistory.push({
        page: view.name,
        params: view.data
      });
    }
    let stateJSON = JSON.stringify(this.stateHistory);
    this.storageService.update(STORAGE.STATE, stateJSON);
  }
}
