import { TestCreatePage } from "./test-create";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { NavController, NavParams, IonicModule } from "ionic-angular";
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { VehicleModel } from "../../../../models/vehicle.model";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestReportModel } from "../../../../models/test-report.model";
import { PhoneService } from "../../../../providers/natives/phone.service";

describe('Component: TestCreatePage', () => {
  let component: TestCreatePage;
  let fixture: ComponentFixture<TestCreatePage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let phoneServiceSpy: any;

  const testReport = new TestReportModel();
  const addedVehicleTest = new VehicleTestModel('testName', false, new Date(), 12, new Date());
  const vehicle = new VehicleModel('aa12bcd', '123456', 'psv', 4, 'german', 'cabrio', 123);

  beforeEach(async(() => {
    phoneServiceSpy = jasmine.createSpyObj('phoneService', ['callPhoneNumber']);

    TestBed.configureTestingModule({
      declarations: [TestCreatePage],
      imports: [IonicModule.forRoot(TestCreatePage)],
      providers: [
        NavController,
        {provide: PhoneService, useValue: phoneServiceSpy},
        {provide: NavParams, useClass: NavParamsMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCreatePage);
    component = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);
    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'testReport': testReport
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should check if array of vehicleTests length is 0 after removing the only addedVehicleTest', () => {
    component.testReport = navParams.get('testReport');
    component.testReport.addVehicle(vehicle);

    const ourVehicleIndex = component.testReport.getVehicles().indexOf(vehicle);
    const ourVehicle = component.testReport.getVehicles()[ourVehicleIndex];

    expect(ourVehicle.getVehicleTests().length).toEqual(0);
    ourVehicle.addVehicleTest(addedVehicleTest);
    expect(ourVehicle.getVehicleTests().length).toEqual(1);

    component.removeVehicleTest(ourVehicle, addedVehicleTest);
    expect(ourVehicle.getVehicleTests().length).toEqual(0);
  });

});
