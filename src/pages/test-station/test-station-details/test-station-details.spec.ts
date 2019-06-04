import { TestStationDetailsPage } from "./test-station-details";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  IonicModule,
  NavController,
  NavParams,
  AlertController,
  ViewController,
  LoadingController
} from "ionic-angular";
import { PipesModule } from "../../../pipes/pipes.module";
import { Firebase } from "@ionic-native/firebase";
import { NavControllerMock, AlertControllerMock, ViewControllerMock, LoadingControllerMock } from "ionic-mocks";
import { CallNumber } from "@ionic-native/call-number";
import { VisitService } from "../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../test-config/services-mocks/visit-service.mock";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestStationReferenceDataModel } from "../../../models/reference-data-models/test-station.model";
import { NavParamsMock } from "../../../../test-config/ionic-mocks/nav-params.mock";
import { AuthService } from "../../../providers/global/auth.service";
import { AuthServiceMock } from "../../../../test-config/services-mocks/auth-service.mock";
import { Store } from "@ngrx/store";
import { TestStore } from "../../../providers/interceptors/auth.interceptor.spec";

describe('Component: TestStationDetailsPage', () => {
  let component: TestStationDetailsPage;
  let fixture: ComponentFixture<TestStationDetailsPage>;
  let callNumber: CallNumber;
  let callNumberSpy: any;
  let openNativeSettings: OpenNativeSettings;
  let openNativeSettingsSpy: any;
  let navParams: NavParams;
  let visitServiceMock: VisitServiceMock;
  let firebase: Firebase;
  let firebaseSpy: any;

  beforeEach(() => {
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);
    firebaseSpy = jasmine.createSpyObj('Firebase', ['logEvent']);

    TestBed.configureTestingModule({
      declarations: [TestStationDetailsPage],
      imports: [
        IonicModule.forRoot(TestStationDetailsPage),
        PipesModule
      ],
      providers: [
        {provide: Firebase, useValue: firebaseSpy},
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: ViewController, useFactory: () => ViewControllerMock.instance()},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        {provide: CallNumber, useValue: callNumberSpy},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: OpenNativeSettings, useValue: openNativeSettingsSpy},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Store, useClass: TestStore}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStationDetailsPage);
    component = fixture.componentInstance;
    navParams = TestBed.get(NavParams);
    visitServiceMock = TestBed.get(VisitService);
    firebase = TestBed.get(Firebase);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'testStation': {} as TestStationReferenceDataModel
      };
      return params[param];
    })
  });

  beforeEach(() => {
    component.testStation = navParams.get('testStation');
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    navParams = null;
    firebase = null;
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test confirmStartVisit', () => {
    visitServiceMock.isError = true;
    component.confirmStartVisit();
    expect(firebase.logEvent).toHaveBeenCalled();
    visitServiceMock.isError = false;
    component.confirmStartVisit();
    expect(component.isNextPageLoading).toBeFalsy();
  });
});
