import { CompleteTestPage } from "./complete-test";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController, NavParams } from "ionic-angular";
import { DefectModel } from "../../../../models/defect.model";
import { DefectLocationModel } from "../../../../models/defect-location.model";
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { VehicleModel } from "../../../../models/vehicle.model";

describe('Component: CompleteTestPage', () => {
  let comp: CompleteTestPage;
  let fixture: ComponentFixture<CompleteTestPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let alertCtrl: AlertController;

  const addedDefect = new DefectModel('1.1 (a)', 'defTxt', 'major', false, '', new DefectLocationModel(), 'defId', 'parDefCat', 1, 'parDefItem', 1);
  const vehicleTest = new VehicleTestModel('testName', false, new Date(), 12, new Date());
  const vehicle = new VehicleModel('aa12bcd', 'vinRosu', 'psv', 4, 'german', 'cabrio', 123);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteTestPage],
      imports: [IonicModule.forRoot(CompleteTestPage)],
      providers: [
        NavController,
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
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'test': vehicleTest,
        'vehicle': vehicle
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should convert to number', () => {
    const number = '5';
    expect(comp.convertToNumber(number)).toEqual(jasmine.any(Number));
  });

  it('should check defects length is decreased by 1',  () => {
    comp.vehicleTest = navParams.get('test');
    expect(comp.vehicleTest.getDefects().length).toBeFalsy();
    comp.vehicleTest.addDefect(addedDefect);
    expect(comp.vehicleTest.getDefects().length).toBeTruthy();
    comp.removeDefect(addedDefect);
    expect(comp.vehicleTest.getDefects().length).toBeFalsy();
  });
});
