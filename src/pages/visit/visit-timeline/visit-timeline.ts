import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestService } from "../../../providers/test/test.service";
import { TestModel } from "../../../models/tests/test.model";
import { VisitService } from "../../../providers/visit/visit.service";
import { VisitModel } from "../../../models/visit/visit.model";
import { StateReformingService } from "../../../providers/global/state-reforming.service";
import { TEST_REPORT_STATUSES, TEST_TYPE_RESULTS } from "../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-visit-timeline',
  templateUrl: 'visit-timeline.html'
})
export class VisitTimelinePage implements OnInit {
  visit: VisitModel;
  timeline: TestModel[];
  TEST_REPORT_STATUS = TEST_REPORT_STATUSES;
  TEST_TYPE_RESULT = TEST_TYPE_RESULTS;

  constructor(public navCtrl: NavController, private navParams: NavParams, private testReportService: TestService, private visitService: VisitService, public stateReformingService: StateReformingService) {
    this.timeline = [];
  }

  ngOnInit() {
    this.visit = Object.keys(this.visitService.visit).length ? this.visitService.visit : this.visitService.createVisit(this.navParams.get('testStation'));
    if (this.visitService.easterEgg == 'false') this.stateReformingService.saveNavStack(this.navCtrl);
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

  private createTimeline(): void {
    this.timeline = [];
    let testReports = this.visitService.getTests();
    testReports.forEach(testReport => {
      this.timeline.push(testReport);
    });
  }

}
