import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_VALUE,
  APP_STRINGS
} from '../../app/app.enums';
import { StateReformingService } from '../../providers/global/state-reforming.service';
import { AnalyticsService, AppAlertService } from '../../providers/global';

@IonicPage()
@Component({
  selector: 'page-site-visit-failed',
  templateUrl: 'site-visit-failed.html'
})
export class SiteVisitFailedPage {
  messageOne: string;
  messageTwo: string;
  messageThree: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private stateReformingService: StateReformingService,
    private alertService: AppAlertService,
    private analyticsService: AnalyticsService
  ) {}

  ionViewWillEnter() {
    this.messageOne = APP_STRINGS.FAILED_MESSAGE_END_VISIT_ONE;
    this.messageTwo = APP_STRINGS.FAILED_MESSAGE_END_VISIT_TWO;
    this.messageThree = APP_STRINGS.FAILED_MESSAGE_END_VISIT_THREE;
  }

  ionViewDidEnter() {
    this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.SITE_VISIT_FAILED);
  }

  async confirm() {
    this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.VISIT_ERROR,
      label: ANALYTICS_VALUE.CONFIRMED_FAILED_SUBMISSION
    });
    await this.navCtrl.popToRoot();
  }

  callSupport() {
    this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.VISIT_ERROR,
      label: ANALYTICS_VALUE.CALL_IT
    });
    this.alertService.callSupport();
  }
}
