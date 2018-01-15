import { Atf } from './atf';
import { TestReport } from './testReport';

export class Visit {
    private startTime: Date;
    private endTime: Date;
    private atf: Atf;
    private testReports: TestReport[];

    constructor(atf: Atf) {
        this.atf = atf;
        this.testReports = [];
    }

    startVisit() {
        this.startTime = new Date();
    }

    endVisit() {
        this.endTime = new Date();
    }

    addTestReport(testReport: TestReport) {
        this.testReports.push(testReport);
    }

    removeTestReport(testReportToRemove: TestReport) {
        this.testReports.forEach((testReport, index)  => {
            if (testReport == testReportToRemove) {
                this.testReports.splice(index, 1);
            }
        })
    }

    getTestReports(): TestReport[] {
        return this.testReports;
    }

    saveVisit() {
        
    }
}