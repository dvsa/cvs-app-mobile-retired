import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { StorageService } from "../providers/natives/storage.service";
import { AuthService } from "../providers/global/auth.service";
import { CallNumber } from "@ionic-native/call-number";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { IonicStorageModule } from "@ionic/storage";
import { SyncService } from "../providers/global/sync.service";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { VisitService } from "../providers/visit/visit.service";
import { VisitServiceMock } from "../../test-config/services-mocks/visit-service.mock";
import { MSAdal } from "@ionic-native/ms-adal";

describe('Component: Root', () => {
  let comp: MyApp;
  let fixture: ComponentFixture<MyApp>;
  let syncServiceSpy;
  let authService;
  let syncService;
  let storageService;
  let visitService;


  beforeEach(async(() => {
    syncServiceSpy = jasmine.createSpy('SyncService', () => 'startSync');

    TestBed.configureTestingModule({
      declarations: [MyApp],
      providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        StorageService,
        MSAdal,
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: SyncService, useValue: syncServiceSpy},
        CallNumber,
        OpenNativeSettings,
        MobileAccessibility,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot({
          driverOrder: ['sqlite', 'websql', 'indexeddb']
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    comp = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    syncService = TestBed.get(SyncService);
    storageService = TestBed.get(StorageService);
    visitService = TestBed.get(VisitService);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    authService = null;
    syncService = null;
    storageService = null;
    visitService = null;
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should AuthService and Root Component share the same instance',
    inject([AuthService], (injectService: AuthService) => {
      expect(injectService).toBe(authService);
    })
  );

  it('should SyncService and Root Component share the same instance',
    inject([SyncService], (injectService: SyncService) => {
      expect(injectService).toBe(syncService);
    })
  );

  it('should StorageService and Root Component share the same instance',
    inject([StorageService], (injectService: StorageService) => {
      expect(injectService).toBe(storageService);
    })
  );

  it('should VisitService and Root Component share the same instance',
    inject([VisitService], (injectService: VisitService) => {
      expect(injectService).toBe(visitService);
    })
  );

});
