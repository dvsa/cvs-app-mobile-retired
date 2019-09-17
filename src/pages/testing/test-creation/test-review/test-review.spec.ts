import { TestReviewPage } from "./test-review";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import {
  IonicModule,
  NavController,
  NavParams,
  ViewController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { NavControllerMock, ViewControllerMock, AlertControllerMock, LoadingControllerMock } from "ionic-mocks";
import { StateReformingService } from "../../../../providers/global/state-reforming.service";
import { StateReformingServiceMock } from "../../../../../test-config/services-mocks/state-reforming-service.mock";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleServiceMock } from "../../../../../test-config/services-mocks/vehicle-service.mock";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { StorageService } from "../../../../providers/natives/storage.service";
import { StorageServiceMock } from "../../../../../test-config/services-mocks/storage-service.mock";
import { TestResultService } from "../../../../providers/test-result/test-result.service";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { TestService } from "../../../../providers/test/test.service";
import { TestServiceMock } from "../../../../../test-config/services-mocks/test-service.mock";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { VisitDataMock } from "../../../../assets/data-mocks/visit-data.mock";
import { AuthService } from "../../../../providers/global/auth.service";
import { AuthServiceMock } from "../../../../../test-config/services-mocks/auth-service.mock";
import { Store } from "@ngrx/store";
import { TestStore } from "../../../../providers/interceptors/auth.interceptor.spec";
import { TestResultServiceMock } from "../../../../../test-config/services-mocks/test-result-service.mock";
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";
import { FirebaseLogsServiceMock } from "../../../../../test-config/services-mocks/firebaseLogsService.mock";
import { Firebase } from "@ionic-native/firebase";
import { ActivityService } from "../../../../providers/activity/activity.service";
import { ActivityServiceMock } from "../../../../../test-config/services-mocks/activity-service.mock";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleDataMock } from "../../../../assets/data-mocks/vehicle-data.mock";
import { VEHICLE_TYPE } from "../../../../app/app.enums";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { By } from "../../../../../node_modules/@angular/platform-browser";

describe('Component: TestReviewPage', () => {
  let component: TestReviewPage;
  let fixture: ComponentFixture<TestReviewPage>;
  let visitService: VisitServiceMock;
  let alertCtrl: AlertController;
  let activityServiceMock: ActivityServiceMock;
  let store: Store<any>;
  let commonFuncService: CommonFunctionsService;
  let testService: TestService;
  let vehicleService: VehicleService;
  let vehicle: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;

  const VEHICLE: VehicleModel = VehicleDataMock.VehicleData;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [TestReviewPage],
      imports: [IonicModule.forRoot(TestReviewPage)],
      providers: [
        Firebase,
        CommonFunctionsService,
        OpenNativeSettings,
        DefectsService,
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        {provide: ActivityService, useClass: ActivityServiceMock},
        {provide: TestResultService, useClass: TestResultServiceMock},
        {provide: TestService, useClass: TestServiceMock},
        {provide: StorageService, useClass: StorageServiceMock},
        {provide: ViewController, useFactory: () => ViewControllerMock.instance()},
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: StateReformingService, useClass: StateReformingServiceMock},
        {provide: VehicleService, useClass: VehicleServiceMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Store, useClass: TestStore},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: FirebaseLogsService, useClass: FirebaseLogsServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReviewPage);
    component = fixture.componentInstance;
    visitService = TestBed.get(VisitService);
    alertCtrl = TestBed.get(AlertController);
    activityServiceMock = TestBed.get(ActivityService);
    store = TestBed.get(Store);
    commonFuncService = TestBed.get(CommonFunctionsService);
    testService = TestBed.get(TestService);
    vehicleService = TestBed.get(VehicleService);
  });

  beforeEach(() => {
    spyOn(window.localStorage, 'getItem').and.callFake(function () {
      return JSON.stringify({"test": "test"});
    });
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    alertCtrl = null;
    visitService = null;
    activityServiceMock = null;
    store = null;
    commonFuncService = null;
    testService = null;
    vehicleService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
    expect(component.roadworthinessTestTypesIds.length).toEqual(5);
  });

  it('should check the ngOnInit logic', () => {
    component.ngOnInit();
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });

  it('should test submitting a test', () => {
    visitService.visit = VisitDataMock.VisitData;
    component.submit(VisitDataMock.VisitTestData);
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should test submitting a test - error case on submitActivity', () => {
    spyOn(store, 'dispatch');
    visitService.visit = VisitDataMock.VisitData;
    activityServiceMock.isSubmitError = true;
    component.submit(VisitDataMock.VisitTestData);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should test getCountryStringToBeDisplayed', () => {
    spyOn(commonFuncService, 'getCountryStringToBeDisplayed');
    component.getCountryStringToBeDisplayed(VEHICLE);
    expect(commonFuncService.getCountryStringToBeDisplayed).toHaveBeenCalled();
  });

  it('should verify that the vehicle type is one of the specified types', () => {
    let vehicle = Object.create(VehicleDataMock.VehicleData);
    expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.PSV)).toBeTruthy();
    expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.PSV, VEHICLE_TYPE.TRL, VEHICLE_TYPE.HGV)).toBeTruthy();
  });

  it('should verify that the vehicle type is not one of specified types', () => {
    let vehicle = Object.create(VehicleDataMock.VehicleData);
    expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.TRL)).toBeFalsy();
    expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.TRL, VEHICLE_TYPE.HGV)).toBeFalsy();
  });

  it('display the submit button if the currently reviewed vehicle is the last one', () => {
    let newTest = testService.createTest();
    let firstVehicle = vehicleService.createVehicle(vehicle);
    let secondVehicle = vehicleService.createVehicle(vehicle);
    newTest.vehicles.push(firstVehicle);
    newTest.vehicles.push(secondVehicle)
    firstVehicle.testTypes = [];
    firstVehicle.countryOfRegistration = 'United Kingdom';
    firstVehicle.euVehicleCategory = 'm1';
    firstVehicle.odometerReading = '122';

    secondVehicle.testTypes = [];
    secondVehicle.countryOfRegistration = 'United Kingdom';
    secondVehicle.euVehicleCategory = 'm2';
    secondVehicle.odometerReading = '123';

    component.latestTest = newTest;
    component.vehicleBeingReviewed = component.latestTest.vehicles.length - 1;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let submitButton = fixture.debugElement.query(By.css('.footer-cta-section>button'));
      expect(component.nextButtonText).toBe("Submit tests");
      submitButton.nativeElement.dispatchEvent(new Event('click'));
      expect(component.submitTest).toHaveBeenCalled();
    });
  });
});
