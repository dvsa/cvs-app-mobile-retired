import { TestStationDetailsPage } from "./test-station-details";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams, AlertController, ViewController, LoadingController } from "ionic-angular";
import { PipesModule } from "../../../pipes/pipes.module";
import { NavControllerMock, AlertControllerMock, ViewControllerMock, LoadingControllerMock } from "ionic-mocks";
import { CallNumber } from "@ionic-native/call-number";
import { VisitService } from "../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../test-config/services-mocks/visit-service.mock";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestStationReferenceDataModel } from "../../../models/reference-data-models/test-station.model";
import { NavParamsMock } from "../../../../test-config/ionic-mocks/nav-params.mock";

describe('Component: TestStationDetailsPage', () => {
  let component: TestStationDetailsPage;
  let fixture: ComponentFixture<TestStationDetailsPage>;
  let callNumber: CallNumber;
  let callNumberSpy: any;
  let openNativeSettings: OpenNativeSettings;
  let openNativeSettingsSpy: any;
  let navParams: NavParams;
  let visitServiceMock: VisitServiceMock;

  beforeEach(() => {
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);

    TestBed.configureTestingModule({
      declarations: [TestStationDetailsPage],
      imports: [
        IonicModule.forRoot(TestStationDetailsPage),
        PipesModule
      ],
      providers: [
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: ViewController, useFactory: () => ViewControllerMock.instance()},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        {provide: CallNumber, useValue: callNumberSpy},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: OpenNativeSettings, useValue: openNativeSettingsSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStationDetailsPage);
    component = fixture.componentInstance;
    navParams = TestBed.get(NavParams);
    visitServiceMock = TestBed.get(VisitService);
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
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test confirmStartVisit', () => {
    visitServiceMock.isError = true;
    component.confirmStartVisit();
    visitServiceMock.isError = false;
    component.confirmStartVisit();
    expect(component.isNextPageLoading).toBeFalsy();
  });
});
