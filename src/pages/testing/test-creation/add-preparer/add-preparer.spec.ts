import { AddPreparerPage } from "./add-preparer";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PreparerService } from "../../../../providers/preparer/preparer.service";
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { TestReportModel } from "../../../../models/test-report.model";
import { VehicleModel } from "../../../../models/vehicle.model";
import { PreparersModel } from "../../../../models/preparers/preparers.model";


describe('Component: AddPreparerPage', () => {
  let comp: AddPreparerPage;
  let fixture: ComponentFixture<AddPreparerPage>;
  let preparerService: PreparerService;
  let navCtrl: NavController;
  let navParams: NavParams;

  let testReport = new TestReportModel();
      testReport.addVehicle(new VehicleModel("AA12 BCD", "123ADF213DAS", "PSV", 3, "IVECO", "1S34RS", 12354));

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
        {provide: PreparerService, useValue: spy},
        {provide: NavParams, useClass: NavParamsMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreparerPage);
    comp = fixture.componentInstance;
    preparerService = TestBed.get(PreparerService);
    navCtrl = TestBed.get(NavController);
  });

  beforeEach(() => {
    navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'testReport': testReport
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    preparerService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(preparerService).toBeTruthy();
  });

  it('should check if the preparer was added to the testReport object', () => {
    comp.testReport = navParams.get('testReport');
    expect(comp.testReport.getPreparer()).toBeFalsy();
    comp.selectPreparer(PREPARER_ADDED);
    expect(comp.testReport.getPreparer()).toBeTruthy();
  });

  it('should check the negation function detectFocus', () => {
    comp.searchbarFocus = false;
    expect(comp.searchbarFocus).toBeFalsy();
    comp.detectFocus();
    expect(comp.searchbarFocus).toBeTruthy();
  });
});
