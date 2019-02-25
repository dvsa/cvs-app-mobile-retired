import { TestBed } from "@angular/core/testing";
import { TestResultService } from "./test-result.service";
import { VisitDataMock } from "../../assets/data-mocks/visit-data.mock";
import { VehicleDataMock } from "../../assets/data-mocks/vehicle-data.mock";
import { HTTPService } from "../global/http.service";
import { of } from "rxjs/observable/of";
import { TechRecordDataMock } from "../../assets/data-mocks/tech-record-data.mock";
import { CommonFunctionsService } from "../utils/common-functions";
import { TestTypeService } from "../test-type/test-type.service";
import { TestTypeServiceMock } from "../../../test-config/services-mocks/test-type-service.mock";
import { AuthService } from "../global/auth.service";
import { AuthServiceMock } from "../../../test-config/services-mocks/auth-service.mock";

describe('Provider: TestResultService', () => {
  let testResultService: TestResultService;
  let authService: AuthService;
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
    httpServiceSpy = TestBed.get(HTTPService);
  });

  afterEach(() => {
    testResultService = null;
    httpServiceSpy = null;
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

});
