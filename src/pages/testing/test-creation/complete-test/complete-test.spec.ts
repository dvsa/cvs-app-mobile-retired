import { CompleteTestPage } from "./complete-test";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController, NavParams } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { DefectsDataMock } from "../../../../assets/data-mocks/reference-data-mocks/defects-data.mock";
import { StorageService } from "../../../../providers/natives/storage.service";
import { DefectCategoryModel } from "../../../../models/reference-data-models/defects.model";
import { DEFICIENCY_CATEGORY } from "../../../../app/app.enums";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../../../assets/data-mocks/data-model/test-type-data-model.mock";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";

describe('Component: CompleteTestPage', () => {
  let comp: CompleteTestPage;
  let fixture: ComponentFixture<CompleteTestPage>;

  let navCtrl: NavController;
  let navParams: NavParams;
  let defectsService: DefectsService;
  let alertCtrl: AlertController;
  let storageServiceSpy: any;
  let visitService: VisitService;

  const defects: DefectCategoryModel[] = DefectsDataMock.DefectsData
  const addedDefect: DefectDetailsModel = {
    ref: '1.1.a',
    deficiencyCategory: DEFICIENCY_CATEGORY.MAJOR,
    deficiencyId: 'a',
    deficiencyText: 'missing',
    metadata: {
      category: {
        imNumber: 1,
        imDescription: 'test'
      },
      item: {
        itemNumber: 1,
        itemDescription: 'test2'
      }
    },
    prs: false,
    notes: '',
    location: {
      vertical: '',
      horizontal: '',
      lateral: '',
      longitudinal: '',
      rowNumber: null,
      seatNumber: null,
      axleNumber: null
    }
  };

  const vehicleTest: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const vehicle: VehicleModel = TechRecordDataMock.VehicleData;

  beforeEach(async(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => resolve(defects))
    });

    TestBed.configureTestingModule({
      declarations: [CompleteTestPage],
      imports: [IonicModule.forRoot(CompleteTestPage)],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: VisitService, useClass: VisitServiceMock},
        DefectsService,
        TestTypeService,
        AlertController,
        {provide: StorageService, useValue: storageServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTestPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    defectsService = TestBed.get(DefectsService);
    alertCtrl = TestBed.get(AlertController);
    visitService = TestBed.get(VisitService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'vehicleTest': vehicleTest,
        'vehicle': vehicle
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    visitService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should VisitService and Root Component share the same instance',
    inject([VisitService], (injectService: VisitService) => {
      expect(injectService).toBe(visitService);
    })
  );

  it('should convert to number', () => {
    const number = '5';
    expect(comp.convertToNumber(number)).toEqual(jasmine.any(Number));
  });

  it('should check if array of defects length is 0 after removing the only addedDefect', () => {
    comp.vehicleTest = navParams.get('vehicleTest');
    expect(comp.vehicleTest.defects.length).toBeFalsy();
    comp.vehicleTest.defects.push(addedDefect);
    expect(comp.vehicleTest.defects.length).toBeTruthy();
    comp.removeDefect(addedDefect);
    expect(comp.vehicleTest.defects.length).toBeFalsy();
  });
});
