import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from "../natives/storage.service";
import { from } from "rxjs/observable/from";
import { DEFICIENCY_CATEGORY, STORAGE, TEST_TYPE_RESULTS } from "../../app/app.enums";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { DefectDetailsModel } from "../../models/defects/defect-details.model";
import { VisitService } from "../visit/visit.service";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";

@Injectable()
export class TestTypeService {

  constructor(private storageService: StorageService, public visitService: VisitService) {
  }

  createTestType(testType: TestTypesReferenceDataModel): TestTypeModel {
    let newTestType = {} as TestTypeModel;
    newTestType.code = '';
    newTestType.name = testType.name;
    newTestType.testTypeName = testType.testTypeName;
    newTestType.id = testType.id;
    newTestType.certificateNumber = '';
    newTestType.expiryDate = '';
    newTestType.startTime = new Date().toISOString();
    newTestType.endTime = '';
    newTestType.seatbeltsNumber = null;
    newTestType.lastSeatbeltInstallationCheckDate = '';
    newTestType.wasSeatbeltInstallationCheckCarriedOut = null;
    newTestType.result = null;
    newTestType.wasProhibitionIssued = null;
    newTestType.abandonment = {
      reasons: [],
      additionalComment: ''
    };
    newTestType.additionalNotes = '';
    newTestType.defects = [];
    this.visitService.updateVisit();
    return newTestType
  }

  addDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    testType.defects.push(defect);
    this.visitService.updateVisit();
  }

  removeDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    let defIdx = testType.defects.map((e) => {
      return e.ref
    }).indexOf(defect.ref);
    testType.defects.splice(defIdx, 1);
    this.visitService.updateVisit();
  }

  getTestTypesFromStorage(): Observable<any> {
    return from(this.storageService.read(STORAGE.TESTTYPES))
  }

  setTestResult(testType: TestTypeModel): TEST_TYPE_RESULTS {
    let result = TEST_TYPE_RESULTS.PASS;
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
