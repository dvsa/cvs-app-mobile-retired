import { AtfModel } from './atf.model';
import { TestReportModel } from './test-report.model';

export class VisitModel {
    private startTime: Date;
    private endTime: Date;
    private atf: AtfModel;
    private testReports: TestReportModel[];

    constructor(atf: AtfModel) {
        this.atf = atf;
        this.testReports = [];
    }

    startVisit() {
        this.startTime = new Date();
    }

    endVisit() {
        this.endTime = new Date();
    }

    addTestReport(testReport: TestReportModel) {
        this.testReports.push(testReport);
    }

    removeTestReport(testReportToRemove: TestReportModel) {
        this.testReports.forEach((testReport, index)  => {
            if (testReport == testReportToRemove) {
                this.testReports.splice(index, 1);
            }
        })
    }

    getTestReports(): TestReportModel[] {
        return this.testReports;
    }

    saveVisit() {
        
    }
}
