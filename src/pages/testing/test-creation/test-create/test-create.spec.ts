import { TestCreatePage } from "./test-create";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { NavController, NavParams, IonicModule } from "ionic-angular";
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestReportModel } from "../../../../models/tests/test-report.model";
import { PhoneService } from "../../../../providers/natives/phone.service";
import { TestReportService } from "../../../../providers/test-report/test-report.service";
import { VehicleDataMock } from "../../../../assets/data-mocks/vehicle-data.mock";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";

describe('Component: TestCreatePage', () => {
  let component: TestCreatePage;
  let fixture: ComponentFixture<TestCreatePage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let phoneServiceSpy: any;
  let testReportServiceSpy: any;
  let vehicleService: VehicleService

  const testReport: TestReportModel = {
    startTime: null,
    endTime: null,
    testStatus: null,
    cancellationReason: '',
    vehicles: [],
    preparer: null
  };

  const addedVehicleTest = new VehicleTestModel('testName', false, new Date(), 12, new Date());
  let vehicle: VehicleModel = VehicleDataMock.VehicleData;

  beforeEach(async(() => {
    phoneServiceSpy = jasmine.createSpyObj('phoneService', ['callPhoneNumber']);
    testReportServiceSpy = jasmine.createSpyObj('testReportService', {'getTestReport': testReport});

    TestBed.configureTestingModule({
      declarations: [TestCreatePage],
      imports: [IonicModule.forRoot(TestCreatePage)],
      providers: [
        NavController,
        VehicleService,
        {provide: PhoneService, useValue: phoneServiceSpy},
        {provide: TestReportService, useValue: testReportServiceSpy},
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
    vehicleService = TestBed.get(VehicleService);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    vehicleService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should check if array of vehicleTests length is 0 after removing the only addedVehicleTest', () => {
    component.ngOnInit();
    component.testReport.vehicles.push(vehicle);

    const ourVehicleIndex = component.testReport.vehicles.indexOf(vehicle);
    const ourVehicle = component.testReport.vehicles[ourVehicleIndex];
    let newVehicle = vehicleService.createVehicle(ourVehicle);

    expect(newVehicle.vehicleTests.length).toEqual(0);
    vehicleService.addVehicleTest(newVehicle, addedVehicleTest);
    expect(newVehicle.vehicleTests.length).toEqual(1);
    vehicleService.removeVehicleTest(newVehicle, addedVehicleTest);
    expect(newVehicle.vehicleTests.length).toEqual(0);
  });

  it('should say either a test is abandoned or not', () => {
    expect(component.isTestAbandoned(addedVehicleTest)).toBeFalsy();
    addedVehicleTest.addAbandonmentReasons(['Best reason']);
    addedVehicleTest.addAdditionalAbandonmentReason('Additional comment');
    expect(component.isTestAbandoned(addedVehicleTest)).toBeTruthy();
  });

});
