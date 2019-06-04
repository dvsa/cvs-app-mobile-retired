import { TestResultModel } from "../../src/models/tests/test-result.model";
import { TestResultsDataMock } from "../../src/assets/data-mocks/test-results-data.mock";
import { of } from "rxjs/observable/of";

export class TestResultServiceMock {
  testResul: TestResultModel = {} as TestResultModel;

  createTestResult() {
    return TestResultsDataMock.TestResultsData[0];
  }

  submitTestResult() {
    return of(TestResultsDataMock.TestResultsData[0]);
  }

}
