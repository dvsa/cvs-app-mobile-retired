import { TestCreatePage } from "./test-create";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams, AlertController, Events } from "ionic-angular";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../../../assets/data-mocks/data-model/test-type-data-model.mock";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ODOMETER_METRIC, VEHICLE_TYPE } from "../../../../app/app.enums";
import { TestModel } from "../../../../models/tests/test.model";
import { TestService } from "../../../../providers/test/test.service";
import { TestServiceMock } from "../../../../../test-config/services-mocks/test-service.mock";
import { VehicleServiceMock } from "../../../../../test-config/services-mocks/vehicle-service.mock";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { StateReformingService } from "../../../../providers/global/state-reforming.service";
import { StateReformingServiceMock } from "../../../../../test-config/services-mocks/state-reforming-service.mock";
import { VisitDataMock } from "../../../../assets/data-mocks/visit-data.mock";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { CallNumber } from "@ionic-native/call-number";
import { AppService } from "../../../../providers/global/app.service";
import { AppServiceMock } from "../../../../../test-config/services-mocks/app-service.mock";
import { Firebase } from "@ionic-native/firebase";
import { AlertControllerMock } from "ionic-mocks";
import { TestDataModelMock } from "../../../../assets/data-mocks/data-model/test-data-model.mock";
import { VehicleDataMock } from "../../../../assets/data-mocks/vehicle-data.mock";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { TestTypeServiceMock } from "../../../../../test-config/services-mocks/test-type-service.mock";

describe('Component: TestCreatePage', () => {
  let component: TestCreatePage;
  let fixture: ComponentFixture<TestCreatePage>;
  let navCtrl: NavController;
  let navCtrlSpy: any;
  let navParams: NavParams;
  let vehicleService: VehicleService;
  let visitService: VisitService;
  let appService: AppService;
  let testService: TestService;
  let stateReformingService: StateReformingService;
  let callNumberSpy: any;
  let commonFuncService: CommonFunctionsService;

  const testReport: TestModel = {
    startTime: null,
    endTime: null,
    status: null,
    reasonForCancellation: '',
    vehicles: [],
  };

  const ADDED_VEHICLE_TEST: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  let vehicle: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
  const TEST_DATA = TestDataModelMock.TestData;
  const VEHICLE = VehicleDataMock.VehicleData;

  beforeEach(async(() => {
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callPhoneNumber']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['push']);

    TestBed.configureTestingModule({
      declarations: [TestCreatePage],
      imports: [IonicModule.forRoot(TestCreatePage)],
      providers: [
        Firebase,
        CommonFunctionsService,
        Events,
        {provide: NavController, useValue: navCtrlSpy},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: AppService, useClass: AppServiceMock},
        {provide: CallNumber, useValue: callNumberSpy},
        {provide: StateReformingService, useClass: StateReformingServiceMock},
        {provide: VehicleService, useClass: VehicleServiceMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: TestService, useClass: TestServiceMock},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: TestTypeService, useClass: TestTypeServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestCreatePage);
    component = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    vehicleService = TestBed.get(VehicleService);
    testService = TestBed.get(TestService);
    appService = TestBed.get(AppService);
    visitService = TestBed.get(VisitService);
    stateReformingService = TestBed.get(StateReformingService);
    commonFuncService = TestBed.get(CommonFunctionsService);
  }));

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
    testService = null;
    vehicleService = null;
    visitService = null;
    stateReformingService = null;
    navCtrl = null;
    commonFuncService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test ionViewWillEnter lifecycle hook', () => {
    component.testData = TEST_DATA;
    component.testData.vehicles.push(VEHICLE);
    component.ionViewWillEnter();
    expect(component.displayAddVehicleButton).toBeFalsy();
    component.testData.vehicles[0].techRecord.vehicleType = VEHICLE_TYPE.HGV;
    component.ionViewWillEnter();
    expect(component.displayAddVehicleButton).toBeTruthy();
  });

  it('should say either a test is abandoned or not', () => {
    expect(component.isTestAbandoned(ADDED_VEHICLE_TEST)).toBeFalsy();
    ADDED_VEHICLE_TEST.reasons.push('Best reason');
    ADDED_VEHICLE_TEST.additionalCommentsForAbandon = 'Additional comment';
    expect(component.isTestAbandoned(ADDED_VEHICLE_TEST)).toBeTruthy();
  });

  it('should say either a test has odometer data or not', () => {
    let newTest = testService.createTest();
    let newVehicle = vehicleService.createVehicle(vehicle);
    newTest.vehicles.push(newVehicle);
    component.testData = newTest;

    expect(component.doesOdometerDataExist(0)).toBeFalsy();
    newTest.vehicles[0].odometerReading = '1234';
    newTest.vehicles[0].odometerMetric = ODOMETER_METRIC.MILES;
    expect(component.doesOdometerDataExist(0)).toBeTruthy();
  });

  it('should return correctly formatted string of odometer data', () => {
    let newTest = testService.createTest();
    let newVehicle = vehicleService.createVehicle(vehicle);
    newTest.vehicles.push(newVehicle);
    component.testData = newTest;

    newTest.vehicles[0].odometerReading = '1234';
    newTest.vehicles[0].odometerMetric = ODOMETER_METRIC.MILES;

    expect(component.getOdometerStringToBeDisplayed(0)).toEqual('1,234 mi');
  });

  it('should return the test type status to be displayed', () => {
    expect(component.getTestTypeStatus(ADDED_VEHICLE_TEST)).toEqual('In progress');
    ADDED_VEHICLE_TEST.numberOfSeatbeltsFitted = 2;
    ADDED_VEHICLE_TEST.seatbeltInstallationCheckDate = true;
    ADDED_VEHICLE_TEST.lastSeatbeltInstallationCheckDate = '19-01-2019';
    expect(component.getTestTypeStatus(ADDED_VEHICLE_TEST)).toEqual('Edit');
    ADDED_VEHICLE_TEST.testTypeId = '40';
    ADDED_VEHICLE_TEST.testResult = null;
    expect(component.getTestTypeStatus(ADDED_VEHICLE_TEST)).toEqual('Edit');
  });

  it('should not allow to review a test because not all mandatory fields completed', () => {
    let newTest = testService.createTest();
    let newVehicle = vehicleService.createVehicle(vehicle);
    vehicleService.addTestType(newVehicle, ADDED_VEHICLE_TEST);
    newTest.vehicles.push(newVehicle);
    component.testData = newTest;

    component.reviewTest();
  });

  it('should not allow to review a test because no testType added', () => {
    let newTest = testService.createTest();
    let newVehicle = vehicleService.createVehicle(vehicle);
    newTest.vehicles.push(newVehicle);
    newVehicle.testTypes = [];
    newVehicle.countryOfRegistration = 'United Kingdom';
    newVehicle.euVehicleCategory = 'm1';
    newVehicle.odometerReading = '122';
    component.testData = newTest;

    component.reviewTest();
  });

  it('should test getCountryStringToBeDisplayed', () => {
    spyOn(commonFuncService, 'getCountryStringToBeDisplayed');
    component.getCountryStringToBeDisplayed(VEHICLE);
    expect(commonFuncService.getCountryStringToBeDisplayed).toHaveBeenCalled();
  });

  it('should check if navCtrl.push was called', () => {
    let tests = [];
    tests.push(testService.createTest());
    component.addTrailer(tests);
    expect(navCtrl.push).toHaveBeenCalled();
  });
});
