import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavParams, ViewController } from "ionic-angular";
import { ViewControllerMock } from "ionic-mocks";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OdometerReadingPage } from "./odometer-reading";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleServiceMock } from "../../../../../test-config/services-mocks/vehicle-service.mock";
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";
import { FirebaseLogsServiceMock } from "../../../../../test-config/services-mocks/firebaseLogsService.mock";
import { VehicleTechRecordModel } from "../../../../models/vehicle/tech-record.model";
import { TechRecordDataMock } from "../../../../assets/data-mocks/tech-record-data.mock";

describe('Component: OdometerReadingPage', () => {
  let component: OdometerReadingPage;
  let fixture: ComponentFixture<OdometerReadingPage>;
  let vehicleService: VehicleService;
  let firebaseLogsService: FirebaseLogsService;
  let navParams: NavParams;

  const VEHICLE: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [OdometerReadingPage],
      imports: [
        IonicModule.forRoot(OdometerReadingPage)
      ],
      providers: [
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ViewController, useFactory: () => ViewControllerMock.instance()},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: VehicleService, useClass: VehicleServiceMock},
        {provide: FirebaseLogsService, useClass: FirebaseLogsServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OdometerReadingPage);
    component = fixture.componentInstance;
    navParams = TestBed.get(NavParams);
    vehicleService = TestBed.get(VehicleService);
    firebaseLogsService = TestBed.get(FirebaseLogsService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'vehicle': VEHICLE
      };
      return params[param];
    });

    component.vehicle = navParams.get('vehicle');
  });


  afterEach(() => {
    fixture.destroy();
    component = null;
    navParams = null;
    vehicleService = null;
    firebaseLogsService = null;
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit logic', () => {
    component.vehicle.odometerReading = '32';
    component.errorIncomplete = true;
    component.ngOnInit();
    expect(component.errorIncomplete).toBeFalsy();
    component.vehicle.odometerReading = '';
    component.errorIncomplete = true;
    component.ngOnInit();
    expect(component.errorIncomplete).toBeTruthy();
  });

  it('should check if logEvent was triggered', () => {
    spyOn(firebaseLogsService, 'logEvent');
    component.onSave();
    expect(firebaseLogsService.logEvent).toHaveBeenCalled();
  });
});
