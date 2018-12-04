import { AddPreparerPage } from "./add-preparer";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PreparerService } from "../../../../providers/preparer/preparer.service";
import { IonicModule, NavController } from "ionic-angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { PreparersModel } from "../../../../models/reference-data-models/preparers.model";
import {TestReportService} from "../../../../providers/test-report/test-report.service";


describe('Component: AddPreparerPage', () => {
  let comp: AddPreparerPage;
  let fixture: ComponentFixture<AddPreparerPage>;
  let preparerService: PreparerService;
  let testReportService: TestReportService;
  let navCtrl: NavController;

  const PREPARER_ADDED: PreparersModel = {
    preparerId: "AK4434",
    preparerName: "Durrell Vehicles Limited"
  };

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('PreparerService', ['getPreparersFromStorage, search']);

    TestBed.configureTestingModule({
      declarations: [AddPreparerPage],
      imports: [
        IonicModule.forRoot(AddPreparerPage)
      ],
      providers: [
        NavController,
        TestReportService,
        {provide: PreparerService, useValue: spy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreparerPage);
    comp = fixture.componentInstance;
    preparerService = TestBed.get(PreparerService);
    testReportService = TestBed.get(TestReportService);
    navCtrl = TestBed.get(NavController);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    preparerService = null;
    testReportService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(preparerService).toBeTruthy();
    expect(testReportService).toBeTruthy();
  });

  it('should check if the preparer was added to the testReport object', () => {
    expect(comp.testReport.preparer).toBeFalsy();
    comp.selectPreparer(PREPARER_ADDED);
    expect(testReportService.testReport.preparer).toBeTruthy();
  });

  it('should check the negation function detectFocus', () => {
    comp.searchbarFocus = false;
    expect(comp.searchbarFocus).toBeFalsy();
    comp.detectFocus();
    expect(comp.searchbarFocus).toBeTruthy();
  });
});
