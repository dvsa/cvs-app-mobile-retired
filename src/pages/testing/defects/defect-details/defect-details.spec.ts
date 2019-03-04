import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { DefectDetailsPage } from "./defect-details";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../../../assets/data-mocks/data-model/test-type-data-model.mock";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { TestTypeServiceMock } from "../../../../../test-config/services-mocks/test-type-service.mock";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";

describe('Component: DefectDetailsPage', () => {
  let comp: DefectDetailsPage;
  let fixture: ComponentFixture<DefectDetailsPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let defectsService: DefectsService;
  let testTypeService: TestTypeService;

  const vehicleTest: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const defect: DefectDetailsModel = {
    deficiencyRef: '1.1.a',
    deficiencyCategory: 'major',
    deficiencyId: 'a',
    deficiencySubId: null,
    deficiencyText: 'missing',
    imNumber: 1,
    imDescription: 'test',
    itemNumber: 1,
    itemDescription: 'test2',
    stdForProhibition: false,
    metadata: {
      category: {
        additionalInfo: {
          location: {
            axleNumber: [],
            horizontal: [],
            lateral: [],
            longitudinal: ['front'],
            rowNumber: [],
            seatNumber: [],
            vertical: []
          },
          notes: false
        }
      }
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

  const addedDefect: DefectDetailsModel = {
    deficiencyRef: '1.1.a',
    deficiencyCategory: 'major',
    deficiencyId: 'a',
    deficiencyText: 'missing',
    deficiencySubId: null,
    imNumber: 1,
    imDescription: 'test',
    itemNumber: 1,
    itemDescription: 'test2',
    stdForProhibition: false,
    metadata: {
      category: {
        additionalInfo: {
          location: {
            axleNumber: [],
            horizontal: [],
            lateral: [],
            longitudinal: ['front'],
            rowNumber: [],
            seatNumber: [],
            vertical: []
          },
          notes: false
        }
      }
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
    },
  };
  const isEdit: boolean = false;
  let defectsServiceSpy;

  beforeEach(async(() => {
    defectsServiceSpy = jasmine.createSpyObj('DefectsService', {
      'getBadgeColor': 'danger'
    });

    TestBed.configureTestingModule({
      declarations: [DefectDetailsPage],
      imports: [IonicModule.forRoot(DefectDetailsPage)],
      providers: [
        NavController,
        {provide: TestTypeService, useClass: TestTypeServiceMock},
        {provide: DefectsService, useValue: defectsServiceSpy},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ViewController, useClass: ViewControllerMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectDetailsPage);
    comp = fixture.componentInstance;
    defectsService = TestBed.get(DefectsService);
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    testTypeService = TestBed.get(TestTypeService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      let params = {
        'vehicleTest': vehicleTest,
        'deficiency': defect,
        'isEdit': isEdit
      };
      return params[param];
    })

  });

  beforeEach(() => {
    comp.defect = navParams.get('deficiency');
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.isEdit = navParams.get('isEdit');
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    defectsService = null;
    testTypeService = null;
  });

  it('should create component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    done();
  });

  it('should TestTypeService and Root Component share the same instance',
    inject([TestTypeService], (injectService: TestTypeService) => {
      expect(injectService).toBe(testTypeService);
    })
  );

  it('should check if the defect was added before', () => {
    comp.vehicleTest.defects.push(addedDefect);
    expect(comp.checkIfDefectWasAdded()).toBeTruthy();
  });


});
