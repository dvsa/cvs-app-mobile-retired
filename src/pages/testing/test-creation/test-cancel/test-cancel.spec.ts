import { IonicModule, NavController, NavParams } from "ionic-angular";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestCancelPage } from "./test-cancel";
import { TestService } from "../../../../providers/test/test.service";
import { TestModel } from "../../../../models/tests/test.model";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { VisitDataMock } from "../../../../assets/data-mocks/visit-data.mock";
import { TestResultService } from "../../../../providers/test-result/test-result.service";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";

describe('Component: TestCancelPage', () => {
  let component: TestCancelPage;
  let fixture: ComponentFixture<TestCancelPage>;
  let navCtrl: NavController;
  let testReportServiceSpy: any;
  let testResultServiceSpy: any;
  let openNativeSettingsSpy: any;
  let visitService: VisitService;

  const testReport: TestModel = {
    startTime: null,
    endTime: null,
    status: null,
    reasonForCancellation: '',
    vehicles: [],
  };

  beforeEach(async(() => {
    testReportServiceSpy = jasmine.createSpyObj('testReportService', {'getTestReport': testReport});
    testResultServiceSpy = jasmine.createSpyObj('testResultService', ['createTestResult']);
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', [{
      'open': new Promise(() => {
        return true
      })
    }]);

    TestBed.configureTestingModule({
      declarations: [TestCancelPage],
      imports: [IonicModule.forRoot(TestCancelPage)],
      providers: [
        NavController,
        {provide: OpenNativeSettings, useValue: openNativeSettingsSpy},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: TestService, useValue: testReportServiceSpy},
        {provide: TestResultService, useValue: testResultServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCancelPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    visitService = TestBed.get(VisitService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'test': VisitDataMock.VisitTestData,
      };
      return params[param];
    })
  })

  afterEach(() => {
    fixture.destroy();
    component = null;
    visitService = null;
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

});
