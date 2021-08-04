import { TestBed } from '@angular/core/testing';
import { VisitService } from './visit.service';
import { AlertControllerMock } from 'ionic-mocks';
import { StorageService } from '../natives/storage.service';
import { Events, AlertController, App } from 'ionic-angular';
import { TestStationDataMock } from '../../assets/data-mocks/reference-data-mocks/test-station-data.mock';
import { TestStationReferenceDataModel } from '../../models/reference-data-models/test-station.model';
import { TestModel } from '../../models/tests/test.model';
import { TestDataModelMock } from '../../assets/data-mocks/data-model/test-data-model.mock';
import { HTTPService } from '../global/http.service';
import { AuthenticationService } from '../auth';
import { AppService } from '../global/app.service';
import { AppServiceMock } from '../../../test-config/services-mocks/app-service.mock';
import { ActivityService } from '../activity/activity.service';
import { ActivityServiceMock } from '../../../test-config/services-mocks/activity-service.mock';
import { AuthenticationServiceMock } from './../../../test-config/services-mocks/authentication-service.mock';
import { VehicleModel } from '../../models/vehicle/vehicle.model';
import { VehicleDataMock } from '../../assets/data-mocks/vehicle-data.mock';

describe('Provider: VisitService', () => {
  let visitService: VisitService;
  let appService: AppService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let httpService: HTTPService;
  let httpServiceSpy;
  let activityService: ActivityService;
  let appSpy;

  const TEST_STATION: TestStationReferenceDataModel = TestStationDataMock.TestStationData[0];
  let TEST: TestModel = TestDataModelMock.TestData;
  let VEHICLE: VehicleModel = VehicleDataMock.VehicleData;
  let aTest: TestModel = {
    startTime: null,
    endTime: '14 March',
    status: null,
    reasonForCancellation: '',
    vehicles: [VEHICLE]
  };

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['update', 'delete']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['startVisit', 'endVisit']);
    appSpy = jasmine.createSpy('App', () => {
      setRoot: () => {
        return new Promise(null);
      };
    });

    TestBed.configureTestingModule({
      providers: [
        Events,
        VisitService,
        { provide: ActivityService, useClass: ActivityServiceMock },
        { provide: AppService, useClass: AppServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: HTTPService, useValue: httpServiceSpy },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: App, useValue: appSpy }
      ]
    });

    visitService = TestBed.get(VisitService);
    appService = TestBed.get(AppService);
    storageService = TestBed.get(StorageService);
    httpService = TestBed.get(HTTPService);
    activityService = TestBed.get(ActivityService);
  });

  afterEach(() => {
    visitService = null;
    appService = null;
    activityService = null;
    storageService = null;
  });

  it('should start a new visit', () => {
    expect(Object.keys(visitService.visit).length).toBe(0);
    expect(visitService.visit.startTime).toBeFalsy();
    visitService.visit = visitService.createVisit(TEST_STATION);
    expect(visitService.visit.startTime).toBeTruthy();
    visitService.updateVisit();
    expect(storageService.update).toHaveBeenCalled();
  });

  it('should start a new visit, with id given', () => {
    expect(Object.keys(visitService.visit).length).toBe(0);
    expect(visitService.visit.startTime).toBeFalsy();
    visitService.visit = visitService.createVisit(TEST_STATION, '32fe');
    expect(visitService.visit.startTime).toBeTruthy();
    visitService.updateVisit();
    expect(storageService.update).toHaveBeenCalled();
  });

  it('should end visit', () => {
    visitService.endVisit('f34f43');
    expect(httpService.endVisit).toHaveBeenCalled();
  });

  it('should return the latest test', () => {
    visitService.createVisit(TEST_STATION);
    visitService.visit.tests.push(aTest);
    let lateTest = visitService.getLatestTest();
    expect(lateTest.endTime).toMatch('14 March');
  });

  it('should return the latest vehicle', () => {
    visitService.createVisit(TEST_STATION);
    visitService.visit.tests.push(aTest);
    let lateTest = visitService.getLatestVehicle();
    expect(lateTest.vrm).toMatch('BQ91YHQ');
  });

  it('should return the current ATF if possible', () => {
    let atfTest = visitService.getCurrentATF();
    expect(atfTest).toMatch('N/A');

    visitService.createVisit(TEST_STATION);
    atfTest = visitService.getCurrentATF();
    expect(atfTest).toMatch('An Test Station Name');
  });

  it('should return the current VIN if possible', () => {
    let vinTest = visitService.getCurrentVIN();
    expect(vinTest).toMatch('N/A');

    visitService.createVisit(TEST_STATION);
    visitService.visit.tests.push(aTest);
    vinTest = visitService.getCurrentVIN();
    expect(vinTest).toMatch('1B7GG36N12S678410');
  });

  it('should add test to visit.tests array', () => {
    activityService.activities = [
      {
        activityType: 'wait',
        testStationName: 'Abshire-Kub',
        testStationPNumber: '09-4129632',
        testStationEmail: 'teststationname@dvsa.gov.uk',
        testStationType: 'gvts',
        testerName: 'gvminnbbl',
        testerStaffId: '9b4q4o87d',
        startTime: '2019-05-23T12:11:11.974Z',
        endTime: null,
        waitReason: ['Waiting for vehicle'],
        notes: '',
        parentId: '8e56af10-503c-494c-836b-b2f3aa3c56ac'
      }
    ];
    visitService.createVisit(TEST_STATION);
    expect(visitService.visit.tests.length).toBe(0);
    TEST.startTime = '2019-05-23T14:11:11.974Z';
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
    TEST.startTime = '2019-05-23T15:11:11.974Z';
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(2);
    expect(activityService.activities[0].endTime).toEqual('2019-05-23T14:11:11.974Z');
  });

  it('should remove the added test from the visit.tests array', () => {
    visitService.createVisit(TEST_STATION);
    expect(visitService.visit.tests.length).toBe(0);
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
    visitService.removeTest(TEST);
    expect(visitService.visit.tests.length).toBe(0);
  });

  it('should retrieve the tests array', () => {
    let testsArr = [];
    visitService.createVisit(TEST_STATION);
    expect(testsArr.length).toBe(0);
    expect(visitService.visit.tests.length).toBe(0);
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
    testsArr = visitService.getTests();
    expect(testsArr.length).toBe(1);
  });

  it('should start a visit, call httpservice.startvisit', () => {
    visitService.startVisit(TEST_STATION);
    expect(httpService.startVisit).toHaveBeenCalled();
  });

  it('should call the activities service with the correct tester email set', () => {
    const emailExample = 'jack@dvsa.gov.uk';

    visitService.startVisit(TEST_STATION);

    expect(httpService.startVisit).toHaveBeenCalledTimes(1);
    expect(httpServiceSpy.startVisit.calls.mostRecent().args[0].testerEmail).toBe(emailExample);
  });

  it('should update the storage', () => {
    visitService.updateVisit();
    expect(storageService.update).toHaveBeenCalled();
  });

  it('should not update the storage', () => {
    appService.caching = false;
    visitService.updateVisit();
    expect(storageService.update).not.toHaveBeenCalled();
  });

  it('should create the alert with the dismiss logic', () => {
    let alert = visitService.createDataClearingAlert(
      jasmine.createSpyObj('Loading', ['dismiss', 'present'])
    );
    expect(alert.onDidDismiss).toHaveBeenCalledTimes(1);
  });
});
