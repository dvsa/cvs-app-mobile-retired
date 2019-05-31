import {IonicModule, NavController, NavParams, AlertController, LoadingController} from "ionic-angular";
import {async, ComponentFixture, inject, TestBed} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {TestCancelPage} from "./test-cancel";
import {TestService} from "../../../../providers/test/test.service";
import {TestModel} from "../../../../models/tests/test.model";
import {VisitService} from "../../../../providers/visit/visit.service";
import {VisitServiceMock} from "../../../../../test-config/services-mocks/visit-service.mock";
import {NavParamsMock} from "../../../../../test-config/ionic-mocks/nav-params.mock";
import {VisitDataMock} from "../../../../assets/data-mocks/visit-data.mock";
import {TestResultService} from "../../../../providers/test-result/test-result.service";
import {OpenNativeSettings} from "@ionic-native/open-native-settings";
import {AlertControllerMock, LoadingControllerMock, NavControllerMock} from "ionic-mocks";
import {AuthService} from "../../../../providers/global/auth.service";
import {AuthServiceMock} from "../../../../../test-config/services-mocks/auth-service.mock";
import {Store} from "@ngrx/store";
import {TestStore} from "../../../../providers/interceptors/auth.interceptor.spec";
import {TestResultServiceMock} from "../../../../../test-config/services-mocks/test-result-service.mock";
import {FirebaseLogsService} from "../../../../providers/firebase-logs/firebase-logs.service";
import {FirebaseLogsServiceMock} from "../../../../../test-config/services-mocks/firebaseLogsService.mock";

describe('Component: TestCancelPage', () => {
  let component: TestCancelPage;
  let fixture: ComponentFixture<TestCancelPage>;
  let navCtrl: NavController;
  let testReportServiceSpy: any;
  let openNativeSettingsSpy: any;
  let visitService: VisitService;
  let alertCtrl: AlertController;

  const testReport: TestModel = {
    startTime: null,
    endTime: null,
    status: null,
    reasonForCancellation: '',
    vehicles: [],
  };

  beforeEach(async(() => {
    testReportServiceSpy = jasmine.createSpyObj('testReportService', {'getTestReport': testReport});
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', [{
      'open': new Promise(() => {
        return true
      })
    }]);

    TestBed.configureTestingModule({
      declarations: [TestCancelPage],
      imports: [IonicModule.forRoot(TestCancelPage)],
      providers: [
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: FirebaseLogsService, useClass: FirebaseLogsServiceMock},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        {provide: OpenNativeSettings, useValue: openNativeSettingsSpy},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: TestService, useValue: testReportServiceSpy},
        {provide: TestResultService, useClass: TestResultServiceMock},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Store, useClass: TestStore}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCancelPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    visitService = TestBed.get(VisitService);
    alertCtrl = TestBed.get(AlertController);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'test': VisitDataMock.VisitTestData,
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    visitService = null;
    alertCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should VisitService and TestCancelPage Component share the same instance',
    inject([VisitService], (injectService: VisitService) => {
      expect(injectService).toBe(visitService);
    })
  );

  it('should verify either a string is valid or not', () => {
    component.cancellationReason = ' ';
    expect(component.isValidReason()).toBeFalsy();
    component.cancellationReason = 'reason';
    expect(component.isValidReason()).toBeTruthy();
  });

  it('should test submitting a test', () => {
    component.submit(VisitDataMock.VisitTestData);
    expect(alertCtrl.create).toHaveBeenCalled();
  });
});
