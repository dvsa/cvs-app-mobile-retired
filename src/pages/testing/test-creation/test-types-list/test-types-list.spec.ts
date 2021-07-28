import { TestTypesListPage } from './test-types-list';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { TestTypesReferenceDataMock } from '../../../../assets/data-mocks/reference-data-mocks/test-types.mock';
import { TestTypesReferenceDataModel } from '../../../../models/reference-data-models/test-types.model';
import { PipesModule } from '../../../../pipes/pipes.module';
import { TechRecordDataMock } from '../../../../assets/data-mocks/tech-record-data.mock';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { VehicleTechRecordModel } from '../../../../models/vehicle/tech-record.model';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { VehicleDataMock } from '../../../../assets/data-mocks/vehicle-data.mock';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL,
  APP_STRINGS,
  DURATION_TYPE,
  TEST_TYPE_RESULTS
} from '../../../../app/app.enums';
import { NavControllerMock, ViewControllerMock } from 'ionic-mocks';
import { AuthenticationService } from '../../../../providers/auth/authentication/authentication.service';
import { AuthenticationServiceMock } from '../../../../../test-config/services-mocks/authentication-service.mock';
import { AnalyticsService, DurationService } from '../../../../providers/global';
import { Duration } from '../../../../models/duration.model';
import { of } from 'rxjs/observable/of';

