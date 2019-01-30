import { TestTypesListPage } from "./test-types-list";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { StorageService } from "../../../../providers/natives/storage.service";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { TestTypesReferenceDataMock } from "../../../../assets/data-mocks/reference-data-mocks/test-types.mock";
import { TestTypesReferenceDataModel } from "../../../../models/reference-data-models/test-types.model";
import { PipesModule } from "../../../../pipes/pipes.module";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { TestTypeServiceMock } from "../../../../../test-config/services-mocks/test-type-service.mock";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";

describe('Component: TestTypesListPage', () => {
  let comp: TestTypesListPage;
  let fixture: ComponentFixture<TestTypesListPage>;

  let navCtrl: NavController;
  let navParams: NavParams;
  let testTypeService: TestTypeService;
  let vehicleService: VehicleService;
  let storageServiceSpy: any;
  let vehicleServiceSpy;
  let commonFunctionsService: CommonFunctionsService;

  const testTypes: TestTypesReferenceDataModel[] = TestTypesReferenceDataMock.TestTypesData;
  const vehicle: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;

  beforeEach(async(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => resolve(testTypes))
    });
    vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['createVehicle', 'addTestType', 'removeTestType'])

    TestBed.configureTestingModule({
      declarations: [TestTypesListPage],
      imports: [
        PipesModule,
        IonicModule.forRoot(TestTypesListPage)
      ],
      providers: [
        NavController,
        CommonFunctionsService,
        {provide: TestTypeService, useClass: TestTypeServiceMock},
        {provide: VehicleService, useValue: vehicleServiceSpy},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ViewController, useClass: ViewControllerMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypesListPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    testTypeService = TestBed.get(TestTypeService);
    vehicleService = TestBed.get(VehicleService);
    commonFunctionsService = TestBed.get(CommonFunctionsService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'testTypeReferenceData': null,
        'vehicleData': vehicle
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    testTypeService = null;
    commonFunctionsService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(testTypeService).toBeTruthy();
    expect(vehicleService).toBeTruthy();
  });

  it('should TestTypeService and TestTypesListPage Component share the same instance',
    inject([TestTypeService], (injectService: TestTypeService) => {
      expect(injectService).toBe(testTypeService);
    })
  );
});
