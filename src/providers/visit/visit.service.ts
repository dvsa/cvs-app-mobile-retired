import { Injectable } from "@angular/core";
import { TestModel } from "../../models/tests/test.model";
import { VisitModel } from "../../models/visit/visit.model";
import { StorageService } from "../natives/storage.service";

@Injectable()
export class VisitService {
  visit: VisitModel;
  easterEgg: string;

  constructor(public storageService: StorageService) {
    this.visit = {} as VisitModel
  }

  createVisit(testStation) {
    this.visit.startTime = new Date().toISOString();
    this.visit.endTime = null;
    this.visit.testStationName = testStation.testStationName;
    this.visit.testStationPNumber = testStation.testStationPNumber;
    this.visit.testStationType = testStation.testStationType;
    this.visit.testerId = '';
    this.visit.testerName = '';
    this.visit.testerEmail = '';
    this.visit.testerId = '2019';
    this.visit.testerName = 'Dublu Zero Sapte';
    this.visit.testerEmail = 'test@email.com';
    this.visit.tests = [];
    this.updateVisit();
    return this.visit;
  }

  getLatestTest(): TestModel {
    return this.visit.tests[this.visit.tests.length - 1];
  }

  endVisit() {
    this.visit.endTime = new Date().toISOString();
    this.updateVisit();
  }

  addTest(test: TestModel) {
    this.visit.tests.push(test);
    this.updateVisit();
  }

  removeTest(testToRemove: TestModel) {
    this.visit.tests.forEach((testReport, index) => {
      if (testReport == testToRemove) {
        this.visit.tests.splice(index, 1);
      }
    });
    this.updateVisit();
  }

  getTests(): TestModel[] {
    return this.visit.tests;
  }

  updateVisit() {
    if(this.easterEgg == 'false') this.storageService.update('visit', this.visit);
  }

}
