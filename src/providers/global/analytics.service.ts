import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Injectable()
export class AnalyticsService {
  private analyticsStartupError: string = 'Error starting Google Analytics';

  constructor(private ga: GoogleAnalytics) {}

  // logEvent(category: string, event: string, label?: string, value?: number): void {
  //   this.ga
  //     .startTrackerWithId('')
  //     .then(() => {
  //       this.ga
  //         .trackEvent(category, event, label, value)
  //         .then((resp) => {})
  //         .catch((eventError) => console.log('Error tracking event', eventError));
  //     })
  //     .catch((error) => console.log(`logEvent: ${this.analyticsStartupError}`, error));
  // }

  async logEvent(category: string, event: string, label?: string, value?: number) {
    await this.ga.startTrackerWithId('');
    console.log('******Tracking ID successed!!!!!!');
    const error = await this.ga.trackView('starting_mac_in_cloud');
    console.log('****TrackEvent success!!!');

    if (error) {
      console.log('Error tracking event', error);
    }
  }
}
