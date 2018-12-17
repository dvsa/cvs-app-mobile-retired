import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VisitModel } from '../../../models/visit.model';
import { TestReportService } from "../../../providers/test-report/test-report.service";
import { TestReportModel } from "../../../models/tests/test-report.model";

@IonicPage()
@Component({
  selector: 'page-visit-timeline',
  templateUrl: 'visit-timeline.html'
})
export class VisitTimelinePage implements OnInit {
  visit: VisitModel;
  timeline: TestReportModel[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private testReportService: TestReportService) {
    this.visit = new VisitModel(navParams.get('atf'));
    this.timeline = [];
  }

  ngOnInit() {
    this.visit.startVisit();
  }

  ionViewWillEnter() {
    this.createTimeline();
  }

  endVisit(): void {
    this.visit.endVisit();
    this.navCtrl.popToRoot();
    alert(JSON.stringify(this.visit));
  }

  createNewTestReport(): void {
    this.testReportService.createTestReport();
    const testReport = this.testReportService.getTestReport();
    this.visit.addTestReport(testReport);

    this.navCtrl.push('VehicleLookupPage', {
      visit: this.visit
    })
  }

  addWaitTime(): void {

  }

  addATFIssue(): void {
    this.navCtrl.push('ATFIssuePage');
  }

  private createTimeline(): void {
    this.timeline = [];
    let testReports = this.visit.getTestReports();
    testReports.forEach(testReport => {
      this.timeline.push(testReport);
    });
  }

  getTestReportTitle(testReport: TestReportModel) {
    this.testReportService.getTestReportTitle(testReport);
  }

}
