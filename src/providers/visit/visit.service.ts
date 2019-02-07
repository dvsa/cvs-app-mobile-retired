import { Injectable } from "@angular/core";
import { TestModel } from "../../models/tests/test.model";
import { VisitModel } from "../../models/visit/visit.model";
import { StorageService } from "../natives/storage.service";
import { HTTPService } from "../global/http.service";
import { ActivityModel } from "../../models/visit/activity.model";
import { Events } from "ionic-angular";
import { LOCAL_STORAGE, STORAGE } from "../../app/app.enums";
import { Observable } from "rxjs";

@Injectable()
export class VisitService {
  visit: VisitModel;
  easterEgg: string;
  caching: string;

  constructor(public storageService: StorageService,
              private httpService: HTTPService,
              public events: Events) {
    this.visit = {} as VisitModel;
    this.easterEgg = localStorage.getItem(LOCAL_STORAGE.EASTER_EGG);
    this.caching = localStorage.getItem(LOCAL_STORAGE.CACHING);
  }

  createVisit(testStation, id?: string) {
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
    if (id) this.visit.id = id;
    this.updateVisit();
    return this.visit;
  }

  startVisit(testStation): Observable<any> {
    let activities: ActivityModel = {
      activityType: 'visit',
      testStationName: testStation.testStationName,
      testStationPNumber: testStation.testStationPNumber,
      testStationEmail: testStation.testStationEmails[0],
      testStationType: testStation.testStationType,
      testerName: 'Maria Ciobanu',
      testerStaffId: '2019'
    };
    return this.httpService.startVisit(activities);
  }

  endVisit(id: string): Observable<any> {
    return this.httpService.endVisit(id);
  }

  getLatestTest(): TestModel {
    return this.visit.tests[this.visit.tests.length - 1];
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
    if (this.caching == 'true') this.storageService.update(STORAGE.VISIT, this.visit);
  }

}
