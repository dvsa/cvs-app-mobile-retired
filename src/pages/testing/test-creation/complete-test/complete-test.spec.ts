import { CompleteTestPage } from "./complete-test";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController, NavParams } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { DefectsDataMock } from "../../../../assets/data-mocks/reference-data-mocks/defects-data.mock";
import { DefectCategoryModel } from "../../../../models/reference-data-models/defects.model";
import { DEFICIENCY_CATEGORY } from "../../../../app/app.enums";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../../../assets/data-mocks/data-model/test-type-data-model.mock";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { TestTypeMetadataMock } from "../../../../assets/data-mocks/data-model/test-type-metadata.mock";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleServiceMock } from "../../../../../test-config/services-mocks/vehicle-service.mock";
import { of } from "rxjs/observable/of";
import { TestTypesServiceMock } from "../../../../../test-config/services-mocks/test-types-service.mock";

describe('Component: CompleteTestPage', () => {
  let comp: CompleteTestPage;
  let fixture: ComponentFixture<CompleteTestPage>;

  let navCtrl: NavController;
  let navParams: NavParams;
  let defectsService: DefectsService;
  let alertCtrl: AlertController;
  let defectsServiceSpy: any;
  let visitService: VisitService;
  let vehicleService: VehicleService;

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

  const testTypeMetadata = TestTypeMetadataMock.TestTypeMetadata;
  const vehicleTest: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const vehicle: VehicleModel = TechRecordDataMock.VehicleData;

  beforeEach(async(() => {
    defectsServiceSpy = jasmine.createSpyObj('DefectsService', {
      'getDefectsFromStorage': of(defects)
    });

    TestBed.configureTestingModule({
      declarations: [CompleteTestPage],
      imports: [IonicModule.forRoot(CompleteTestPage)],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: TestTypeService, useClass: TestTypesServiceMock},
        AlertController,
        {provide: VehicleService, useClass: VehicleServiceMock},
        {provide: DefectsService, useValue: defectsServiceSpy}
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
    vehicleService = TestBed.get(VehicleService);
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
    vehicleService = null;
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

  it('should update the test type fields', () => {
    comp.completedFields = {};
    comp.completedFields.seatbeltsNumber = 3;
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.testTypeDetails = comp.getTestTypeDetails();
    expect(comp.vehicleTest.seatbeltsNumber).toBeFalsy();
    comp.updateTestType();
    expect(comp.vehicleTest.seatbeltsNumber).toEqual(3);
  });

  it('should get the correct ddl value to be displayed', () => {
    comp.completedFields = {};
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest.result = 'pass';
    expect(comp.getDDLValueToDisplay(testTypeMetadata.sections[0].inputs[0])).toEqual('Pass');
  });

  it('should tell if a section can be displayed', () => {
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest.result = null;
    expect(comp.canDisplaySection(testTypeMetadata.sections[1])).toBeFalsy();
    comp.vehicleTest[testTypeMetadata.sections[1].dependentOn[0]] = 'pass';
    expect(comp.canDisplaySection(testTypeMetadata.sections[1])).toBeTruthy();
  });

  it('should tell if an input can be displayed', () => {
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.testTypeDetails = comp.getTestTypeDetails();
    let input = testTypeMetadata.sections[2].inputs[2];
    comp.completedFields = {};
    comp.completedFields.seatbeltsNumber = '0';
    expect(comp.canDisplayInput(input)).toBeFalsy();
    comp.completedFields.seatbeltsNumber = '123';
    expect(comp.canDisplayInput(input)).toBeTruthy();
  });
});
