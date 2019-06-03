import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VehicleDetailsPage } from "./vehicle-details";
import { AlertController, IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { NavControllerMock } from "../../../../../test-config/ionic-mocks/nav-controller.mock";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AlertControllerMock, ViewControllerMock } from "ionic-mocks";
import { StorageService } from "../../../../providers/natives/storage.service";
import { StorageServiceMock } from "../../../../../test-config/services-mocks/storage-service.mock";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { CallNumber } from "@ionic-native/call-number";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { TestTypeArrayDataMock } from "../../../../assets/data-mocks/test-type-array-data.mock";
import { PipesModule } from "../../../../pipes/pipes.module";
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";
import { FirebaseLogsServiceMock } from "../../../../../test-config/services-mocks/firebaseLogsService.mock";

describe('Component: VehicleDetailsPage', () => {
  let component: VehicleDetailsPage;
  let fixture: ComponentFixture<VehicleDetailsPage>;
  let navParams: NavParams;
  let commonFunctionsService: CommonFunctionsService;
  let callNumberSpy: any;
  let firebaseLogsService: FirebaseLogsService;
  let alertCtrl: AlertController;


  const VEHICLE: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
  let test = TestTypeArrayDataMock.TestTypeArrayData[0];

  beforeEach(() => {
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);

    TestBed.configureTestingModule({
      declarations: [VehicleDetailsPage],
      imports: [
        IonicModule.forRoot(VehicleDetailsPage),
        PipesModule
      ],
      providers: [
        CommonFunctionsService,
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ViewController, useFactory: () => ViewControllerMock.instance()},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: StorageService, useClass: StorageServiceMock},
        {provide: CallNumber, useValue: callNumberSpy},
        {provide: FirebaseLogsService, useClass: FirebaseLogsServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsPage);
    component = fixture.componentInstance;
    navParams = TestBed.get(NavParams);
    commonFunctionsService = TestBed.get(CommonFunctionsService);
    alertCtrl = TestBed.get(AlertController);
    firebaseLogsService = TestBed.get(FirebaseLogsService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'vehicle': VEHICLE,
        'test': test,
        'fromTestCreatePage': true
      };
      return params[param];
    });

    component.vehicleData = navParams.get('vehicle');
    component.testData = navParams.get('test');
    component.fromTestCreatePage = navParams.get('fromTestCreatePage');
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    navParams = null;
    commonFunctionsService = null;
    firebaseLogsService = null;
    alertCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('Should check if logEvent was called in ionViewDidEnter', () => {
    spyOn(firebaseLogsService, 'logEvent');
    component.ionViewDidEnter();
    expect(firebaseLogsService.logEvent).toHaveBeenCalled();
  });

  it('should check if alertCtrl was called', () => {
    component.goToPreparerPage();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should check if logEvent was called', () => {
    spyOn(firebaseLogsService, 'logEvent');
    component.loggingInAlertHandler();
    expect(firebaseLogsService.logEvent).toHaveBeenCalled();
  });
});
