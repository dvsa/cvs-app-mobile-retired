import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { StorageService } from "../../../../providers/natives/storage.service";
import { TestTypesListPage } from "./test-types-list";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { TestTypesDataMock } from "../../../../assets/data-mocks/reference-data-mocks/test-types.mock";
import { TestTypesModel } from "../../../../models/reference-data-models/test-types.model";
import { PipesModule } from "../../../../pipes/pipes.module";
import { VehicleDetailsDataMock } from "../../../../assets/data-mocks/vehicle-details-data.mock";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";

describe('Component: TestTypesListPage', () => {
  let comp: TestTypesListPage;
  let fixture: ComponentFixture<TestTypesListPage>;

  let navCtrl: NavController;
  let navParams: NavParams;
  let testTypeService: TestTypeService;
  let vehicleService: VehicleService;
  let storageServiceSpy: any;
  let vehicleServiceSpy;

  const testTypes: TestTypesModel[] = TestTypesDataMock.TestTypesData;
  const vehicle: VehicleModel = VehicleDetailsDataMock.VehicleData;

  beforeEach(async(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => resolve(testTypes))
    });
    vehicleServiceSpy = jasmine.createSpyObj('vehicleService', ['createVehicle', 'addTestType', 'removeTestType'])

    TestBed.configureTestingModule({
      declarations: [TestTypesListPage],
      imports: [
        PipesModule,
        IonicModule.forRoot(TestTypesListPage)
      ],
      providers: [
        NavController,
        TestTypeService,
        {provide: VehicleService, useValue: vehicleServiceSpy},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: StorageService, useValue: storageServiceSpy}
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
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(testTypeService).toBeTruthy();
  });

  it('should TestTypeService and TestTypesListPage Component share the same instance',
    inject([TestTypeService], (injectService: TestTypeService) => {
      expect(injectService).toBe(testTypeService);
    })
  );
});
