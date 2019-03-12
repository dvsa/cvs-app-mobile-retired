import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { TestTypeService } from "./test-type.service";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { VisitService } from "../visit/visit.service";
import { DefectDetailsModel } from "../../models/defects/defect-details.model";
import { DefectDetailsDataMock } from "../../assets/data-mocks/defect-details-data.mock";
import { TestTypesReferenceDataMock } from "../../assets/data-mocks/reference-data-mocks/test-types.mock";
import { CommonFunctionsService } from "../utils/common-functions";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../assets/data-mocks/data-model/test-type-data-model.mock";
import { TEST_TYPE_RESULTS } from "../../app/app.enums";

describe('Provider: TestTypeService', () => {
  let testTypeService: TestTypeService;
  let storageService: StorageService;
  let visitService: VisitService;

  let visitServiceSpy: any;
  let storageServiceSpy: any;

  const TEST_TYPES: TestTypesReferenceDataModel[] = TestTypesReferenceDataMock.TestTypesData;
  const DEFECT: DefectDetailsModel = DefectDetailsDataMock.DefectData;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => {
        return TEST_TYPES;
      })
    });
    visitServiceSpy = jasmine.createSpyObj('VisitService', ['updateVisit']);

    TestBed.configureTestingModule({
      providers: [
        TestTypeService,
        CommonFunctionsService,
        {provide: VisitService, useValue: visitServiceSpy},
        {provide: StorageService, useValue: storageServiceSpy}
      ]
    });

    testTypeService = TestBed.get(TestTypeService);
    storageService = TestBed.get(StorageService);
    visitService = TestBed.get(VisitService);
  });

  afterEach(() => {
    testTypeService = null;
    storageService = null;
    visitService = null;
  });

  it('create a testType', () => {
    let testType: TestTypesReferenceDataModel = TEST_TYPES[0];
    let newTestType = testTypeService.createTestType(testType);
    expect(newTestType.testTypeName).toMatch('Annual test');
  });

  it('should put end time on the testType', () => {
    let testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    expect(testType.testTypeEndTimestamp).toBeNull();
    testTypeService.endTestType(testType);
    expect(testType.testTypeEndTimestamp).toBeTruthy();
  });

  it('should add a defect in test array', () => {
    let testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    expect(testType.defects.length).toEqual(0);
    testTypeService.addDefect(testType, DEFECT);
    expect(testType.defects.length).toEqual(1);
    expect(visitService.updateVisit).toHaveBeenCalled();
  });

  it('should remove a defect from test', () => {
    let testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    testType.defects = DefectDetailsDataMock.DefectDetails;
    expect(testType.defects.length).toEqual(2);
    testTypeService.removeDefect(testType, DEFECT);
    expect(testType.defects.length).toEqual(1);
  });

  it('should set test result to FAIL: hasDefects true', () => {
    let testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    let hasDefects: boolean = true;
    testType.defects = DefectDetailsDataMock.DefectDetails;
    let result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.FAIL);
  });

  it('should set test result to FAIL: hasDefects false', () => {
    let testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    let hasDefects: boolean = false;
    testType.defects = DefectDetailsDataMock.DefectDetails;
    let result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.FAIL);
  });

  it('should set test result PASS: hasDefects false', () => {
    let testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    let hasDefects: boolean = false;
    let result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.PASS);
  });

  it('should set test result PRS: hasDefects false', () => {
    let testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    let hasDefects: boolean = true;
    testType.defects.push(DefectDetailsDataMock.DefectData);
    testType.defects[0].prs = true;
    let result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.PRS);
  });

  it('should set test result: ABANDONED', () => {
    let testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    testType.reasons.push('abandon ship');
    let hasDefects: boolean = true;
    let result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.ABANDONED);
  });

  it('should ordered testType array', () => {
    let testTypes: TestTypeModel[] = [];
    testTypes.push(TestTypeDataModelMock.TestTypeData);
    testTypes.push(TestTypeDataModelMock.TestTypeData);
    testTypes[0].testTypeId = '2';
    expect(testTypes[0].testTypeId).toMatch('2');
    let orderedTestTypes: TestTypeModel[] = testTypeService.orderTestTypesArray(testTypes, 'testTypeId', 'asc');
    expect(orderedTestTypes[0].testTypeId).toMatch('1');

  });

  it('should return data from local storage', () => {
    testTypeService.getTestTypesFromStorage().subscribe(
      data => {
        expect(data).toBe(<TestTypesReferenceDataModel[]>TEST_TYPES)
      }
    )
  });
});
