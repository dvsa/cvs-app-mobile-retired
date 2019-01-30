import { AddDefectPage } from "./add-defect";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController, NavParams } from "ionic-angular";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../../../assets/data-mocks/data-model/test-type-data-model.mock";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { DefectsReferenceDataMock } from "../../../../assets/data-mocks/reference-data-mocks/defects-data.mock";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { PipesModule } from "../../../../pipes/pipes.module";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DefectCategoryReferenceDataModel, DefectItemReferenceDataModel } from "../../../../models/reference-data-models/defects.reference-model";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";

describe('Component: AddDefectPage', () => {
  let comp: AddDefectPage;
  let fixture: ComponentFixture<AddDefectPage>;

  let navCtrl: NavController;
  let navParams: NavParams;
  let defectsService: DefectsService;
  let commonFunctionsService: CommonFunctionsService;
  let defectsServiceSpy: any;
  let commonFunctionsServiceSpy: any;

  const VEHICLE_TEST: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const VEHICLE_TECH_RECORD: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
  const CATEGORY: DefectCategoryReferenceDataModel = DefectsReferenceDataMock.DefectDataCategory;
  const ITEM: DefectItemReferenceDataModel = DefectsReferenceDataMock.DefectsDataItem;


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
        'vehicleTest': VEHICLE_TECH_RECORD.techRecord[0].vehicleType,
        'vehicleType': VEHICLE_TEST,
        'category': CATEGORY,
        'item': ITEM
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
