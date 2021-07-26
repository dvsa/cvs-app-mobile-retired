import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { Network } from '@ionic-native/network';
import { Store } from '@ngrx/store';
import { EventsMock, SplashScreenMock, StatusBarMock, NetworkMock } from 'ionic-mocks';

import { MyApp } from './app.component';
import { StorageService } from '../providers/natives/storage.service';
import { StorageServiceMock } from '../../test-config/services-mocks/storage-service.mock';
import { AppService, SyncService, AnalyticsService, NetworkService } from '../providers/global';
import { VisitService } from '../providers/visit/visit.service';
import { AppServiceMock } from '../../test-config/services-mocks/app-service.mock';
import { VisitServiceMock } from '../../test-config/services-mocks/visit-service.mock';
import { AuthenticationService } from '../providers/auth';
import { ActivityService } from '../providers/activity/activity.service';
import { ActivityServiceMock } from '../../test-config/services-mocks/activity-service.mock';
import { STORAGE, PAGE_NAMES, CONNECTION_STATUS } from './app.enums';
import { LogsProvider } from '../modules/logs/logs.service';
import { TestStore } from '../modules/logs/data-store.service.mock';

describe('Component: Root', () => {
  let comp: MyApp;
  let fixture: ComponentFixture<MyApp>;
  let appService: AppService;
  let events: Events;
  let splashScreen: SplashScreen;
  let activityService;
  let syncService;
  let syncServiceSpy: any;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let storageService;
  let visitService;
  let screenOrientation: ScreenOrientation;
  let screenOrientationSpy: any;
  let authenticationService: AuthenticationService;
  let authenticationSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let networkService: NetworkService;

  beforeEach(async(() => {
    syncServiceSpy = jasmine.createSpyObj('SyncService', {
      checkForUpdate: () => true
    });

    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    authenticationSpy = jasmine.createSpyObj('AuthenticationService', [
      'expireTokens',
      'checkUserAuthStatus'
    ]);

    screenOrientationSpy = jasmine.createSpyObj('ScreenOrientation', ['lock']);

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'addCustomDimension'
    ]);

    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],
      providers: [
        MobileAccessibility,
        NetworkService,
        { provide: AuthenticationService, useValue: authenticationSpy },
        { provide: AppService, useClass: AppServiceMock },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
        { provide: Events, useFactory: () => EventsMock.instance() },
        { provide: Network, useFactory: () => NetworkMock.instance('wifi') },
        { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() },
        { provide: ScreenOrientation, useValue: screenOrientationSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: ActivityService, useClass: ActivityServiceMock },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: SyncService, useValue: syncServiceSpy },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: Store, useClass: TestStore }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    comp = fixture.componentInstance;
    events = TestBed.get(Events);
    splashScreen = TestBed.get(SplashScreen);
    authenticationService = TestBed.get(AuthenticationService);
    syncService = TestBed.get(SyncService);
    storageService = TestBed.get(StorageService);
    appService = TestBed.get(AppService);
    visitService = TestBed.get(VisitService);
    activityService = TestBed.get(ActivityService);
    screenOrientation = TestBed.get(ScreenOrientation);
    analyticsService = TestBed.get(AnalyticsService);
    logProvider = TestBed.get(LogsProvider);
    networkService = TestBed.get(NetworkService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(comp instanceof MyApp).toBe(true);
  });

  describe('when loading app', () => {
    beforeEach(() => {
      spyOn(networkService, 'initialiseNetworkStatus');
      spyOn(networkService, 'getNetworkState').and.returnValue(CONNECTION_STATUS.ONLINE);
      spyOn(appService, 'manageAppInit').and.callFake(() => Promise.resolve());
    });

    it('should set app defaults and navigate to signature page', async () => {
      spyOn(comp.navElem, 'setRoot');

      authenticationService.checkUserAuthStatus = jasmine
        .createSpy('authenticationService.checkUserAuthStatus')
        .and.returnValue(true);

      await comp.initApp();

      expect(authenticationService.expireTokens).toHaveBeenCalledWith();
      expect(networkService.initialiseNetworkStatus).toHaveBeenCalled();
      expect(appService.manageAppInit).toHaveBeenCalled();

      expect(networkService.getNetworkState).toHaveBeenCalled();
      expect(splashScreen.hide).toHaveBeenCalled();
      expect(comp.navElem.setRoot).toHaveBeenCalledWith(PAGE_NAMES.SIGNATURE_PAD_PAGE);
    });
  });

  it('should SyncService and Root Component share the same instance', inject(
    [SyncService],
    (injectService: SyncService) => {
      expect(injectService).toBe(syncService);
    }
  ));

  it('should StorageService and Root Component share the same instance', inject(
    [StorageService],
    (injectService: StorageService) => {
      expect(injectService).toBe(storageService);
    }
  ));

  it('should VisitService and Root Component share the same instance', inject(
    [VisitService],
    (injectService: VisitService) => {
      expect(injectService).toBe(visitService);
    }
  ));

  it('Should check manageAppState method state resp: true, visit resp: true, activities resp: false', () => {
    storageService.read = jasmine.createSpy('read').and.callFake((key) => {
      let keyReturn;
      switch (key) {
        case STORAGE.STATE: {
          keyReturn = true;
          break;
        }
        case STORAGE.VISIT: {
          keyReturn = true;
          break;
        }
        case STORAGE.ACTIVITIES: {
          keyReturn = false;
          break;
        }
      }
      return new Promise((resolve) => resolve(keyReturn));
    });
    comp.manageAppState();
    expect(storageService.read).toHaveBeenCalled();
  });

  it('Should check manageAppState method state resp: true, visit resp: true, activities resp: true', () => {
    storageService.read = jasmine.createSpy('read').and.callFake((key) => {
      let keyReturn;
      switch (key) {
        case STORAGE.STATE: {
          keyReturn = true;
          break;
        }
        case STORAGE.VISIT: {
          keyReturn = true;
          break;
        }
        case STORAGE.ACTIVITIES: {
          keyReturn = true;
          break;
        }
      }
      return new Promise((resolve) => resolve(keyReturn));
    });
    comp.manageAppState();
    expect(storageService.read).toHaveBeenCalled();
  });

  it('Should check manageAppState method false state response', () => {
    storageService.read = jasmine.createSpy('read').and.callFake((key) => {
      let keyReturn;
      switch (key) {
        case STORAGE.STATE: {
          keyReturn = false;
          break;
        }
        case STORAGE.VISIT: {
          keyReturn = true;
          break;
        }
        case STORAGE.ACTIVITIES: {
          keyReturn = false;
          break;
        }
      }
      return new Promise((resolve) => resolve(keyReturn));
    });
    comp.manageAppState();
  });
});
