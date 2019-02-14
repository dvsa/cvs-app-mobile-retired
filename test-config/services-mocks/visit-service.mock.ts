import { VisitModel } from "../../src/models/visit/visit.model";
import { TestModel } from "../../src/models/tests/test.model";

export class VisitServiceMock {
  visit: VisitModel = {} as VisitModel;

  public createVisit(testStation) {
    this.visit.startTime = new Date().toISOString();
    this.visit.endTime = null;
    this.visit.testStationName = testStation.atfName;
    this.visit.testStationPNumber = testStation.atfNumber;
    this.visit.testStationType = testStation.atfType;
    this.visit.testerId = '';
    this.visit.testerName = '';
    this.visit.tests = [];
    this.updateVisit();
    return this.visit;
  }

  public endVisit() {
    this.visit.endTime = new Date().toISOString();
  }

  public addTest(test: TestModel) {
    this.visit.tests.push(test);
    this.updateVisit();
  }

  public removeTest(testToRemove: TestModel) {
    this.visit.tests.forEach((testReport, index) => {
      if (testReport == testToRemove) {
        this.visit.tests.splice(index, 1);
      }
    })
  }

  public getTests(): TestModel[] {
    return this.visit.tests;
  }

  public updateVisit() {
    return new Promise((resolve) => (resolve(true)));
  }

}
