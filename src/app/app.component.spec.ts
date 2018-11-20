import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {IonicErrorHandler, IonicModule} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MyApp} from './app.component';
import {ErrorHandler} from "@angular/core";
import {HTTPService} from "../providers/global/http.service";
import {StorageService} from "../providers/natives/storage.service";
import {SocialSharing} from "@ionic-native/social-sharing";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Camera} from "@ionic-native/camera";
import {AuthService} from "../providers/global/auth.service";
import {CallNumber} from "@ionic-native/call-number";
import {OpenNativeSettings} from "@ionic-native/open-native-settings";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../providers/interceptors/auth.interceptor";
import {BrowserModule} from "@angular/platform-browser";
import {IonicStorageModule} from "@ionic/storage";
import {SyncService} from "../providers/global/sync.service";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";

describe('Component: Root', () => {
  let comp: MyApp;
  let fixture: ComponentFixture<MyApp>;
  let authService;
  let httpService;
  let syncService;
  let storageService;

  const IONIC_PROVIDERS = [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ];

  const CUSTOM_PROVIDERS = [
    AuthService,
    HTTPService,
    SyncService,
    StorageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ];

  const IONIC_NATIVE_PROVIDERS = [
    SocialSharing,
    InAppBrowser,
    Camera,
    CallNumber,
    OpenNativeSettings,
    MobileAccessibility
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      providers: [
        ...IONIC_PROVIDERS,
        ...CUSTOM_PROVIDERS,
        ...IONIC_NATIVE_PROVIDERS
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
    httpService = TestBed.get(HTTPService);
    syncService = TestBed.get(SyncService);
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    authService = null;
    httpService = null;
    syncService = null;
    storageService = null;
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

  it('should HTTPService and Root Component share the same instance',
    inject([HTTPService], (injectService: HTTPService) => {
      expect(injectService).toBe(httpService);
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

});
