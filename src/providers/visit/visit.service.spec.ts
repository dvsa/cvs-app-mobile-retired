import { TestBed } from "@angular/core/testing";
import { VisitService } from "./visit.service";
import { StorageService } from "../natives/storage.service";
import { AtfDataMock } from "../../assets/data-mocks/reference-data-mocks/atf-data.mock";
import { AtfReferenceDataModel } from "../../models/reference-data-models/atf.model";
import { TestModel } from "../../models/tests/test.model";
import { VisitDataMock } from "../../assets/data-mocks/visit-data.mock";
import { TestDataModelMock } from "../../assets/data-mocks/data-model/test-data-model.mock";

describe('Provider: VisitService', () => {
  let visitService: VisitService;
  let storageService: StorageService
  let storageServiceSpy: any;

  const ATF: AtfReferenceDataModel = AtfDataMock.AtfData[0];
  const TEST: TestModel = TestDataModelMock.TestData;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['update']);

    TestBed.configureTestingModule({
      providers: [
        VisitService,
        {provide: StorageService, useValue: storageServiceSpy}
      ]
    });
    visitService = TestBed.get(VisitService);
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    visitService = null;
  });

  it('should start a new visit', () => {
    expect(Object.keys(visitService.visit).length).toBe(0);
    expect(visitService.visit.startTime).toBeFalsy();
    visitService.visit = visitService.createVisit(ATF);
    expect(visitService.visit.startTime).toBeTruthy();
    expect(storageService.update).toHaveBeenCalled();
  });

  it('should end visit', () => {
    expect(visitService.visit.endTime).toBeFalsy();
    visitService.endVisit();
    expect(visitService.visit.endTime).toBeTruthy();
    expect(storageService.update).toHaveBeenCalled();
  });

  it('should add test to visit.tests array', () => {
    visitService.createVisit(ATF);
    expect(visitService.visit.tests.length).toBe(0);
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
  });

  it('should remove the added test from the visit.tests array', () => {
    visitService.createVisit(ATF);
    expect(visitService.visit.tests.length).toBe(0);
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
    visitService.removeTest(TEST);
    expect(visitService.visit.tests.length).toBe(0);
  });

  it('should retrieve the tests array', () => {
    let testsArr = [];
    visitService.createVisit(ATF);
    expect(testsArr.length).toBe(0);
    expect(visitService.visit.tests.length).toBe(0);
    visitService.addTest(TEST);
    expect(visitService.visit.tests.length).toBe(1);
    testsArr = visitService.getTests();
    expect(testsArr.length).toBe(1);
  })

  it('should update the storage', () => {
    visitService.updateVisit()
    expect(storageService.update).toHaveBeenCalled();
  })
});
