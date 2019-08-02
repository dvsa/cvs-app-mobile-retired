import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from "../natives/storage.service";
import { from } from "rxjs/observable/from";
import { DEFICIENCY_CATEGORY, STORAGE, TEST_TYPE_RESULTS, FIREBASE_DEFECTS, VEHICLE_TYPE } from "../../app/app.enums";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { DefectDetailsModel } from "../../models/defects/defect-details.model";
import { VisitService } from "../visit/visit.service";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { CommonFunctionsService } from "../utils/common-functions";
import { FirebaseLogsService } from '../firebase-logs/firebase-logs.service';

@Injectable()
export class TestTypeService {

  constructor(private storageService: StorageService,
              public visitService: VisitService,
              public commonFunctions: CommonFunctionsService,
              private firebaseLogsService: FirebaseLogsService
  ) {
  }

  createTestType(testType: TestTypesReferenceDataModel, vehicleType: string): TestTypeModel {
    let newTestType = {} as TestTypeModel;
    newTestType.name = testType.name;
    newTestType.testTypeName = testType.testTypeName;
    newTestType.testTypeId = testType.id;
    newTestType.certificateNumber = null;
    newTestType.testTypeStartTimestamp = new Date().toISOString();
    newTestType.testTypeEndTimestamp = null;
    if (vehicleType === VEHICLE_TYPE.PSV) {
      newTestType.numberOfSeatbeltsFitted = null;
      newTestType.lastSeatbeltInstallationCheckDate = null;
      newTestType.seatbeltInstallationCheckDate = null;
    }
    newTestType.testResult = null;
    newTestType.prohibitionIssued = false;
    newTestType.reasonForAbandoning = null;
    newTestType.reasons = [];
    newTestType.additionalCommentsForAbandon = null;
    newTestType.additionalNotesRecorded = null;
    newTestType.defects = [];
    newTestType.linkedIds = testType.linkedIds;
    this.visitService.updateVisit();
    return newTestType
  }

  endTestType(testType: TestTypeModel) {
    testType.testTypeEndTimestamp = new Date().toISOString();
  }


  addDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    testType.defects.push(defect);
    this.visitService.updateVisit();
    this.logFirebaseAddDefect(defect.deficiencyRef);
  }

  private logFirebaseAddDefect(deficiencyRef: string) {
    this.firebaseLogsService.logEvent(FIREBASE_DEFECTS.ADD_DEFECT, FIREBASE_DEFECTS.DEFICIENCY_REFERENCE, deficiencyRef);

    let parameters = this.firebaseLogsService[FIREBASE_DEFECTS.ADD_DEFECT_TIME_TAKEN];
    parameters[FIREBASE_DEFECTS.ADD_DEFECT_END_TIME] = Date.now();
    parameters[FIREBASE_DEFECTS.ADD_DEFECT_TIME_TAKEN] = this.firebaseLogsService.differenceInHMS(parameters[FIREBASE_DEFECTS.ADD_DEFECT_START_TIME], parameters[FIREBASE_DEFECTS.ADD_DEFECT_END_TIME])
    this.firebaseLogsService.logEvent(FIREBASE_DEFECTS.ADD_DEFECT_TIME_TAKEN,
      FIREBASE_DEFECTS.ADD_DEFECT_START_TIME, parameters[FIREBASE_DEFECTS.ADD_DEFECT_START_TIME],
      FIREBASE_DEFECTS.ADD_DEFECT_END_TIME, parameters[FIREBASE_DEFECTS.ADD_DEFECT_END_TIME],
      FIREBASE_DEFECTS.ADD_DEFECT_TIME_TAKEN, parameters[FIREBASE_DEFECTS.ADD_DEFECT_TIME_TAKEN]);
  }

  removeDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    let defIdx = testType.defects.map((e) => {
      return e.deficiencyRef
    }).indexOf(defect.deficiencyRef);
    testType.defects.splice(defIdx, 1);
    this.visitService.updateVisit();
    this.logFirebaseRemoveDefect(defect.deficiencyRef);
  }

  private logFirebaseRemoveDefect(deficiencyRef: string) {
    this.firebaseLogsService.logEvent(FIREBASE_DEFECTS.REMOVE_DEFECT, FIREBASE_DEFECTS.DEFICIENCY_REFERENCE, deficiencyRef);
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
