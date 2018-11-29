import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { DefectDetailsPage } from "./defect-details";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";

describe('Component: DefectDetailsPage', () => {
  let comp: DefectDetailsPage;
  let fixture: ComponentFixture<DefectDetailsPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let defectsService: DefectsService;

  const vehicleTest: VehicleTestModel = new VehicleTestModel('testName', false, new Date(), 12, new Date());
  const defect: DefectDetailsModel = {
    ref: '1.1.a',
    deficiencyCategory: 'Major',
    deficiencyId: 'a',
    deficiencyText: 'missing',
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
        },
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

  const addedDefect: DefectDetailsModel = {
    ref: '1.1.a',
    deficiencyCategory: 'Major',
    deficiencyId: 'a',
    deficiencyText: 'missing',
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
        },
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
        {provide: DefectsService, useValue: defectsServiceSpy},
        {provide: NavParams, useClass: NavParamsMock}
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
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should check if the defect was added before', () => {
    comp.vehicleTest.addDefect(addedDefect);
    expect(comp.checkIfDefectWasAdded()).toBeTruthy();
  });
});
