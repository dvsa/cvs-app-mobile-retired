import { Injectable } from "@angular/core";
import { TestModel } from "../../models/tests/test.model";
import { VisitModel } from "../../models/visit/visit.model";
import { StorageService } from "../natives/storage.service";
import { HTTPService } from "../global/http.service";
import { ActivityModel } from "../../models/visit/activity.model";
import { Events } from "ionic-angular";
import { STORAGE, VISIT } from "../../app/app.enums";
import { Observable } from "rxjs";
import { AuthService } from "../global/auth.service";
import { AppService } from "../global/app.service";
import { ActivityService } from "../activity/activity.service";

@Injectable()
export class VisitService {
  visit: VisitModel;

  constructor(public storageService: StorageService,
              public appService: AppService,
              public authService: AuthService,
              public events: Events,
              private httpService: HTTPService,
              private activityService: ActivityService) {
    this.visit = {} as VisitModel;
  }

  createVisit(testStation, id?: string) {
    this.visit.startTime = new Date().toISOString();
    this.visit.endTime = null;
    this.visit.testStationName = testStation.testStationName;
    this.visit.testStationPNumber = testStation.testStationPNumber;
    this.visit.testStationEmail = testStation.testStationEmails[0];
    this.visit.testStationType = testStation.testStationType;
    this.visit.testerId = this.authService.testerDetails.testerId;
    this.visit.testerName = this.authService.testerDetails.testerName;
    this.visit.testerEmail = this.authService.testerDetails.testerEmail;
    this.visit.tests = [];
    if (id) this.visit.id = id;
    this.updateVisit();
    return this.visit;
  }

  startVisit(testStation): Observable<any> {
    let activities: ActivityModel = {
      activityType: VISIT.ACTIVITY_TYPE_VISIT,
      testStationName: testStation.testStationName,
      testStationPNumber: testStation.testStationPNumber,
      testStationEmail: testStation.testStationEmails[0],
      testStationType: testStation.testStationType,
      testerName: this.authService.testerDetails.testerName,
      testerStaffId: this.authService.testerDetails.testerId
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
    let latestActivity = this.activityService.activities[this.activityService.activities.length -1];
    if (latestActivity && latestActivity.activityType === VISIT.ACTIVITY_TYPE_WAIT) {
      this.activityService.activities[this.activityService.activities.length -1].endTime = test.startTime;
      this.activityService.updateActivities();
      this.activityService.waitTimeStarted = false;
    }
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
    if (this.appService.caching) this.storageService.update(STORAGE.VISIT, this.visit);
  }
}
