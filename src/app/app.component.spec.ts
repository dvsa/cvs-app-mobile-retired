// import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
// import { IonicModule } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { MyApp } from './app.component';
// import { StorageService } from '../providers/natives/storage.service';
// import { AuthService } from '../providers/global/auth.service';
// import { CallNumber } from '@ionic-native/call-number';
// import { OpenNativeSettings } from '@ionic-native/open-native-settings';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
// import { IonicStorageModule } from '@ionic/storage';
// import { SyncService } from '../providers/global/sync.service';
// import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
// import { VisitService } from '../providers/visit/visit.service';
// import { VisitServiceMock } from '../../test-config/services-mocks/visit-service.mock';
// import { MSAdal } from '@ionic-native/ms-adal';
// import { AuthServiceMock } from '../../test-config/services-mocks/auth-service.mock';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { AppService } from '../providers/global/app.service';
// import { AppServiceMock } from '../../test-config/services-mocks/app-service.mock';
// import { FirebaseLogsService } from '../providers/firebase-logs/firebase-logs.service';
// import { FirebaseLogsServiceMock } from '../../test-config/services-mocks/firebaseLogsService.mock';
// import { ActivityService } from '../providers/activity/activity.service';
// import { ActivityServiceMock } from '../../test-config/services-mocks/activity-service.mock';
// import { STORAGE } from './app.enums';
// import { Network } from '@ionic-native/network';
// import { Store } from '@ngrx/store';
// import { TestStore } from '../providers/interceptors/auth.interceptor.spec';
// import { LogsProvider } from '../modules/logs/logs.service';

// describe('Component: Root', () => {
//   let comp: MyApp;
//   let fixture: ComponentFixture<MyApp>;
//   let syncServiceSpy;
//   let authService;
//   let appService;
//   let activityService;
//   let syncService;
//   let logProvider: LogsProvider;
//   let logProviderSpy: any;
//   let storageService;
//   let visitService;
//   let screenOrientation: ScreenOrientation;
//   let firebaseLogsService: FirebaseLogsService;

//   beforeEach(async(() => {
//     syncServiceSpy = jasmine.createSpyObj('SyncService', {
//       checkForUpdate: () => true
//     });

//     logProviderSpy = jasmine.createSpyObj('LogsProvider', {
//       dispatchLog: () => true
//     });

//     TestBed.configureTestingModule({
//       declarations: [MyApp],
//       providers: [
//         StatusBar,
//         SplashScreen,
//         StorageService,
//         MSAdal,
//         { provide: FirebaseLogsService, useClass: FirebaseLogsServiceMock },
//         { provide: ActivityService, useClass: ActivityServiceMock },
//         { provide: VisitService, useClass: VisitServiceMock },
//         { provide: SyncService, useValue: syncServiceSpy },
//         { provide: LogsProvider, useValue: logProviderSpy },
//         { provide: AuthService, useClass: AuthServiceMock },
//         { provide: AppService, useClass: AppServiceMock },
//         CallNumber,
//         OpenNativeSettings,
//         MobileAccessibility,
//         ScreenOrientation,
//         Network,
//         { provide: Store, useClass: TestStore }
//       ],
//       imports: [
//         BrowserModule,
//         HttpClientModule,
//         IonicModule.forRoot(MyApp),
//         IonicStorageModule.forRoot({
//           driverOrder: ['sqlite', 'websql', 'indexeddb']
//         })
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MyApp);
//     comp = fixture.componentInstance;
//     authService = TestBed.get(AuthService);
//     syncService = TestBed.get(SyncService);
//     storageService = TestBed.get(StorageService);
//     appService = TestBed.get(AppService);
//     visitService = TestBed.get(VisitService);
//     activityService = TestBed.get(ActivityService);
//     screenOrientation = TestBed.get(ScreenOrientation);
//     firebaseLogsService = TestBed.get(FirebaseLogsService);
//     logProvider = TestBed.get(LogsProvider);
//   });

//   it('should create component', (done) => {
//     spyOn(firebaseLogsService, 'logEvent');
//     expect(fixture).toBeTruthy();
//     expect(comp).toBeTruthy();
//     expect(firebaseLogsService.logEvent).not.toHaveBeenCalled();
//     done();
//   });

//   it('should AuthService and Root Component share the same instance', inject(
//     [AuthService],
//     (injectService: AuthService) => {
//       expect(injectService).toBe(authService);
//     }
//   ));

//   it('should SyncService and Root Component share the same instance', inject(
//     [SyncService],
//     (injectService: SyncService) => {
//       expect(injectService).toBe(syncService);
//     }
//   ));

//   it('should StorageService and Root Component share the same instance', inject(
//     [StorageService],
//     (injectService: StorageService) => {
//       expect(injectService).toBe(storageService);
//     }
//   ));

//   it('should VisitService and Root Component share the same instance', inject(
//     [VisitService],
//     (injectService: VisitService) => {
//       expect(injectService).toBe(visitService);
//     }
//   ));

//   it('Should check manageAppState method state resp: true, visit resp: true, activities resp: false', () => {
//     storageService.read = jasmine.createSpy('read').and.callFake((key) => {
//       let keyReturn;
//       switch (key) {
//         case STORAGE.STATE: {
//           keyReturn = true;
//           break;
//         }
//         case STORAGE.VISIT: {
//           keyReturn = true;
//           break;
//         }
//         case STORAGE.ACTIVITIES: {
//           keyReturn = false;
//           break;
//         }
//       }
//       return new Promise((resolve) => resolve(keyReturn));
//     });
//     comp.manageAppState();
//     expect(storageService.read).toHaveBeenCalled();
//   });

//   it('Should check manageAppState method state resp: true, visit resp: true, activities resp: true', () => {
//     storageService.read = jasmine.createSpy('read').and.callFake((key) => {
//       let keyReturn;
//       switch (key) {
//         case STORAGE.STATE: {
//           keyReturn = true;
//           break;
//         }
//         case STORAGE.VISIT: {
//           keyReturn = true;
//           break;
//         }
//         case STORAGE.ACTIVITIES: {
//           keyReturn = true;
//           break;
//         }
//       }
//       return new Promise((resolve) => resolve(keyReturn));
//     });
//     comp.manageAppState();
//     expect(storageService.read).toHaveBeenCalled();
//   });

//   it('Should check manageAppState method false state response', () => {
//     storageService.read = jasmine.createSpy('read').and.callFake((key) => {
//       let keyReturn;
//       switch (key) {
//         case STORAGE.STATE: {
//           keyReturn = false;
//           break;
//         }
//         case STORAGE.VISIT: {
//           keyReturn = true;
//           break;
//         }
//         case STORAGE.ACTIVITIES: {
//           keyReturn = false;
//           break;
//         }
//       }
//       return new Promise((resolve) => resolve(keyReturn));
//     });
//     comp.manageAppState();
//   });
// });
