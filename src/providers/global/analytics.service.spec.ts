import { TestBed } from '@angular/core/testing';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';
import { PlatformMock, GoogleAnalyticsMock } from 'ionic-mocks';

import { AnalyticsService, EventDetails } from './analytics.service';

describe('AnalyticsService', () => {
  let platform: Platform;
  let analyticsService: AnalyticsService;
  let googleAnalytics: GoogleAnalytics;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: GoogleAnalytics, useFactory: () => GoogleAnalyticsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() }
      ]
    });
  });

  beforeEach(() => {
    platform = TestBed.get(Platform);
    analyticsService = TestBed.get(AnalyticsService);
    googleAnalytics = TestBed.get(GoogleAnalytics);
  });

  const allowAction = () => {
    platform.is = jasmine.createSpy('platform.is').and.returnValue(true);
    analyticsService.hasTrackingStarted = true;
  };

  const preventAction = () => {
    platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
    analyticsService.hasTrackingStarted = false;
  };

  describe('startAnalyticsTracking', () => {
    let trackId: string;

    beforeEach(() => {
      trackId = 'UA-00000000-0';
    });

    it('should start analytics tracking', async () => {
      await analyticsService.startAnalyticsTracking(trackId);

      expect(googleAnalytics.startTrackerWithId).toHaveBeenCalledWith(trackId);
      expect(analyticsService.hasTrackingStarted).toBeTruthy();
    });

    it('should not start analytics tracking if tracking id not available', async () => {
      await analyticsService.startAnalyticsTracking('');

      expect(googleAnalytics.startTrackerWithId).toHaveBeenCalled();
      expect(analyticsService.hasTrackingStarted).toBeFalsy();
    });

    it('should not start analytics tracking if errored', async () => {
      googleAnalytics.startTrackerWithId = jasmine
        .createSpy('googleAnalytics.startTrackerWithId')
        .and.returnValue(Promise.reject('track error!'));

      await analyticsService.startAnalyticsTracking(trackId);

      expect(googleAnalytics.startTrackerWithId).toHaveBeenCalled();
      expect(analyticsService.hasTrackingStarted).toBeFalsy();
      expect(analyticsService.analyticsErrStr).toEqual(
        'startAnalyticsTracking: Error starting Google Analytics'
      );
    });
  });

  describe('logEvent', () => {
    let details: EventDetails;

    beforeEach(() => {
      details = {
        category: 'category',
        event: 'event-name',
        label: 'label-name'
      };
    });

    it('should log event if allowed conditions are met', async () => {
      allowAction();

      await analyticsService.logEvent(details);

      expect(googleAnalytics.trackEvent).toHaveBeenCalledWith(
        details.category,
        details.event,
        details.label,
        undefined
      );
    });

    it('should prevent log event if conditions are not met', async () => {
      preventAction();

      await analyticsService.logEvent(details);

      expect(googleAnalytics.trackEvent).not.toHaveBeenCalled();
    });
  });

  describe('setCurrentPage', () => {
    it('should set the current page for tracking', async () => {
      allowAction();

      const pName = 'page-name';
      await analyticsService.setCurrentPage(pName);

      expect(googleAnalytics.trackView).toHaveBeenCalledWith(pName);
    });

    it('should prevent current page from tracking if conditions are not met', async () => {
      preventAction();

      await analyticsService.setCurrentPage('details');

      expect(googleAnalytics.trackView).not.toHaveBeenCalled();
    });
  });

  describe('addCustomDimension', () => {
    it('should set the custom dimension for tracking', async () => {
      allowAction();

      const key = 1,
        value = 'some-value';
      await analyticsService.addCustomDimension(key, value);

      expect(googleAnalytics.addCustomDimension).toHaveBeenCalledWith(key, value);
    });

    it('should prevent custom dimension from tracking if conditions are not met', async () => {
      preventAction();

      await analyticsService.addCustomDimension(1, 'value');

      expect(googleAnalytics.addCustomDimension).not.toHaveBeenCalled();
    });
  });
});
