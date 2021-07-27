import { TestBed } from '@angular/core/testing';
import { SyncService } from './sync.service';
import { AlertController, Events, LoadingController } from 'ionic-angular';
import { StorageService } from '../natives/storage.service';
import { HTTPService } from './http.service';
import { AlertControllerMock } from '../../../test-config/ionic-mocks/alert-controller.mock';
import { EventsMock } from '../../../test-config/ionic-mocks/events.mock';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CallNumber } from '@ionic-native/call-number';
import { LoadingControllerMock } from '../../../test-config/ionic-mocks/loading-controller.mock';
import { AppService } from './app.service';
import { AppServiceMock } from '../../../test-config/services-mocks/app-service.mock';
import { AppVersion } from '@ionic-native/app-version';
import { LogsProvider } from '../../modules/logs/logs.service';
import { ANALYTICS_EVENT_CATEGORIES, ANALYTICS_EVENTS, APP_UPDATE, STORAGE } from '../../app/app.enums';
import { VERSION_POPUP_MSG } from '../../app/app.constants';
import { AuthenticationService } from '../auth';
import { AuthenticationServiceMock } from '../../../test-config/services-mocks/authentication-service.mock';
import { AnalyticsService } from './analytics.service';
import { HttpResponse } from '@angular/common/http';
import { HttpServiceMock } from '../../../test-config/services-mocks/http-service.mock';
import { StorageServiceMock } from '../../../test-config/services-mocks/storage-service.mock';

describe('Provider: SyncService', () => {
  let syncService: SyncService;
  let storageService: StorageService;
  let httpService: HTTPService;
  let events: Events;
  let alertCtrl: AlertController;
  let loadingCtrl: LoadingController;
  let appService: AppService;
  let appVersion: AppVersion;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;

  let latestAppVersion = {
    body: {
      'mobile-app': {
        version: 'v2.0.0',
        version_checking: 'true'
      }
    }
  };
  const currentAppVersion = `v1.0.0`;

  beforeEach(() => {
    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEvent']);

    TestBed.configureTestingModule({
      providers: [
        SyncService,
        OpenNativeSettings,
        CallNumber,
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: AppService, useClass: AppServiceMock },
        { provide: HTTPService, useClass: HttpServiceMock },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: Events, useFactory: () => EventsMock.instance() },
        { provide: LogsProvider, useValue: logProviderSpy },
        AppVersion
      ]
    });

    syncService = TestBed.get(SyncService);
    httpService = TestBed.get(HTTPService);
    storageService = TestBed.get(StorageService);
    events = TestBed.get(Events);
    alertCtrl = TestBed.get(AlertController);
    loadingCtrl = TestBed.get(LoadingController);
    appService = TestBed.get(AppService);
    appVersion = TestBed.get(AppVersion);
    logProvider = TestBed.get(LogsProvider);
    analyticsService = TestBed.get(AnalyticsService);

    spyOn(storageService, 'update').and.returnValue(Promise.resolve());
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('testing handleError() function', () => {
    syncService.handleError();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  describe('checkForUpdate', () => {
    beforeEach(() => {
      spyOn(appVersion, 'getVersionNumber')
        .and.returnValue(Promise.resolve(currentAppVersion));
    });
    it('should show the update popup if the version_checking flag is true, the app version is not the latest, and there is no current visit', () => {
      spyOn(storageService, 'read').and.returnValue(Promise.resolve(null));
      spyOn(httpService, 'getApplicationVersion')
          .and.returnValue(Promise.resolve(new HttpResponse(latestAppVersion)));
        const { version: latestVersion } = latestAppVersion.body['mobile-app'];

        return syncService.checkForUpdate().then(() => {
          expect(alertCtrl.create).toHaveBeenCalledWith({
            title: APP_UPDATE.TITLE,
            message: VERSION_POPUP_MSG(currentAppVersion, latestVersion),
            buttons: [
              {
                text: APP_UPDATE.BUTTON,
                handler: jasmine.any(Function)
              }
            ],
            enableBackdropDismiss: false
          });
        });
    });
    it('should not show the update popup if the app is updated', () => {
      spyOn(storageService, 'read').and.returnValue(Promise.resolve({}));
      spyOn(httpService, 'getApplicationVersion').and.returnValue(Promise.resolve(new HttpResponse({
        ...latestAppVersion,
        body: { 'mobile-app': { version: 'v2.0.0' } }
      })));

      return syncService.checkForUpdate().then(() => {
        expect(alertCtrl.create).toHaveBeenCalledTimes(0);
      });
    });
    it('should not show the update popup if there is a newer version of the app but there is an active visit', () => {
      spyOn(storageService, 'read').and.returnValue(Promise.resolve({}));
      spyOn(httpService, 'getApplicationVersion')
        .and.returnValue(Promise.resolve(new HttpResponse(latestAppVersion)));

      return syncService.checkForUpdate().then(() => {
        expect(alertCtrl.create).toHaveBeenCalledTimes(0);
      });
    });
    it('should not show the update popup if there is a newer version, no current visit, but the version_checking is set to false', () => {
      spyOn(storageService, 'read').and.returnValue(Promise.resolve({}));
      spyOn(httpService, 'getApplicationVersion').and.returnValue(Promise.resolve(new HttpResponse({
        ...latestAppVersion,
        body: { 'mobile-app': { version_checking: 'false' } }
      })));

      return syncService.checkForUpdate().then(() => {
        expect(alertCtrl.create).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('trackUpdatedApp',  () => {
    it('should track event for an updated app', async () => {
      const currentVer = 'v2.2.0';
      const latestAppVer = 'v2.2.0';
      syncService.isVersionCheckedError = false;

      await syncService.trackUpdatedApp(currentVer, latestAppVer);

      expect(analyticsService.logEvent).toHaveBeenCalledWith({
        category: ANALYTICS_EVENT_CATEGORIES.APP_UPDATE,
        event: ANALYTICS_EVENTS.APP_UPDATE
      });
    });
  });

  describe('setAppVersion', () => {
    it('should retrieve the application version and set into storage', async () => {
      spyOn(httpService, 'getApplicationVersion')
        .and.returnValue(Promise.resolve(new HttpResponse(latestAppVersion)));

      await syncService.setAppVersion();
      expect(storageService.update).toHaveBeenCalledWith(STORAGE.APP_VERSION, {
        version: 'v2.0.0',
        version_checking: 'true'
      });
    });
    it('should reject promise and set app version to null', async () => {
      await syncService.setAppVersion();
      expect(storageService.update).toHaveBeenCalledWith(STORAGE.APP_VERSION, null);
      expect(logProvider.dispatchLog).toHaveBeenCalled();
    });
  });
});
