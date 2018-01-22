import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { VehicleLookupPage } from '../../testing/testCreation/vehicleLookup/vehicleLookup';
import { ATFIssuePage } from '../../atfIssue/atfIssue';

import { Visit } from '../../../models/visit';
import { TestReport } from '../../../models/testReport';

@Component({
  selector: 'page-visitTimeline',
  templateUrl: 'visitTimeline.html'
})
export class VisitTimelinePage {

  visit: Visit;
  timeline: Object[];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.visit = new Visit(navParams.get('atf'));
    this.timeline = [];
  }

  ngOnInit() {
    this.visit.startVisit();
  }

  ionViewWillEnter() {
    this.createTimeline();
  }

  endVisit() {
    this.visit.endVisit();
    this.navCtrl.popToRoot();
    alert(JSON.stringify(this.visit));
  }

  createNewTestReport() {
    var testReport = new TestReport();
    this.visit.addTestReport(testReport);
    testReport.startTestReport();

    this.navCtrl.push(VehicleLookupPage, {'testReport': testReport, 'visit': this.visit})
  }

  createTimeline() {
    this.timeline = [];
    var testReports = this.visit.getTestReports();
    testReports.forEach(testReport => {
      this.timeline.push(testReport);
    });
  }

  addWaitTime() {
    
  }

  addATFIssue() {
    this.navCtrl.push(ATFIssuePage);
  }
}
