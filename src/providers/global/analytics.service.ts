import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';
import to from 'await-to-js';

export interface EventDetails {
  category: string;
  event: string;
  label?: string;
  value?: number;
  newSession?: boolean;
}

@Injectable()
export class AnalyticsService {
  analyticsErrStr: string;
  hasTrackingStarted: boolean;

  constructor(private platform: Platform, private ga: GoogleAnalytics) {}

  async startAnalyticsTracking(trackId: string): Promise<void> {
    const [err, success] = await to(this.ga.startTrackerWithId(trackId));
    if (err) {
      this.analyticsErrStr = 'startAnalyticsTracking: Error starting Google Analytics';
      console.log(this.analyticsErrStr, err);
      return;
    }

    this.hasTrackingStarted = !!trackId;
  }

  isActionAllowed(): boolean {
    return this.platform.is('cordova') && this.hasTrackingStarted;
  }

  async logEvent(eventParams: EventDetails) {
    if (this.isActionAllowed()) {
      const { category, event, label, value } = eventParams;
      const [err, success] = await to(this.ga.trackEvent(category, event, label, value));
      if (err) {
        this.analyticsErrStr = 'logEvent: Error tracking event';
        console.log(this.analyticsErrStr, err);
      }
    }
  }

  async setCurrentPage(pageName: string): Promise<void> {
    if (this.isActionAllowed()) {
      const [err, success] = await to(this.ga.trackView(pageName));
      if (err) {
        this.analyticsErrStr = 'setCurrentPage: Error setting page';
        console.log(this.analyticsErrStr, err);
      }
    }
  }

  async addCustomDimension(key: number, value: string): Promise<void> {
    if (this.isActionAllowed()) {
      const [err, success] = await to(this.ga.addCustomDimension(key, value));
      if (err) {
        this.analyticsErrStr = 'addCustomDimension: Error adding custom dimension';
        console.log(this.analyticsErrStr, err);
      }
    }
  }
}
