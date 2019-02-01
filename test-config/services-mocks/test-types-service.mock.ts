import { TestTypeModel } from "../../src/models/tests/test-type.model";
import { DefectDetailsModel } from "../../src/models/defects/defect-details.model";
import { Observable } from "rxjs";
import { DEFICIENCY_CATEGORY, TEST_TYPE_RESULTS } from "../../src/app/app.enums";
import { of } from "rxjs/observable/of";
import { TestTypesDataMock } from "../../src/assets/data-mocks/reference-data-mocks/test-types.mock";
import { TestTypesReferenceDataModel } from "../../src/models/reference-data-models/test-types.model";

export class TestTypesServiceMock {
  createTestType(testType: TestTypeModel): TestTypeModel {
    let newTestType = {} as TestTypeModel;
    newTestType.name = testType.name;
    newTestType.testTypeName = testType.testTypeName;
    newTestType.startTime = new Date().toISOString();
    newTestType.abandonment = {
      reasons: []
    };
    newTestType.defects = [];
    return newTestType
  }

  addDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    testType.defects.push(defect);
  }

  removeDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    let defIdx = testType.defects.map((e) => {
      return e.ref
    }).indexOf(defect.ref);
    testType.defects.splice(defIdx, 1);
  }

  getTestTypesFromStorage(): Observable<TestTypesReferenceDataModel[]> {
    return of(TestTypesDataMock.TestTypesData);
  }

  checkPass(testType: TestTypeModel): boolean {
    let foundCriticalDefect = true;
    testType.defects.forEach(defect => {
      if (defect.deficiencyCategory.toLowerCase() == "major" || defect.deficiencyCategory.toLowerCase() == "dangerous") {
        foundCriticalDefect = false;
      }
    });
    return foundCriticalDefect;
  }

  private passTestType(testType: TestTypeModel) {
    testType.endTime = new Date().toISOString();
    testType.result = TEST_TYPE_RESULTS.SUCCESSFUL;
  }

  private failTestType(testType: TestTypeModel) {
    testType.endTime = new Date().toISOString();
    testType.result = TEST_TYPE_RESULTS.UNSUCCESSFUL;
  }

  endTestType(testType: TestTypeModel) {
    this.checkPass(testType) ? this.passTestType(testType) : this.failTestType(testType);
  }

  setTestResult(testType: TestTypeModel): TEST_TYPE_RESULTS {
    let result;
    let criticalDeficienciesArr: DefectDetailsModel[] = [];
    if (testType.abandonment.reasons.length) return TEST_TYPE_RESULTS.ABANDONED;
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
      )
      result = criticalDefStatus ? TEST_TYPE_RESULTS.PRS : TEST_TYPE_RESULTS.FAIL;
    }
    return result;
  }



}
