import { CompleteTestPage } from "./complete-test";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController, NavParams } from "ionic-angular";
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { VehicleModel } from "../../../../models/vehicle.model";
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { HTTPService } from "../../../../providers/global/http.service";
import { AtfService } from "../../../../providers/atf/atf.service";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { DefectsDataMock } from "../../../../../test-config/data-mocks/defects-data.mock";
import { of } from "rxjs/observable/of";

describe('Component: CompleteTestPage', () => {
  let comp: CompleteTestPage;
  let fixture: ComponentFixture<CompleteTestPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let httpService: HTTPService;
  const defectsDataMock = DefectsDataMock.DefectsData;
  let httpServiceSpy: any;

  const addedDefect: DefectDetailsModel = {
    ref: '1.1.a',
    deficiencyCategory: 'Major',
    deficiencyId: 'a',
    deficiencyText: 'missing',
    metadata: {
      category: {
        imNumber: '1',
        imDescription: 'test'
      },
      item: {
        itemNumber: '1',
        itemDescription: 'test2'
      }
    },
    prs: false,
    notes: '',
    location: {
      vertical: '',
      horizontal: '',
      lateral: '',
      longitudinal: '',
      rowNumber: '',
      seatNumber: '',
      axleNumber: ''
    }
  };
  const vehicleTest = new VehicleTestModel('testName', false, new Date(), 12, new Date());
  const vehicle = new VehicleModel('aa12bcd', 'vinRosu', 'psv', 4, 'german', 'cabrio', 123);

  beforeEach(async(() => {
    httpServiceSpy = jasmine.createSpyObj('HTTPService', {
      'getDefects': of(defectsDataMock)
    });

    TestBed.configureTestingModule({
      declarations: [CompleteTestPage],
      imports: [IonicModule.forRoot(CompleteTestPage)],
      providers: [
        NavController,
        DefectsService,
        {provide: HTTPService, useValue: httpServiceSpy},
        {provide: NavParams, useClass: NavParamsMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTestPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    httpService = TestBed.get(HTTPService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'vehicleTest': vehicleTest,
        'vehicle': vehicle
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    httpService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should HTTPService and CompleteTest Component share the same instance',
    inject([HTTPService], (injectService: HTTPService) => {
      expect(injectService).toBe(httpService);
    })
  );

  it('should convert to number', () => {
    const number = '5';
    expect(comp.convertToNumber(number)).toEqual(jasmine.any(Number));
  });

  it('should check if array of defects length is 0 after removing the only addedDefect', () => {
    comp.vehicleTest = navParams.get('vehicleTest');
    expect(comp.vehicleTest.getDefects().length).toBeFalsy();
    comp.vehicleTest.addDefect(addedDefect);
    expect(comp.vehicleTest.getDefects().length).toBeTruthy();
    comp.removeDefect(addedDefect);
    expect(comp.vehicleTest.getDefects().length).toBeFalsy();
  });
});
