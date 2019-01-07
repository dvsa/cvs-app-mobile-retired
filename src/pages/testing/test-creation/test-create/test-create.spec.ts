import { TestCreatePage } from "./test-create";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { NavController, NavParams, IonicModule } from "ionic-angular";
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestReportModel } from "../../../../models/tests/test-report.model";
import { PhoneService } from "../../../../providers/natives/phone.service";
import { TestReportService } from "../../../../providers/test-report/test-report.service";
import { VehicleDetailsDataMock } from "../../../../assets/data-mocks/vehicle-details-data.mock";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { ODOMETER_METRIC } from "../../../../app/app.enums";

describe('Component: TestCreatePage', () => {
  let component: TestCreatePage;
  let fixture: ComponentFixture<TestCreatePage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let vehicleService;

  let phoneServiceSpy: any;
  let testReportServiceSpy: any;
  let vehicleServiceSpy: any;

  const testReport: TestReportModel = {
    startTime: null,
    endTime: null,
    testStatus: null,
    cancellationReason: '',
    vehicles: [],
    preparer: null
  };

  const addedVehicleTest = new VehicleTestModel('testName', false, new Date(), 12, new Date());
  let vehicle: VehicleModel = VehicleDetailsDataMock.VehicleData;

  beforeEach(async(() => {
    phoneServiceSpy = jasmine.createSpyObj('phoneService', ['callPhoneNumber']);
    testReportServiceSpy = jasmine.createSpyObj('testReportService', {'getTestReport': testReport});
    vehicleServiceSpy = jasmine.createSpyObj('vehicleService', ['createVehicle', 'addTestType', 'removeTestType'])


    TestBed.configureTestingModule({
      declarations: [TestCreatePage],
      imports: [IonicModule.forRoot(TestCreatePage)],
      providers: [
        NavController,
        {provide: VehicleService, useValue: vehicleServiceSpy},
        {provide: PhoneService, useValue: phoneServiceSpy},
        {provide: TestReportService, useValue: testReportServiceSpy},
        {provide: NavParams, useClass: NavParamsMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestCreatePage);
    component = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    vehicleService = TestBed.get(VehicleService);
  }));

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should say either a test is abandoned or not', () => {
    expect(component.isTestAbandoned(addedVehicleTest)).toBeFalsy();
    addedVehicleTest.addAbandonmentReasons(['Best reason']);
    addedVehicleTest.addAdditionalAbandonmentReason('Additional comment');
    expect(component.isTestAbandoned(addedVehicleTest)).toBeTruthy();
  });

  it('should say either a test has odometer data or not', () => {
    component.ngOnInit();
    component.testReport.vehicles.push(vehicle);

    expect(component.doesOdometerDataExist(0)).toBeFalsy();
    component.testReport.vehicles[0].odometerReading = '1234';
    component.testReport.vehicles[0].odometerMetric = ODOMETER_METRIC.MILES;
    expect(component.doesOdometerDataExist(0)).toBeTruthy();
  });

  it('should return correctly formatted string of odometer data', () => {
    component.ngOnInit();
    component.testReport.vehicles.push(vehicle);
    component.testReport.vehicles[0].odometerReading = '1234';
    component.testReport.vehicles[0].odometerMetric = ODOMETER_METRIC.MILES;

    expect(component.getOdometerStringToBeDisplayed(0)).toEqual('1,234 mi');
  });

});
