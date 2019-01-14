import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestService } from "../../../providers/test/test.service";
import { TestModel } from "../../../models/tests/test.model";
import { VisitService } from "../../../providers/visit/visit.service";
import { VisitModel } from "../../../models/visit/visit.model";
import { StateReformingService } from "../../../providers/global/state-reforming.service";

@IonicPage()
@Component({
  selector: 'page-visit-timeline',
  templateUrl: 'visit-timeline.html'
})
export class VisitTimelinePage implements OnInit {
  visit: VisitModel;
  timeline: TestModel[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private testReportService: TestService, private visitService: VisitService, public stateReformingService: StateReformingService) {
    this.timeline = [];
  }

  ngOnInit() {
    this.visit = Object.keys(this.visitService.visit).length ? this.visitService.visit : this.visitService.createVisit(this.navParams.get('atf'));
    this.stateReformingService.saveNavStack(this.navCtrl);
  }

  ionViewWillEnter() {
    this.createTimeline();
  }

  endVisit(): void {
    this.visitService.endVisit();
    this.navCtrl.popToRoot();
    alert(JSON.stringify(this.visit));
  }

  createNewTestReport(): void {
    let test = this.testReportService.createTest();
    this.visitService.addTest(test);
    this.navCtrl.push('VehicleLookupPage', {test: test});
  }

  addWaitTime(): void {

  }

  goToATFIssue(): void {
    this.navCtrl.push('ATFIssuePage');
  }

  private createTimeline(): void {
    this.timeline = [];
    let testReports = this.visitService.getTests();
    testReports.forEach(testReport => {
      this.timeline.push(testReport);
    });
  }

  getTestReportTitle(testReport: TestModel) {
    this.testReportService.getTestReportTitle(testReport);
  }

}
