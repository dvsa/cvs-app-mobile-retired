import { TestBed } from "@angular/core/testing";
import { VisitService } from "./visit.service";
import { StorageService } from "../natives/storage.service";
import { TestStationDataMock } from "../../assets/data-mocks/reference-data-mocks/test-station-data.mock";
import { TestStationReferenceDataModel } from "../../models/reference-data-models/test-station.model";
import { TestModel } from "../../models/tests/test.model";
import { TestDataModelMock } from "../../assets/data-mocks/data-model/test-data-model.mock";
import { AuthService } from "../global/auth.service";
import { HTTPService } from "../global/http.service";
import { Events } from "ionic-angular";
import { AuthServiceMock } from "../../../test-config/services-mocks/auth-service.mock";
import { AppService } from "../global/app.service";
import { AppServiceMock } from "../../../test-config/services-mocks/app-service.mock";

describe('Provider: VisitService', () => {
  let visitService: VisitService;
  let appService: AppService;
  let storageService: StorageService;
  let authService: AuthService;
  let storageServiceSpy: any;
  let httpService: HTTPService;
  let httpServiceSpy;

  const TestStation: TestStationReferenceDataModel = TestStationDataMock.TestStationData[0];
  const TEST: TestModel = TestDataModelMock.TestData;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['update', 'delete']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['startVisit', 'endVisit']);

    TestBed.configureTestingModule({
      providers: [
        Events,
        VisitService,
        {provide: AppService, useClass: AppServiceMock},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: StorageService, useValue: storageServiceSpy},
        {provide: HTTPService, useValue: httpServiceSpy}
      ]
    });
    visitService = TestBed.get(VisitService);
    appService = TestBed.get(AppService);
    authService = TestBed.get(AuthService);
    storageService = TestBed.get(StorageService);
    httpService = TestBed.get(HTTPService);
    appService.caching = true;
  });

  afterEach(() => {
    visitService = null;
    authService = null;
  });

  it('should start a new visit', () => {
    expect(Object.keys(visitService.visit).length).toBe(0);
    expect(visitService.visit.startTime).toBeFalsy();
    visitService.visit = visitService.createVisit(TestStation);
    expect(visitService.visit.startTime).toBeTruthy();
    visitService.updateVisit();
    expect(storageService.update).toHaveBeenCalled();
  });

  it('should end visit', () => {
    expect(visitService.visit.endTime).toBeFalsy();
    const stubValue = 'someId';
    visitService.visit.endTime = httpServiceSpy.startVisit.and.returnValue(stubValue);
    expect(visitService.visit.endTime).toBeTruthy();
    storageServiceSpy.delete();
    expect(storageService.delete).toHaveBeenCalled();
  });

  it('should add test to visit.tests array', () => {
    visitService.createVisit(TestStation);
    expect(visitService.visit.tests.length).toBe(0);
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
  });

  it('should remove the added test from the visit.tests array', () => {
    visitService.createVisit(TestStation);
    expect(visitService.visit.tests.length).toBe(0);
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
    visitService.removeTest(TEST);
    expect(visitService.visit.tests.length).toBe(0);
  });

  it('should retrieve the tests array', () => {
    let testsArr = [];
    visitService.createVisit(TestStation);
    expect(testsArr.length).toBe(0);
    expect(visitService.visit.tests.length).toBe(0);
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
    testsArr = visitService.getTests();
    expect(testsArr.length).toBe(1);
  });

  it('should update the storage', () => {
    visitService.updateVisit();
    expect(storageService.update).toHaveBeenCalled();
  })
});
