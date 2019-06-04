import { TestBed } from "@angular/core/testing";
import { SyncService } from "./sync.service";
import { AlertController, Events, LoadingController } from "ionic-angular";
import { StorageService } from "../natives/storage.service";
import { HTTPService } from "./http.service";
import { AlertControllerMock } from "../../../test-config/ionic-mocks/alert-controller.mock";
import { EventsMock } from "../../../test-config/ionic-mocks/events.mock";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { CallNumber } from "@ionic-native/call-number";
import { LoadingControllerMock } from "../../../test-config/ionic-mocks/loading-controller.mock";
import { DefectsReferenceDataMock } from "../../assets/data-mocks/reference-data-mocks/defects-data.mock";
import { PreparersDataMock } from "../../assets/data-mocks/reference-data-mocks/preparers-data.mock";
import { TestStationDataMock } from "../../assets/data-mocks/reference-data-mocks/test-station-data.mock";
import { TestTypesReferenceDataMock } from "../../assets/data-mocks/reference-data-mocks/test-types.mock";
import { AppService } from "./app.service";
import { AppServiceMock } from "../../../test-config/services-mocks/app-service.mock";
import { Firebase } from "@ionic-native/firebase";
import { AuthService } from "./auth.service";
import { AuthServiceMock } from "../../../test-config/services-mocks/auth-service.mock";
import { Store } from "@ngrx/store";
import { TestStore } from "../interceptors/auth.interceptor.spec";


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

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['read']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['get', 'getAtfs', 'getDefects', 'getTestTypes', 'getPreparers']);

    TestBed.configureTestingModule({
      providers: [
        Firebase,
        SyncService,
        OpenNativeSettings,
        CallNumber,
        {provide: AppService, useClass: AppServiceMock},
        {provide: HTTPService, useValue: httpServiceSpy},
        {provide: StorageService, useValue: storageServiceSpy},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Store, useClass: TestStore},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: Events, useFactory: () => EventsMock.instance()}
      ]
    });

    syncService = TestBed.get(SyncService);
    httpService = TestBed.get(HTTPService);
    storageService = TestBed.get(StorageService);
    events = TestBed.get(Events);
    alertCtrl = TestBed.get(AlertController);
    loadingCtrl = TestBed.get(LoadingController);
    appService = TestBed.get(AppService);
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

  it('should call events.publish from handleData method', () => {
    let myArray = [];
    myArray.push(DefectsReferenceDataMock.DefectsData);
    myArray.push(PreparersDataMock.PreparersData);
    myArray.push(TestStationDataMock.TestStationData);
    myArray.push(TestTypesReferenceDataMock.TestTypesData);

    syncService.handleData(myArray);
    expect(events.publish).toHaveBeenCalled();
  });
});
