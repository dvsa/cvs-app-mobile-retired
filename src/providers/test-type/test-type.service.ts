import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from "../natives/storage.service";
import { from } from "rxjs/observable/from";
import { STORAGE, TEST_TYPE_RESULTS } from "../../app/app.enums";
import { TestTypeModel } from "../../models/tests/test-type.model";
import { DefectDetailsModel } from "../../models/defects/defect-details.model";
import { VisitService } from "../visit/visit.service";

@Injectable()
export class TestTypeService {

  constructor(private storageService: StorageService, public visitService: VisitService) {
  }

  createTestType(testTypeName: string): TestTypeModel {
    let newTestType = {} as TestTypeModel;
    newTestType.name = testTypeName;
    newTestType.startTime = new Date().toISOString();
    newTestType.abandonment = {
      reasons: []
    }
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
    this.visitService.updateVisit();
  }

  private failTestType(testType: TestTypeModel) {
    testType.endTime = new Date().toISOString();
    testType.result = TEST_TYPE_RESULTS.UNSUCCESSFUL;
    this.visitService.updateVisit();
  }

  endTestType(testType: TestTypeModel) {
    this.checkPass(testType) ? this.passTestType(testType) : this.failTestType(testType);
  }

}
