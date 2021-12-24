import { Injectable } from '@angular/core';
import { StorageService } from '../natives/storage.service';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_VALUE,
  LOG_TYPES, PAGE_NAMES,
  STORAGE,
  VISIT
} from '../../app/app.enums';
import { AppService } from '../global/app.service';
import { VisitModel } from '../../models/visit/visit.model';
import { ActivityModel } from '../../models/visit/activity.model';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { HTTPService } from '../global/http.service';
import { TestResultModel } from '../../models/tests/test-result.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { CommonFunctionsService } from '../utils/common-functions';
import { of } from 'rxjs/observable/of';
import { AnalyticsService } from '../global';
import { LogsProvider } from '../../modules/logs/logs.service';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class ActivityService {
  activities: ActivityModel[] = [];
  waitTimeStarted: boolean = false;
  waitTimer: number;
  loading: Loading;
  counterTime: number = 5;

  constructor(
    private storageService: StorageService,
    private appService: AppService,
    private authenticationService: AuthenticationService,
    private httpService: HTTPService,
    private commonFunc: CommonFunctionsService,
    private analyticsService: AnalyticsService,
    private logProvider: LogsProvider,
    private loadingCtrl: LoadingController
  ) {}

  createActivity(
    visit: VisitModel,
    activityType?: string,
    pushToActivities?: boolean,
    updateActivities?: boolean
  ): ActivityModel {
    let activity: ActivityModel = {
      activityType: activityType ? activityType : VISIT.ACTIVITY_TYPE_UNACCOUNTABLE_TIME,
      testStationName: visit.testStationName,
      testStationPNumber: visit.testStationPNumber,
      testStationEmail: visit.testStationEmail,
      testStationType: visit.testStationType,
      testerName: this.authenticationService.tokenInfo.testerName,
      testerStaffId: this.authenticationService.tokenInfo.testerId,
      startTime: null,
      endTime: null,
      waitReason: [],
      notes: '',
      parentId: visit.id
    };
    if (pushToActivities) this.activities.push(activity);
    if (updateActivities) this.updateActivities();
    return activity;
  }

  getActivities(): ActivityModel[] {
    return this.activities;
  }

  addActivity(activity: ActivityModel) {
    this.activities.push(activity);
  }

  isVisitStillOpen(): Observable<HttpResponse<boolean>> {
    //  make sure token object is re-hydrated before checking for open visits
    return fromPromise(this.authenticationService.getTesterID())
      .pipe(
        switchMap((testerId) => {
          return this.httpService.getOpenVisitCheck(testerId)
        })
      )
  }

  /**
   * @deprecated stop using in favour of equivalent method taken a @param activities as parameter
   */
  updateActivities() {
    if (this.appService.caching) this.storageService.update(STORAGE.ACTIVITIES, this.activities);
  }

  /**
   * @description use by passing in @param activities
   */
  updateActivitiesArgs(activities: ActivityModel[]) {
    if (this.appService.caching) {
      this.storageService.update(STORAGE.ACTIVITIES, activities);
    }
  }

  submitActivity(activity: ActivityModel) {
    return this.httpService.postActivity(activity);
  }

  updateActivityReasons(activities) {
    return this.httpService.updateActivity(activities);
  }

  createActivityBodyForCall(visit, testResult?: TestResultModel, timeline?) {
    let activity;
    let timeNotTesting = 0;

    if (testResult) {
        let indexTestResult = visit.tests
          .map((elem) => elem.startTime)
          .indexOf(testResult.testStartTimestamp);
        if (indexTestResult === 0) {
          timeNotTesting = this.getWaitTimeBetween(
            testResult.testStartTimestamp,
            visit.startTime
          );
          activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
          activity.startTime = visit.startTime;
      } else {
        timeNotTesting = this.getWaitTimeBetween(
          testResult.testStartTimestamp,
          visit.tests[indexTestResult - 1].endTime
        );
        activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
        activity.startTime = visit.tests[indexTestResult - 1].endTime;
      }
      activity.endTime = testResult.testStartTimestamp;

    } else {
      const currentTime = new Date().toISOString();
      if (timeline.length === 0) {
        timeNotTesting = this.getWaitTimeBetween(
          currentTime,
          visit.startTime
        );
        activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
        activity.startTime = visit.startTime;
      } else {
        const lastTimelineItem = timeline[timeline.length - 1];
        if (lastTimelineItem.status) {
          timeNotTesting = this.getWaitTimeBetween(
            currentTime,
            lastTimelineItem.endTime
          );
          activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
          activity.startTime = lastTimelineItem.endTime;
        } else {
          timeNotTesting = this.getWaitTimeBetween(
            currentTime,
            lastTimelineItem.startTime
          );
          activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
          activity.startTime = lastTimelineItem.startTime;
        }
      }
      activity.endTime = new Date().toISOString();
    }

    activity.notes = null;
    return activity;
  }

  createWaitOrUnaccountableTime(timeNotTesting: number, visit: VisitModel): ActivityModel {
    if (timeNotTesting < this.counterTime) {
      // unaccountable time
      return this.createActivity(visit, null, false, false);
    } else {
      return this.createActivity(visit, VISIT.ACTIVITY_TYPE_WAIT, false, false);
    }
  }

  getWaitTimeBetween(start: string, end: string) {
    return this.commonFunc.minutesIntoMilliseconds(
      (Date.parse(start) - Date.parse(end))
    );
  }

  createActivitiesForUpdateCall(activitiesArr: ActivityModel[]) {
    let activitiesForUpdate = [];
    for (let activity of activitiesArr) {
        let updActivity = {
          id: activity.id,
          waitReason: activity.waitReason,
          notes: activity.notes ? activity.notes : null
        };
        activitiesForUpdate.push(updActivity);
    }
    return activitiesForUpdate;
  }

  minutesPassedSinceLastActivity(visit: VisitModel): number {
    if (!visit.tests.length) {
      return this.commonFunc.millisecondsIntoMinutes(
        Date.now() - Date.parse(visit.startTime)
      );
    } else {
      return this.commonFunc.millisecondsIntoMinutes(
        Date.now() - Date.parse(visit.tests[visit.tests.length - 1].endTime)
      );
    }
  }

  have5MinutesPassedSinceLastActivity(visit: VisitModel): boolean {
    return (this.minutesPassedSinceLastActivity(visit) > this.counterTime);
  }

  canAddOtherWaitingTime(timeline: any[]): boolean {
    if (timeline.length === 0) {
      return true;
    }
    return !timeline[timeline.length - 1].activityType;
  }

  checkWaitTimeReasons(activities: ActivityModel[]): boolean {
    let checkReason: boolean = false;
    activities.forEach((elem) => {
      if (elem.waitReason.length == 0) checkReason = true;
    });
    return checkReason;
  }

  createWaitTime(timeline: any[], visit: VisitModel): void {
    let waitActivity: ActivityModel = this.createActivity(
      visit,
      VISIT.ACTIVITY_TYPE_WAIT,
      true,
      true
    );
    this.waitTimeStarted = true;
    if (timeline.length === 0) {
      waitActivity.startTime = visit.startTime;
    } else {
      waitActivity.startTime = timeline[timeline.length - 1]['endTime'];
    }
    timeline.push(waitActivity);
  }

  createActivityToPost$(timeline: any[], visit: VisitModel, oid: string): Observable<any> {
    const activity: ActivityModel = this.createActivityBodyForCall(
      visit,
      null,
      timeline
    );

    return this.submitActivity(activity).pipe(
      map((submitActivityResp) => {

        this.logProvider.dispatchLog({
          type: LOG_TYPES.INFO,
          message: `${oid} - ${submitActivityResp.status} ${submitActivityResp.statusText} for API call to ${submitActivityResp.url}`,
          timestamp: Date.now()
        });

        let activities = this.getActivities();
        if (timeline.length && timeline[timeline.length - 1].activityType) {
          const latestActivityPos = activities.length - 1;
          activities[latestActivityPos].endTime = new Date().toISOString();
          activities[latestActivityPos].id = submitActivityResp.body.id;

        }
        this.updateActivitiesArgs(activities);
        return activities;
      }),
      catchError((error) => {
        this.showLoading('');

        this.logProvider.dispatchLog({
          type: `${LOG_TYPES.ERROR}-activityService.submitActivity in visit-timeline.ts`,
          message: `${oid} -${JSON.stringify(error)}`,
          timestamp: Date.now()
        });

        this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
          event: ANALYTICS_EVENTS.TEST_ERROR,
          label: ANALYTICS_VALUE.WAIT_ACTIVITY_SUBMISSION_FAILED
        });

        return of(null);
      })
    );
  }

  async showLoading(loadingText: string) {
    if (loadingText) {
      this.loading = this.loadingCtrl.create({
        content: loadingText
      });

      await this.loading.present();
    } else {
      await this.loading.dismiss();
    }
  }
}
