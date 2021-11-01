import { Injectable } from '@angular/core';
import { TestModel } from '../../models/tests/test.model';
import { VisitModel } from '../../models/visit/visit.model';
import { StorageService } from '../natives/storage.service';
import { HTTPService } from '../global/http.service';
import { ActivityModel } from '../../models/visit/activity.model';
import { Events, AlertController, App, Alert } from 'ionic-angular';
import { STORAGE, VISIT, PAGE_NAMES, APP_STRINGS } from '../../app/app.enums';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { AppService } from '../global/app.service';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class VisitService {
  visit: VisitModel;

  constructor(
    public storageService: StorageService,
    public appService: AppService,
    public events: Events,
    private authenticationService: AuthenticationService,
    private httpService: HTTPService,
    private activityService: ActivityService,
    private alertCtrl: AlertController,
    public app: App
  ) {
    this.visit = {} as VisitModel;
  }

  createVisit(testStation, id?: string) {
    this.visit.startTime = new Date().toISOString();
    this.visit.endTime = null;
    this.visit.testStationName = testStation.testStationName;
    this.visit.testStationPNumber = testStation.testStationPNumber;
    this.visit.testStationEmail = testStation.testStationEmails[0];
    this.visit.testStationType = testStation.testStationType;
    this.visit.testerId = this.authenticationService.tokenInfo.testerId;
    this.visit.testerName = this.authenticationService.tokenInfo.testerName;
    this.visit.testerEmail = this.authenticationService.tokenInfo.testerEmail;
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
      testerName: this.authenticationService.tokenInfo.testerName,
      testerStaffId: this.authenticationService.tokenInfo.testerId,
      testerEmail: this.authenticationService.tokenInfo.testerEmail,
      startTime: new Date().toISOString(),
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
    let latestActivity = this.activityService.activities[
      this.activityService.activities.length - 1
    ];
    if (
      latestActivity &&
      latestActivity.activityType === VISIT.ACTIVITY_TYPE_WAIT &&
      !latestActivity.endTime
    ) {
      this.activityService.activities[this.activityService.activities.length - 1].endTime =
        test.startTime;
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
    if (this.appService.caching) {
      this.storageService.update(STORAGE.VISIT, this.visit);
    }
  }

  /**
   * This method will display an alert notifying the user that the visit has been closed.
   * When the alert is closed, the app will redirect the user to the root page
   */
  createDataClearingAlert(loadingToDismiss): Alert {
    const clearingDataAlert = this.alertCtrl.create({
      title: APP_STRINGS.SITE_VISIT_CLOSED_TITLE,
      message: APP_STRINGS.SITE_VISIT_CLOSED_MESSAGE,
      buttons: [APP_STRINGS.OK],
      enableBackdropDismiss: false
    });
    clearingDataAlert.onDidDismiss(async () => {
      await this.setRootPage();
      await loadingToDismiss.dismiss();
    });
    
    return clearingDataAlert;
  }

  private async setRootPage(): Promise<any> {
    await this.clearExpiredVisitData();
    await this.app.getActiveNav().setRoot(PAGE_NAMES.TEST_STATION_HOME_PAGE);
    return await this.app.getActiveNav().popToRoot();
  }

  private async clearExpiredVisitData() {
    await this.storageService.delete(STORAGE.ACTIVITIES);
    await this.storageService.delete(STORAGE.VISIT);
    await this.storageService.delete(STORAGE.STATE);
    this.activityService.waitTimeStarted = false;
    this.visit = {} as VisitModel;
    this.activityService.activities = [];
    clearTimeout(this.activityService.waitTimer);
  }
}
