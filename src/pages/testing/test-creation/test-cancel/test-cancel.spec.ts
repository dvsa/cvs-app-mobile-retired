import { IonicModule, NavController } from "ionic-angular";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestCancelPage } from "./test-cancel";
import { TestReportModel } from "../../../../models/tests/test-report.model";
import { TestReportService } from "../../../../providers/test-report/test-report.service";

describe('Component: TestCancelPage', () => {
  let component: TestCancelPage;
  let fixture: ComponentFixture<TestCancelPage>;
  let navCtrl: NavController;
  let testReportServiceSpy: any;

  const testReport: TestReportModel = {
    startTime: null,
    endTime: null,
    testStatus: null,
    cancellationReason: '',
    vehicles: [],
    preparer: null
  };

  beforeEach(async(() => {
    testReportServiceSpy = jasmine.createSpyObj('testReportService', {'getTestReport': testReport});

    TestBed.configureTestingModule({
      declarations: [TestCancelPage],
      imports: [IonicModule.forRoot(TestCancelPage)],
      providers: [
        NavController,
        {provide: TestReportService, useValue: testReportServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCancelPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should verify either a string is valid or not', () => {
    component.cancellationReason = ' ';
    expect(component.isValidReason()).toBeFalsy();
    component.cancellationReason = 'reason';
    expect(component.isValidReason()).toBeTruthy();
  });

});