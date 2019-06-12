import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { VehicleLookupPage } from "./vehicle-lookup";
import { AlertController, IonicModule, LoadingController, NavController, NavParams } from "ionic-angular";
import { AlertControllerMock, LoadingControllerMock, NavControllerMock } from "ionic-mocks";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { StorageService } from "../../../../providers/natives/storage.service";
import { StorageServiceMock } from "../../../../../test-config/services-mocks/storage-service.mock";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleServiceMock } from "../../../../../test-config/services-mocks/vehicle-service.mock";
import { Firebase } from "@ionic-native/firebase";
import { CallNumber } from "@ionic-native/call-number";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestDataModelMock } from "../../../../assets/data-mocks/data-model/test-data-model.mock";
import { VehicleDataMock } from "../../../../assets/data-mocks/vehicle-data.mock";
import { APP_STRINGS, VEHICLE_TYPE } from "../../../../app/app.enums";

describe('Component: VehicleLookupPage', () => {
  let component: VehicleLookupPage;
  let fixture: ComponentFixture<VehicleLookupPage>;
  let openNativeSettingsSpy: any;

  const TEST_DATA = TestDataModelMock.TestData;
  const VEHICLE = VehicleDataMock.VehicleData;

  beforeEach(async(() => {
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);

    TestBed.configureTestingModule({
      declarations: [VehicleLookupPage],
      imports: [
        IonicModule.forRoot(VehicleLookupPage)
      ],
      providers: [
        Firebase,
        CallNumber,
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        {provide: StorageService, useClass: StorageServiceMock},
        {provide: OpenNativeSettings, useValue: openNativeSettingsSpy},
        {provide: VehicleService, useClass: VehicleServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleLookupPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test ionViewWillEnter lifecycle hook', () => {
    component.testData = TEST_DATA;
    component.testData.vehicles.push(VEHICLE);
    component.ionViewWillEnter();
    expect(component.moreThanOneVehicles).toBeTruthy();
    expect(component.searchPlaceholder).toEqual(APP_STRINGS.REG_NUMBER_TRAILER_ID_OR_VIN);
    component.testData.vehicles[0].techRecord.vehicleType = VEHICLE_TYPE.HGV;
    component.ionViewWillEnter();
    expect(component.searchPlaceholder).toEqual(APP_STRINGS.TRAILER_ID_OR_VIN);
  });
});