describe('Component: TestTypesListPage', () => {
  let comp: TestTypesListPage;
  let fixture: ComponentFixture<TestTypesListPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let viewCtrl: ViewController;
  let testTypeService: TestTypeService;
  let testTypeServiceSpy;
  let vehicleService: VehicleService;
  let storageServiceSpy: any;
  let vehicleServiceSpy;
  let commonFunctionsService: CommonFunctionsService;
  let vehicleData: VehicleModel = VehicleDataMock.VehicleData;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let durationService: DurationService;

  const testTypes: TestTypesReferenceDataModel[] = TestTypesReferenceDataMock.TestTypesData;
  const vehicle: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
  const mockTestTypes = () =>
    [
      {
        id: '1',
        sortId: '1',
        name: 'annual test'
      }
    ] as TestTypesReferenceDataModel[];

  beforeEach(async(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      read: new Promise((resolve) => resolve(testTypes))
    });

    vehicleServiceSpy = jasmine.createSpyObj('VehicleService', [
      'createVehicle',
      'addTestType',
      'removeTestType'
    ]);

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'addCustomDimension'
    ]);

    testTypeServiceSpy = jasmine.createSpyObj('TestTypeService', {
      orderTestTypesArray: jasmine.createSpy('orderTestTypesArray').and.returnValue(null),
      getTestTypesFromStorage: of(mockTestTypes)
    });

    TestBed.configureTestingModule({
      declarations: [TestTypesListPage],
      imports: [PipesModule, IonicModule.forRoot(TestTypesListPage)],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        CommonFunctionsService,
        DurationService,
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: TestTypeService, useValue: testTypeServiceSpy },
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypesListPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    viewCtrl = TestBed.get(ViewController);
    testTypeService = TestBed.get(TestTypeService);
    vehicleService = TestBed.get(VehicleService);
    commonFunctionsService = TestBed.get(CommonFunctionsService);
    analyticsService = TestBed.get(AnalyticsService);
    durationService = TestBed.get(DurationService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        testTypeReferenceData: null,
        vehicleData: vehicle
      };
      return params[param];
    });
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

  it('ngOnInit: should get test ref data via service call', () => {
    comp.testTypeReferenceData = mockTestTypes();
    comp.ngOnInit();

    expect(testTypeService.orderTestTypesArray).toHaveBeenCalledWith(
      mockTestTypes(),
      'sortId',
      'asc'
    );
    expect(navCtrl.getPrevious).toHaveBeenCalled();
  });

  it('ngOnInit: should get test ref data via internal storage', () => {
    comp.testTypeReferenceData = null;
    comp.ngOnInit();

    testTypeService
      .getTestTypesFromStorage()
      .subscribe((subRefData: TestTypesReferenceDataModel[]) => {
        expect(testTypeService.orderTestTypesArray).toHaveBeenCalledWith(
          subRefData,
          'sortId',
          'asc'
        );
      });
  });

  it('should set the correct text to the back button', () => {
    comp.firstPage = true;
    comp.ionViewWillEnter();
    expect(viewCtrl.setBackButtonText).toHaveBeenCalledWith(APP_STRINGS.TEST_TYPE);
    comp.firstPage = false;
    comp.backBtn = 'backBtn';
    comp.ionViewWillEnter();
    expect(viewCtrl.setBackButtonText).toHaveBeenCalledWith('BackBtn');
  });

  it('should TestTypeService and TestTypesListPage Component share the same instance', inject(
    [TestTypeService],
    (injectService: TestTypeService) => {
      expect(injectService).toBe(testTypeService);
    }
  ));

  it('should return true of false if the testType can be displayed', () => {
    let addedIds = ['38', '39'];
    expect(comp.canDisplay(addedIds, testTypes[0])).toBeTruthy();
    addedIds = ['38', '30'];
    expect(comp.canDisplay(addedIds, testTypes[0])).toBeFalsy();
  });

  it('should return true or false if the leafs of the category are already added or not.', () => {
    let addedIds = ['1', '38', '39'];
    expect(comp.canDisplayCategory(testTypes[1], addedIds)).toBeTruthy();
    expect(comp.canDisplayCategory(testTypes[0], addedIds)).toBeFalsy();
    expect(comp.canDisplayCategory(testTypes[2], addedIds)).toBeTruthy();
  });

  it('should return an array with the ids and the added tests', () => {
    vehicleData.testTypes.push({
      name: 'annual test',
      testTypeName: 'Annual test',
      testTypeId: '3',
      certificateNumber: null,
      secondaryCertificateNumber: null,
      testTypeStartTimestamp: '2018-12-19T00:00:00.000Z',
      testTypeEndTimestamp: null,
      numberOfSeatbeltsFitted: null,
      lastSeatbeltInstallationCheckDate: null,
      seatbeltInstallationCheckDate: null,
      prohibitionIssued: null,
      additionalNotesRecorded: null,
      testResult: TEST_TYPE_RESULTS.PASS,
      reasonForAbandoning: null,
      additionalCommentsForAbandon: null,
      defects: [],
      reasons: [],
      linkedIds: ['38', '39']
    });
    let result = comp.addedTestTypesIds(vehicleData);
    expect(result.length).toBe(1);
  });

  it('should test flow of selectedItem', () => {
    comp.firstPage = false;
    comp.selectedItem(testTypes[1], vehicleData);
    expect(navCtrl.push).toHaveBeenCalled();
    comp.firstPage = true;
    comp.selectedItem(testTypes[1], vehicleData);
    expect(navCtrl.getViews).not.toHaveBeenCalled();
    expect(navCtrl.popTo).not.toHaveBeenCalled();
  });

  it('should check if navCtrl.pop was called', () => {
    comp.cancelTypes();
    expect(navCtrl.pop).toHaveBeenCalled();
  });

  describe('selectedItem: testType', () => {
    let getDurationSpy: jasmine.Spy, getTakenDurationSpy: jasmine.Spy;
    let timeStart: number;
    let timeEnd: number;

    beforeEach(() => {
      timeStart = 1620242516913;
      timeEnd = 1620243020205;
      spyOn(Date, 'now').and.returnValue(timeEnd);

      spyOn(durationService, 'setDuration');
      getDurationSpy = spyOn(durationService, 'getDuration');
      getTakenDurationSpy = spyOn(durationService, 'getTakenDuration');
    });

    it('should track duration when testType are added', () => {
      const strType: string = DURATION_TYPE[DURATION_TYPE.TEST_TYPE];
      const duration: Duration = { start: timeStart, end: timeEnd };
      getDurationSpy.and.returnValue(duration);
      getTakenDurationSpy.and.returnValue(timeEnd);

      comp.selectedItem(testTypes[0], vehicleData);

      expect(durationService.setDuration).toHaveBeenCalledWith({ end: timeEnd }, strType);
      expect(durationService.getDuration).toHaveBeenCalledWith(strType);
      expect(durationService.getTakenDuration).toHaveBeenCalledWith(duration);
    });

    it('should log event and duratinon', async () => {
      const label = 'ADD_TEST_TYPE_START_TIME',
        value = timeEnd.toString();
      await comp.trackAddTestTypeDuration(label, value);

      expect(analyticsService.logEvent).toHaveBeenCalledWith({
        category: ANALYTICS_EVENT_CATEGORIES.TEST_TYPES,
        event: ANALYTICS_EVENTS.ADD_TEST_TYPE_TIME_TAKEN,
        label: ANALYTICS_LABEL[label]
      });

      const key = Object.keys(ANALYTICS_LABEL).indexOf(label) + 1;
      expect(analyticsService.addCustomDimension).toHaveBeenCalledWith(key, value);
    });
  });
});
