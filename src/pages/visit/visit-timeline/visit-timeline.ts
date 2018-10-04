import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VisitModel} from '../../../models/visit.model';
import {TestReportModel} from '../../../models/test-report.model';

@IonicPage()
@Component({
  selector: 'page-visit-timeline',
  templateUrl: 'visit-timeline.html'
})
export class VisitTimelinePage implements OnInit {
  visit: VisitModel;
  timeline: Object[];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
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
    let testReport: TestReportModel = new TestReportModel();
    this.visit.addTestReport(testReport);
    testReport.startTestReport();

    this.navCtrl.push('VehicleLookupPage', {
      testReport: testReport,
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
}
