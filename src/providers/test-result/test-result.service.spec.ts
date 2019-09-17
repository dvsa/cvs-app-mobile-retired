import { TestBed } from "@angular/core/testing";
import { TestResultService } from "./test-result.service";
import { VisitDataMock } from "../../assets/data-mocks/visit-data.mock";
import { VehicleDataMock } from "../../assets/data-mocks/vehicle-data.mock";
import { HTTPService } from "../global/http.service";
import { CommonFunctionsService } from "../utils/common-functions";
import { TestTypeService } from "../test-type/test-type.service";
import { TestTypeServiceMock } from "../../../test-config/services-mocks/test-type-service.mock";
import { AuthService } from "../global/auth.service";
import { AuthServiceMock } from "../../../test-config/services-mocks/auth-service.mock";
import { TestTypeDataModelMock } from "../../assets/data-mocks/data-model/test-type-data-model.mock";
import { DefectDetailsDataMock } from "../../assets/data-mocks/defect-details-data.mock";
import { TEST_TYPES_IDS, SPEC_VALUES } from "../../app/app.enums";

describe('Provider: TestResultService', () => {
  let testResultService: TestResultService;
  let authService: AuthService;
  let httpService: HTTPService;
  let httpServiceSpy: any;

  const VISIT = VisitDataMock.VisitData;
  const TEST = VisitDataMock.VisitTestData;
  const VEHICLE = VehicleDataMock.VehicleData;

  const REASONS: string[] = [
    "The vehicle was not submitted for test at the appointed time",
    "The relevant test fee has not been paid",
    "Current Health and Safety legislation cannot be met in testing the vehicle"
  ];

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['postTestResult'])

    TestBed.configureTestingModule({
      providers: [
        TestResultService,
        CommonFunctionsService,
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: TestTypeService, useClass: TestTypeServiceMock},
        {provide: HTTPService, useValue: httpServiceSpy}
      ]
    });

    authService = TestBed.get(AuthService);
    testResultService = TestBed.get(TestResultService);
    httpService = TestBed.get(HTTPService);
  });

  afterEach(() => {
    testResultService = null;
    httpService = null;
    authService = null;
  });

  it('should create a test result', () => {
    let testResult;
    expect(testResult).toBeUndefined();
    testResult = testResultService.createTestResult(VISIT, TEST, VEHICLE);
    expect(testResult).toBeDefined();
  });

  it('should concatenate the reasons array into one string', function () {
    let resultedString = '';
    expect(resultedString.length).toEqual(0);
    resultedString = testResultService.concatenateReasonsArray(REASONS);
    expect(resultedString.length).toBeGreaterThan(1);
  });

  it('should concatenate the reasons array into one string', function () {
    let resultedString = '';
    let reasons: string[] = [];
    expect(resultedString.length).toEqual(0);
    resultedString = testResultService.concatenateReasonsArray(reasons);
    expect(resultedString.length).toBeGreaterThan(1);
  });

  it('should submit a test result(no testTypes) calling httpService.postTestResult', () => {
    let testResult = testResultService.createTestResult(VISIT, TEST, VEHICLE);
    testResultService.submitTestResult(testResult);
    expect(httpService.postTestResult).toHaveBeenCalled();
  });

  it('should submit a test result(with testTypes) calling httpService.postTestResult', () => {
    let testResult = testResultService.createTestResult(VISIT, TEST, VEHICLE);
    testResult.testTypes.push(TestTypeDataModelMock.TestTypeData);
    testResultService.submitTestResult(testResult);
    expect(httpService.postTestResult).toHaveBeenCalled();
  });

  it('should submit a test result(with testTypes + reasons.length > 1; certificateNumber) calling httpService.postTestResult', () => {
    let testResult = testResultService.createTestResult(VISIT, TEST, VEHICLE);
    testResult.testTypes.push(TestTypeDataModelMock.TestTypeData);
    testResult.testTypes[0].reasons = REASONS;
    testResult.testTypes[0].certificateNumber = 'g34g3g34g3';
    testResultService.submitTestResult(testResult);
    expect(httpService.postTestResult).toHaveBeenCalled();
  });

  it('should submit a test result(with testTypes + no reasons + numberOfSeatbeltsFitted + defects added with/no metadata) calling httpService.postTestResult', () => {
    let testResult = testResultService.createTestResult(VISIT, TEST, VEHICLE);
    testResult.testTypes.push(TestTypeDataModelMock.TestTypeData);
    delete testResult.testTypes[0].reasons;
    testResult.testTypes[0].certificateNumber = 'g34g3g34g3';
    testResult.testTypes[0].testResult = 'g34g3g34g3';
    testResult.testTypes[0].numberOfSeatbeltsFitted = 2;
    let defect1 = DefectDetailsDataMock.DefectData;
    let defect2 = DefectDetailsDataMock.DefectData;
    delete defect2.metadata;
    testResult.testTypes[0].defects.push(defect1);
    testResult.testTypes[0].defects.push(defect2);

    testResultService.submitTestResult(testResult);
    expect(httpService.postTestResult).toHaveBeenCalled();
  });

  it('should return the correct format of the certificateNumber depending on whether it is lec or not', () => {
    let testType = TestTypeDataModelMock.TestTypeData;
    expect(testResultService.formatCertificateNumber(testType)).toEqual(null);
    testType.certificateNumber = SPEC_VALUES.CERTIFICATE_NUMBER;
    expect(testResultService.formatCertificateNumber(testType)).toEqual(SPEC_VALUES.LEC_CERTIFICATE_NUMBER);
    testType.testTypeId = TEST_TYPES_IDS._62;
    expect(testResultService.formatCertificateNumber(testType)).toEqual(SPEC_VALUES.CERTIFICATE_NUMBER);
  });
});
