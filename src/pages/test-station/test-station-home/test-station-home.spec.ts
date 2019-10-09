import { TestStationHomePage } from "./test-station-home";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController } from "ionic-angular";
import { AppService } from "../../../providers/global/app.service";
import { StorageService } from "../../../providers/natives/storage.service";
import { VisitService } from "../../../providers/visit/visit.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AuthService } from "../../../providers/global/auth.service";
import { CallNumber } from "@ionic-native/call-number";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { StorageServiceMock } from "../../../../test-config/services-mocks/storage-service.mock";
import { VisitServiceMock } from "../../../../test-config/services-mocks/visit-service.mock";
import { AuthServiceMock } from "../../../../test-config/services-mocks/auth-service.mock";
import { AlertControllerMock } from "ionic-mocks";
import { PAGE_NAMES } from "../../../app/app.enums";
import { Store } from "@ngrx/store";
import { NetworkStateProvider } from "../../../modules/logs/network-state.service";
import { TestStore } from "../../../providers/interceptors/auth.interceptor.spec";
import { FirebaseLogsService } from "../../../providers/firebase-logs/firebase-logs.service";
import { FirebaseLogsServiceMock } from "../../../../test-config/services-mocks/firebaseLogsService.mock";

describe('Component: TestStationHomePage', () => {
  let comp: TestStationHomePage;
  let fixture: ComponentFixture<TestStationHomePage>;
  let navCtrl: NavController;
  let appService: AppService;
  let appServiceSpy: any;
  let storageService: StorageService;
  let visitService: VisitService;
  let screenOrientation: ScreenOrientation;
  let screenOrientationSpy: ScreenOrientation;
  let authService: AuthService;
  let alertCtrl: AlertController;
  let callNumber: CallNumber;
  let callNumberSpy: any;
  let navCtrlSpy: any;
  let networkStateProvider: NetworkStateProvider;
  let networkStateProviderSpy: any;
  let $store: any;
  let firebaseLogsService: FirebaseLogsService;


  beforeEach(async(() => {
    appServiceSpy = jasmine.createSpyObj('AppService', ['enableCache']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['push']);
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);
    screenOrientationSpy = jasmine.createSpyObj('ScreenOrientation', ['lock']);
    networkStateProviderSpy = jasmine.createSpyObj('NetworkStateProvider', ['initialiseNetworkState']);

    TestBed.configureTestingModule({
      declarations: [TestStationHomePage],
      imports: [
        IonicModule.forRoot(TestStationHomePage)
      ],
      providers: [
        {provide: NavController, useValue: navCtrlSpy},
        {provide: AppService, useValue: appServiceSpy},
        {provide: StorageService, useClass: StorageServiceMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: ScreenOrientation, useValue: screenOrientationSpy},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Store, useClass: TestStore},
        {provide: FirebaseLogsService, useClass: FirebaseLogsServiceMock},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: CallNumber, useValue: callNumberSpy},
        {provide: NetworkStateProvider, useValue: networkStateProviderSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStationHomePage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    appService = TestBed.get(AppService);
    storageService = TestBed.get(StorageService);
    visitService = TestBed.get(VisitService);
    screenOrientation = TestBed.get(ScreenOrientation);
    authService = TestBed.get(AuthService);
    alertCtrl = TestBed.get(AlertController);
    callNumber = TestBed.get(CallNumber);
    networkStateProvider = TestBed.get(NetworkStateProvider);
    // $store = TestBed.get(Store);
    firebaseLogsService = TestBed.get(FirebaseLogsService);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    appService = null;
    storageService = null;
    visitService = null;
    screenOrientation = null;
    authService = null;
    alertCtrl = null;
    callNumber = null;
    appServiceSpy = null;
    callNumberSpy = null;
    screenOrientationSpy = null;
    networkStateProvider = null;
    // $store = null;
  });

  it('should create component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    done();
  });

  it('should check if appService.enableCache has been called', () => {
    comp.enableCache();
    expect(appService.enableCache).toHaveBeenCalled();
  });

  it('should check the ngOnInit logic', () => {
    comp.ngOnInit();
    expect(networkStateProvider.initialiseNetworkState).toHaveBeenCalled();
    expect(callNumber.callNumber).not.toHaveBeenCalled();
    expect(screenOrientation.lock).not.toHaveBeenCalled();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should test ionViewDidEnter logic', () => {
    spyOn(firebaseLogsService, 'setScreenName');
    comp.ionViewDidEnter();
    expect(firebaseLogsService.setScreenName).toHaveBeenCalled();
  });

  it('should test getStarted flow', () => {
    comp.getStarted();
    expect(navCtrl.push).toHaveBeenCalledWith(PAGE_NAMES.TEST_STATION_SEARCH_PAGE);
  });
});
