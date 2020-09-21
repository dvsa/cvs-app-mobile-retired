import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SyncService } from './sync.service';
import { AlertController, Events, LoadingController } from 'ionic-angular';
import { StorageService } from '../natives/storage.service';
import { HTTPService } from './http.service';
import { AlertControllerMock } from '../../../test-config/ionic-mocks/alert-controller.mock';
import { EventsMock } from '../../../test-config/ionic-mocks/events.mock';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CallNumber } from '@ionic-native/call-number';
import { LoadingControllerMock } from '../../../test-config/ionic-mocks/loading-controller.mock';
import { DefectsReferenceDataMock } from '../../assets/data-mocks/reference-data-mocks/defects-data.mock';
import { PreparersDataMock } from '../../assets/data-mocks/reference-data-mocks/preparers-data.mock';
import { TestStationDataMock } from '../../assets/data-mocks/reference-data-mocks/test-station-data.mock';
import { TestTypesReferenceDataMock } from '../../assets/data-mocks/reference-data-mocks/test-types.mock';
import { AppService } from './app.service';
import { AppServiceMock } from '../../../test-config/services-mocks/app-service.mock';
import { Firebase } from '@ionic-native/firebase';
import { AuthService } from './auth.service';
import { AuthServiceMock } from '../../../test-config/services-mocks/auth-service.mock';
import { Store } from '@ngrx/store';
import { TestStore } from '../interceptors/auth.interceptor.spec';
import { AppVersion } from '@ionic-native/app-version';

describe('Provider: SyncService', () => {
  let syncService: SyncService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let httpService: HTTPService;
  let httpServiceSpy: any;
  let events: Events;
  let alertCtrl: AlertController;
  let loadingCtrl: LoadingController;
  let appService: AppService;
  let appVersion: AppVersion;
  let latestAppVersion = {
    body: {
      'mobile-app': {
        version: 'v2.0.0',
        version_checking: 'true'
      }
    }
  };

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['read']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', [
      'get',
      'getAtfs',
      'getDefects',
      'getTestTypes',
      'getPreparers',
      'getApplicationVersion'
    ]);
    httpServiceSpy.getApplicationVersion = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve(latestAppVersion));

    TestBed.configureTestingModule({
      providers: [
        Firebase,
        SyncService,
        OpenNativeSettings,
        CallNumber,
        { provide: AppService, useClass: AppServiceMock },
        { provide: HTTPService, useValue: httpServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Store, useClass: TestStore },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: Events, useFactory: () => EventsMock.instance() },
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
  });

  afterEach(() => {
    syncService = null;
    httpService = null;
    storageService = null;
    events = null;
    alertCtrl = null;
    loadingCtrl = null;
    appService = null;
  });

  it('testing handleError() function', () => {
    syncService.handleError();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should show the update popup if the version_checking flag is true, the app version is not the latest, and there is no current visit', () => {
    spyOn(appVersion, 'getVersionNumber').and.returnValue(Promise.resolve('v1.0.0'));
    latestAppVersion.body['mobile-app'].version_checking = 'true';

    return syncService.checkForUpdate().then(() => {
      expect(alertCtrl.create).toHaveBeenCalledTimes(1);
    });
  });

  it('should not show the update popup if the app is updated', () => {
    spyOn(appVersion, 'getVersionNumber').and.returnValue(Promise.resolve('v2.0.0'));

    return syncService.checkForUpdate().then(() => {
      expect(alertCtrl.create).toHaveBeenCalledTimes(0);
    });
  });

  it('should not show the update popup if there is a newer version of the app but there is an active visit', () => {
    spyOn(appVersion, 'getVersionNumber').and.returnValue(Promise.resolve('v1.0.0'));
    storageService.read = jasmine.createSpy().and.returnValue(Promise.resolve({}));

    return syncService.checkForUpdate().then(() => {
      expect(alertCtrl.create).toHaveBeenCalledTimes(0);
    });
  });

  it('should not show the update popup if there is a newer version, no current visit, but the version_checking is set to false', () => {
    spyOn(appVersion, 'getVersionNumber').and.returnValue(Promise.resolve('v1.0.0'));
    latestAppVersion.body['mobile-app'].version_checking = 'false';

    return syncService.checkForUpdate().then(() => {
      expect(alertCtrl.create).toHaveBeenCalledTimes(0);
    });
  });
});
