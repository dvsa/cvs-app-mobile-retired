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
        imNumber: '1',
        imDescription: 'test'
      },
      item: {
        itemNumber: '1',
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
      rowNumber: '',
      seatNumber: '',
      axleNumber: ''
    }
  };
  const isEdit: boolean = false;

  beforeEach(async(() => {
    const defectsServiceSpy = jasmine.createSpyObj('DefectsService', ['getBadgeColor']);

    TestBed.configureTestingModule({
      declarations: [DefectDetailsPage],
      imports: [IonicModule.forRoot(DefectDetailsPage)],
      providers: [
        NavController,
        {provide: DefectsService, useValue: defectsServiceSpy},
        {provide: NavParams, useClass: NavParamsMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
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
    comp.defect = navParams.get('deficiency').defect;
    comp.vehicleTest = navParams.get('vehicleTest');
    comp.isEdit = navParams.get('isEdit');
    comp.defectMetadata = comp.defect.metadata.category.additionalInfo;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    defectsService = null;
  });

  // it('should create the component', () => {
  //   // comp.vehicleTest = navParams.get('vehicleTest');
  //   // comp.defect = navParams.get('deficiency');
  //   // comp.isEdit = navParams.get('isEdit');
  //   // comp.defectMetadata  = DefectsDataMock.DefectsData[0].additionalInfo['psv'];
  //   // console.log(comp);
  //
  //   expect(fixture).toBeTruthy();
  //   expect(comp).toBeTruthy();
  //   // expect(defectsService).toBeTruthy();
  // });


});

// import {DefectDetailsPage} from "./defect-details";
// import {async, ComponentFixture, TestBed} from "@angular/core/testing";
// import {IonicModule, NavController, NavParams} from "ionic-angular";
// import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
// import {VehicleTestModel} from "../../../../models/vehicle-test.model";
// import {DefectModel} from "../../../../models/defects/defect-details.model";
// import {DefectLocationModel} from "../../../../models/defect-location.model";
// import {NavParamsMock} from "../../../../../test-config/ionic-mocks/nav-params.mock";
// import {DefectsDataMock} from "../../../../../test-config/data-mocks/defects-data.mock";
//
// describe('Component: DefectDetailsPage', () => {
//   let comp: DefectDetailsPage;
//   let fixture: ComponentFixture<DefectDetailsPage>;
//   let navCtrl: NavController;
//   let navParams: NavParams;
//
//   const addedDefect = new DefectModel('1.1 (a)', 'defTxt', 'major', false, '', new DefectLocationModel(), 'defId', 'parDefCat', 1, 'parDefItem', 1);
//   const theNewDefect = new DefectModel('1.1 (a)', 'defTxt', 'major', false, '', new DefectLocationModel(), 'defId', 'parDefCat', 1, 'parDefItem', 1);
//   const vehicleTest = new VehicleTestModel('testName', false, new Date(), 12, new Date());
//   const defectCategories = DefectsDataMock.DefectsData[0].additionalInfo['psv'];
//
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [DefectDetailsPage],
//       imports: [
//         IonicModule.forRoot(DefectDetailsPage)
//       ],
//       providers: [
//         NavController,
//         {provide: NavParams, useClass: NavParamsMock},
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(DefectDetailsPage);
//     comp = fixture.componentInstance;
//     navCtrl = TestBed.get(NavController);
//     navParams = TestBed.get(NavParams);
//   });
//
//   beforeEach(() => {
//     const navParams = fixture.debugElement.injector.get(NavParams);
//
//     navParams.get =
//       jasmine
//         .createSpy('get')
//         .and
//         .callFake((param) => {
//           const params = {
//             'test': vehicleTest,
//             'defect': theNewDefect,
//             'parentDefectCategory': theNewDefect.parentDefectCategory,
//             'parentDefectCategoryId': theNewDefect.parentDefectCategoryId,
//             'parentDefectItem': theNewDefect.parentDefectItem,
//             'parentDefectItemId': theNewDefect.parentDefectItemId,
//             'additionalInfo': defectCategories
//           }
//           return params[param]
//         })
//   });
//
//   afterEach(() => {
//     fixture.destroy();
//     comp = null;
//     navCtrl = null;
//     navParams = null;
//   })
//
//   it('should create component', () => {
//     expect(fixture).toBeTruthy();
//     expect(comp).toBeTruthy();
//   });
//
//   it('should return badge\'s correct color', () => {
//     comp.defect = navParams.get('defect');
//
//     expect(comp.getBadgeColor(comp.defect.deficiencyCategory)).toBe('danger')
//   });
//
//   it('should check if the defect was added before', () => {
//     comp.vehicleTest = navParams.get('test');
//     comp.defect = navParams.get('defect');
//     comp.vehicleTest.addDefect(addedDefect);
//
//     expect(comp.checkIfDefectWasAdded()).toBeTruthy();
//   })
//
// });
