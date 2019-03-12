import { TestTypeModel } from "../../src/models/tests/test-type.model";
import { DefectDetailsModel } from "../../src/models/defects/defect-details.model";
import { Observable } from "rxjs";
import { DEFICIENCY_CATEGORY, TEST_TYPE_RESULTS } from "../../src/app/app.enums";
import { of } from "rxjs/observable/of";
import { TestTypesReferenceDataModel } from "../../src/models/reference-data-models/test-types.model";
import { TestTypesReferenceDataMock } from "../../src/assets/data-mocks/reference-data-mocks/test-types.mock";

export class TestTypeServiceMock {
  createTestType(testType: TestTypesReferenceDataModel): TestTypeModel {
    let newTestType = {} as TestTypeModel;
    newTestType.name = testType.name;
    newTestType.testTypeName = testType.testTypeName;
    newTestType.testTypeId = testType.id;
    newTestType.certificateNumber = '';
    newTestType.testTypeStartTimestamp = new Date().toISOString();
    newTestType.testTypeEndTimestamp = '';
    newTestType.numberOfSeatbeltsFitted = null;
    newTestType.lastSeatbeltInstallationCheckDate = '';
    newTestType.seatbeltInstallationCheckDate = null;
    newTestType.testResult = null;
    newTestType.prohibitionIssued = null;
    newTestType.reasons = [];
    newTestType.reasonForAbandoning = '';
    newTestType.additionalCommentsForAbandon = '';
    newTestType.additionalNotesRecorded = '';
    newTestType.defects = [];
    return newTestType
  }

  addDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    testType.defects.push(defect);
  }

  endTestType(testType: TestTypeModel) {
    testType.testTypeEndTimestamp = new Date().toISOString();
  }

  removeDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    let defIdx = testType.defects.map((e) => {
      return e.deficiencyRef
    }).indexOf(defect.deficiencyRef);
    testType.defects.splice(defIdx, 1);
  }

  getTestTypesFromStorage(): Observable<TestTypesReferenceDataModel[]> {
    return of(TestTypesReferenceDataMock.TestTypesData)
  }

  setTestResult(testType: TestTypeModel): TEST_TYPE_RESULTS {
    let result = TEST_TYPE_RESULTS.PASS;
    let criticalDeficienciesArr: DefectDetailsModel[] = [];
    if (testType.reasons.length) return TEST_TYPE_RESULTS.ABANDONED;
    testType.defects.forEach(
      (defect: DefectDetailsModel) => {
        switch (defect.deficiencyCategory.toLowerCase()) {
          case DEFICIENCY_CATEGORY.MAJOR:
          case DEFICIENCY_CATEGORY.DANGEROUS:
            criticalDeficienciesArr.push(defect);
            break;
          case DEFICIENCY_CATEGORY.MINOR:
          case DEFICIENCY_CATEGORY.ADVISORY:
            result = TEST_TYPE_RESULTS.PASS;
            break;
        }
      });
    if (criticalDeficienciesArr.length) {
      let criticalDefStatus = criticalDeficienciesArr.every(
        (defect) => {
          return defect.prs
        }
      );
      result = criticalDefStatus ? TEST_TYPE_RESULTS.PRS : TEST_TYPE_RESULTS.FAIL;
    }
    return result;
  }

}
