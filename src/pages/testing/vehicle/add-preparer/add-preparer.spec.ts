import { AddPreparerPage } from "./add-preparer";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { PreparerService } from "../../../../providers/preparer/preparer.service";
import { AlertController, IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestService } from "../../../../providers/test/test.service";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleServiceMock } from "../../../../../test-config/services-mocks/vehicle-service.mock";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";
import { VisitDataMock } from "../../../../assets/data-mocks/visit-data.mock";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { VisitService } from "../../../../providers/visit/visit.service";
import { PipesModule } from "../../../../pipes/pipes.module";
import { PreparersDataMock } from "../../../../assets/data-mocks/reference-data-mocks/preparers-data.mock";
import { AlertControllerMock } from "ionic-mocks";
import { of } from "rxjs/observable/of";
import { AuthService } from "../../../../providers/global/auth.service";
import { AuthServiceMock } from "../../../../../test-config/services-mocks/auth-service.mock";
import { TESTER_ROLES } from "../../../../app/app.enums";
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";
import { FirebaseLogsServiceMock } from "../../../../../test-config/services-mocks/firebaseLogsService.mock";

describe('Component: AddPreparerPage', () => {
  let comp: AddPreparerPage;
  let fixture: ComponentFixture<AddPreparerPage>;
  let preparerService: PreparerService;
  let testService: TestService;
  let navCtrl: NavController;
  let vehicleService: VehicleService;
  let visitService: VisitService;
  let preparerServiceSpy: any;
  let firebaseLogsService: FirebaseLogsService;

  const TECH_RECORD: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;

  beforeEach(async(() => {
    preparerServiceSpy = jasmine.createSpyObj(
      'PreparerService', [
        {'getPreparersFromStorage': of(PreparersDataMock.PreparersData)}
      ]
    );
    TestBed.configureTestingModule({
      declarations: [AddPreparerPage],
      imports: [
        IonicModule.forRoot(AddPreparerPage),
        PipesModule
      ],
      providers: [
        NavController,
        TestService,
        {provide: FirebaseLogsService, useClass: FirebaseLogsServiceMock},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: PreparerService, useValue: preparerServiceSpy},
        {provide: VehicleService, useClass: VehicleServiceMock},
        {provide: ViewController, useClass: ViewControllerMock},
        {provide: VisitService, useClass: VisitDataMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreparerPage);
    comp = fixture.componentInstance;
    preparerService = TestBed.get(PreparerService);
    testService = TestBed.get(TestService);
    navCtrl = TestBed.get(NavController);
    vehicleService = TestBed.get(VehicleService);
    visitService = TestBed.get(VisitService);
    firebaseLogsService = TestBed.get(FirebaseLogsService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'test': VisitDataMock.VisitTestData,
        'vehicle': TECH_RECORD
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    preparerService = null;
    testService = null;
    vehicleService = null;
    visitService = null;
    firebaseLogsService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(preparerService).toBeTruthy();
    expect(testService).toBeTruthy();
    expect(visitService).toBeTruthy();
  });

  it('should VehicleService and TestCancelPage Component share the same instance',
    inject([VehicleService], (injectService: VehicleService) => {
      expect(injectService).toBe(vehicleService);
    })
  );

  it('should format the data from confirm with a preparer selected', () => {
    spyOn(comp, 'presentPreparerConfirm').and.callThrough();
    comp.preparers = PreparersDataMock.PreparersData;
    comp.searchValue = 'AK4434';
    comp.formatDataForConfirm();
    expect(comp.presentPreparerConfirm).toHaveBeenCalledWith({preparerId: 'AK4434', preparerName: 'Durrell Vehicles Limited'})
  });

  it('should format the data from confirm without a preparer selected', () => {
    spyOn(comp, 'presentPreparerConfirm').and.callThrough();
    comp.preparers = PreparersDataMock.PreparersData;
    comp.searchValue = '';
    comp.formatDataForConfirm();
    expect(comp.presentPreparerConfirm).toHaveBeenCalledWith({preparerId: 'No preparer ID given', preparerName: ''}, false)
  });

  it('should format the data from confirm with a preparer not found', () => {
    spyOn(comp, 'presentPreparerConfirm').and.callThrough();
    comp.preparers = PreparersDataMock.PreparersData;
    comp.searchValue = 'xxx';
    comp.formatDataForConfirm();
    expect(comp.presentPreparerConfirm).toHaveBeenCalledWith({preparerId: 'No preparer ID found', preparerName: ''}, false, true)
  });

  it('should get data from service', () => {
    expect(comp.preparers).toBeDefined();
  });

  it( 'should check if user has rights to test selected vehicle', () => {
    let neededRoles = [TESTER_ROLES.FULL_ACCESS];
    let testerRoles = [TESTER_ROLES.HGV];
    expect(comp.hasRightsToTestVechicle(neededRoles, testerRoles, 'psv')).toBeFalsy();
    neededRoles = [TESTER_ROLES.FULL_ACCESS];
    testerRoles = [TESTER_ROLES.PSV];
    expect(comp.hasRightsToTestVechicle(neededRoles, testerRoles, 'psv')).toBeTruthy();

    neededRoles = [TESTER_ROLES.FULL_ACCESS];
    testerRoles = [TESTER_ROLES.PSV];
    expect(comp.hasRightsToTestVechicle(neededRoles, testerRoles, 'hgv')).toBeFalsy();
    neededRoles = [TESTER_ROLES.FULL_ACCESS];
    testerRoles = [TESTER_ROLES.HGV];
    expect(comp.hasRightsToTestVechicle(neededRoles, testerRoles, 'hgv')).toBeTruthy();

    neededRoles = [TESTER_ROLES.FULL_ACCESS];
    testerRoles = [TESTER_ROLES.PSV];
    expect(comp.hasRightsToTestVechicle(neededRoles, testerRoles, 'trl')).toBeFalsy();
    neededRoles = [TESTER_ROLES.FULL_ACCESS];
    testerRoles = [TESTER_ROLES.HGV];
    expect(comp.hasRightsToTestVechicle(neededRoles, testerRoles, 'trl')).toBeTruthy();

    neededRoles = [TESTER_ROLES.FULL_ACCESS];
    testerRoles = [TESTER_ROLES.PSV];
    expect(comp.hasRightsToTestVechicle(neededRoles, testerRoles, '')).toBeFalsy();
    neededRoles = [TESTER_ROLES.FULL_ACCESS];
    testerRoles = [TESTER_ROLES.HGV];
    expect(comp.hasRightsToTestVechicle(neededRoles, testerRoles, '')).toBeFalsy();
  });

  it('should check if firebase.logEvent was called', () => {
    spyOn(firebaseLogsService, 'logEvent');
    comp.logIntoFirebase();
    expect(firebaseLogsService.logEvent).toHaveBeenCalled();
  });
});
