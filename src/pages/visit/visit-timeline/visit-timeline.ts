import { Component, OnInit } from '@angular/core';
import { AlertController, Events, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { TestService } from "../../../providers/test/test.service";
import { TestModel } from "../../../models/tests/test.model";
import { VisitService } from "../../../providers/visit/visit.service";
import { VisitModel } from "../../../models/visit/visit.model";
import { StateReformingService } from "../../../providers/global/state-reforming.service";
import { APP, APP_STRINGS, STORAGE, TEST_REPORT_STATUSES, TEST_TYPE_RESULTS } from "../../../app/app.enums";
import { StorageService } from "../../../providers/natives/storage.service";

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
  loading = this.loadingCtrl.create({
    content: APP_STRINGS.END_VISIT_LOADING
  });

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private testReportService: TestService,
              private visitService: VisitService,
              public stateReformingService: StateReformingService,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private storageService: StorageService,
              public events: Events,
              private toastCtrl: ToastController) {
    this.timeline = [];
  }

  ngOnInit() {
    this.visit = Object.keys(this.visitService.visit).length ? this.visitService.visit : this.visitService.createVisit(this.navParams.get('testStation'));
    if (this.visitService.easterEgg == 'false') this.stateReformingService.saveNavStack(this.navCtrl);
    this.events.subscribe(APP.TEST_SUBMITTED, () => {
      const TOAST = this.toastCtrl.create({
        message: APP_STRINGS.SUBMIT_TEST_TOAST_MESSAGE,
        duration: 4000,
        position: 'top',
        cssClass: 'submit-toast'
      });
      TOAST.present();
    });
    if (this.visitService.caching == 'true') this.stateReformingService.saveNavStack(this.navCtrl);
  }

  ionViewWillEnter() {
    this.createTimeline();
  }

  endVisit(): void {
    this.showConfirm();
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

  showConfirm(): void {
    const CONFIRM = this.alertCtrl.create({
      title: APP_STRINGS.END_VISIT_TITLE,
      message: `${APP_STRINGS.END_VISIT_MSG}${this.visit.testStationName}.`,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          role: 'cancel'
        },
        {
          text: APP_STRINGS.CONFIRM,
          handler: () => {
            this.loading.present();
            this.visitService.endVisit(this.visit.id).subscribe(
              () => {
                this.storageService.delete(STORAGE.VISIT);
                this.storageService.delete(STORAGE.STATE);
                this.visitService.visit = {} as VisitModel;
                this.loading.dismissAll();
                this.navCtrl.push('EndVisitConfirmPage', {testStationName: this.visit.testStationName});
              });
          }
        }
      ]
    });
    CONFIRM.present();
  }
}
