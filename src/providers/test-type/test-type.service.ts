import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from "../natives/storage.service";
import { from } from "rxjs/observable/from";
import { DEFICIENCY_CATEGORY, STORAGE, TEST_TYPE_RESULTS } from "../../app/app.enums";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { DefectDetailsModel } from "../../models/defects/defect-details.model";
import { VisitService } from "../visit/visit.service";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { CommonFunctionsService } from "../utils/common-functions";

@Injectable()
export class TestTypeService {

  constructor(private storageService: StorageService, public visitService: VisitService, public commonFunctions: CommonFunctionsService) {
  }

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
    newTestType.prohibitionIssued = false;
    newTestType.reasonForAbandoning = '';
    newTestType.reasons = [];
    newTestType.additionalCommentsForAbandon = '';
    newTestType.additionalNotesRecorded = '';
    newTestType.defects = [];
    if (this.visitService.easterEgg == 'false') this.visitService.updateVisit();
    return newTestType
  }

  endTestType(testType: TestTypeModel) {
    testType.testTypeEndTimestamp = new Date().toISOString();
  }


  addDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    testType.defects.push(defect);
    if (this.visitService.easterEgg == 'false') this.visitService.updateVisit();
  }

  removeDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    let defIdx = testType.defects.map((e) => {
      return e.deficiencyRef
    }).indexOf(defect.deficiencyRef);
    testType.defects.splice(defIdx, 1);
    if (this.visitService.easterEgg == 'false') this.visitService.updateVisit();
  }

  getTestTypesFromStorage(): Observable<any> {
    return from(this.storageService.read(STORAGE.TESTTYPES))
  }

  setTestResult(testType: TestTypeModel, hasDefects: boolean): string | TEST_TYPE_RESULTS {
    let result = hasDefects ? TEST_TYPE_RESULTS.PASS : testType.testResult;
    let criticalDeficienciesArr: DefectDetailsModel[] = [];
    if (testType.reasons.length) return TEST_TYPE_RESULTS.ABANDONED;
    if (testType.defects.length) testType.defects.forEach(
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

  orderTestTypesArray(array, key, order?) {
    return array.sort(this.commonFunctions.orderByStringId(key, order));
  }


}
