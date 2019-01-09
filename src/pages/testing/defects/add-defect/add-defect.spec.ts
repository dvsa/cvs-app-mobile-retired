import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { AlertController, Events, IonicModule, NavController, NavParams } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { AddDefectPage } from "./add-defect";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { DefectCategoryModel, DefectItemModel } from "../../../../models/reference-data-models/defects.model";
import { DefectsDataMock } from "../../../../assets/data-mocks/reference-data-mocks/defects-data.mock";
import { PipesModule } from "../../../../pipes/pipes.module";
import { VehicleDetailsDataMock } from "../../../../assets/data-mocks/vehicle-details-data.mock";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { TestTypeDataMock } from "../../../../assets/data-mocks/test-type-data.mock";
import { TestTypeModel } from "../../../../models/tests/test-type.model";

describe('Component: AddDefectPage', () => {
  let comp: AddDefectPage;
  let fixture: ComponentFixture<AddDefectPage>;

  let navCtrl: NavController;
  let navParams: NavParams;
  let defectsService: DefectsService;
  let commonFunctionsService: CommonFunctionsService;
  let defectsServiceSpy: any;
  let commonFunctionsServiceSpy: any;

  const vehicleTest: TestTypeModel = TestTypeDataMock.TestTypeData;
  const vehicle: VehicleModel = VehicleDetailsDataMock.VehicleData;
  const category: DefectCategoryModel = DefectsDataMock.DefectsData[0];
  const item: DefectItemModel = DefectsDataMock.DefectsData[0].items[0];


  beforeEach(async(() => {
    defectsServiceSpy = jasmine.createSpyObj('DefectsService', {
      'getBadgeColor': 'danger'
    });

    commonFunctionsServiceSpy = jasmine.createSpyObj('CommonFunctionsService', {
      'capitalizeString': 'Minor'
    });

    TestBed.configureTestingModule({
      declarations: [AddDefectPage],
      imports: [
        PipesModule,
        IonicModule.forRoot(AddDefectPage)
      ],
      providers: [
        NavController,
        AlertController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: DefectsService, useValue: defectsServiceSpy},
        {provide: CommonFunctionsService, useValue: commonFunctionsServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefectPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    defectsService = TestBed.get(DefectsService);
    commonFunctionsService = TestBed.get(CommonFunctionsService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'vehicleTest': vehicle.techRecord[0].vehicleType,
        'vehicleType': vehicleTest,
        'category': category,
        'item': item
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture = null;
    comp = null;
    navCtrl = null;
    navParams = null;
    defectsService = null;
    commonFunctionsService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should DefectsService and AddDefectPage Component share the same instance',
    inject([DefectsService], (injectService: DefectsService) => {
      expect(injectService).toBe(defectsService);
    })
  );

  it('should CommonFunctionsService and AddDefectPage Component share the same instance',
    inject([CommonFunctionsService], (injectService: CommonFunctionsService) => {
      expect(injectService).toBe(commonFunctionsService);
    })
  );

  it('should return the CSS Class', () => {
    expect(comp.returnBadgeClass('Minor')).toBe('badge-text-black')
  })


});
