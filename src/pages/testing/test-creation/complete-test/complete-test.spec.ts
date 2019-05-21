import { CompleteTestPage } from "./complete-test";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { DefectsReferenceDataMock } from "../../../../assets/data-mocks/reference-data-mocks/defects-data.mock";
import { DEFICIENCY_CATEGORY, TEST_TYPE_RESULTS } from "../../../../app/app.enums";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../../../assets/data-mocks/data-model/test-type-data-model.mock";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { TestTypeMetadataMock } from "../../../../assets/data-mocks/data-model/test-type-metadata.mock";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleServiceMock } from "../../../../../test-config/services-mocks/vehicle-service.mock";
import { of } from "rxjs/observable/of";
import { TestTypeServiceMock } from "../../../../../test-config/services-mocks/test-type-service.mock";
import { DefectCategoryReferenceDataModel } from "../../../../models/reference-data-models/defects.reference-model";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";

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

  const DEFECTS: DefectCategoryReferenceDataModel[] = DefectsReferenceDataMock.DefectsData
  const ADDED_DEFECT: DefectDetailsModel = {
    deficiencyRef: '1.1.a',
    deficiencyCategory: DEFICIENCY_CATEGORY.MAJOR,
    deficiencyId: 'a',
    deficiencyText: 'missing',
    imNumber: 1,
    imDescription: 'test',
    itemNumber: 1,
    stdForProhibition: false,
    deficiencySubId: null,
    itemDescription: 'test2',
    metadata: {
      category: {}
    },
    prs: false,
    additionalInformation: {
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
    }
  };

  const TEST_TYPES_METADATA = TestTypeMetadataMock.TestTypeMetadata;
  const VEHICLE_TEST: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const VEHICLE: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;

  beforeEach(async(() => {
    defectsServiceSpy = jasmine.createSpyObj('DefectsService', {
      'getDefectsFromStorage': of(DEFECTS)
    });

    TestBed.configureTestingModule({
      declarations: [CompleteTestPage],
      imports: [IonicModule.forRoot(CompleteTestPage)],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: TestTypeService, useClass: TestTypeServiceMock},
        AlertController,
        {provide: VehicleService, useClass: VehicleServiceMock},
        {provide: DefectsService, useValue: defectsServiceSpy},
        {provide: ViewController, useClass: ViewControllerMock}
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
        'vehicleTest': VEHICLE_TEST,
        'vehicle': VEHICLE
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
    comp.vehicleTest.defects.push(ADDED_DEFECT);
    expect(comp.vehicleTest.defects.length).toBeTruthy();
    comp.removeDefect(ADDED_DEFECT);
    expect(comp.vehicleTest.defects.length).toBeFalsy();
  });

  it('should update the test type fields', () => {
    comp.completedFields = {};
    comp.completedFields.numberOfSeatbeltsFitted = 3;
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.testTypeDetails = comp.getTestTypeDetails();
    expect(comp.vehicleTest.numberOfSeatbeltsFitted).toBeFalsy();
    comp.updateTestType();
    expect(comp.vehicleTest.numberOfSeatbeltsFitted).toEqual(3);
  });
  ;

  it('should get the correct ddl value to be displayed', () => {
    comp.completedFields = {};
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest.testResult = TEST_TYPE_RESULTS.PASS;
    expect(comp.getDDLValueToDisplay(TEST_TYPES_METADATA.sections[0].inputs[0])).toEqual('Pass');
  });

  it('should tell if a section can be displayed', () => {
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest.testResult = null;
    expect(comp.canDisplaySection(TEST_TYPES_METADATA.sections[1])).toBeFalsy();
    comp.vehicleTest[TEST_TYPES_METADATA.sections[1].dependentOn[0]] = 'pass';
    expect(comp.canDisplaySection(TEST_TYPES_METADATA.sections[1])).toBeTruthy();
  });

  it('should tell if an input can be displayed', () => {
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.testTypeDetails = comp.getTestTypeDetails();
    let input = TEST_TYPES_METADATA.sections[2].inputs[2];
    comp.completedFields = {};
    comp.completedFields.seatbeltInstallationCheckDate = false;
    expect(comp.canDisplayInput(input)).toBeTruthy();
    comp.completedFields.seatbeltInstallationCheckDate = true;
    expect(comp.canDisplayInput(input)).toBeFalsy();
  });

  it('should create a handler for a DDL button', () => {
    comp.today = new Date().toISOString();
    comp.completedFields = {};
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest.lastSeatbeltInstallationCheckDate = '2019-01-14';
    let input = TestTypeMetadataMock.TestTypeMetadata.sections[2].inputs[0];
    comp.createDDLButtons(input);
    comp.createDDLButtonHandler(input, 1);
    expect(comp.vehicleTest.lastSeatbeltInstallationCheckDate).toBeNull();
    comp.createDDLButtonHandler(input, 0);
    expect(comp.vehicleTest.lastSeatbeltInstallationCheckDate).toBeDefined();
  });
});
