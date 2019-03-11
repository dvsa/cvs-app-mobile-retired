import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TestModel } from "../../../../models/tests/test.model";
import { TestService } from "../../../../providers/test/test.service";
import { APP_STRINGS, TEST_REPORT_STATUSES } from "../../../../app/app.enums";
import { TestResultService } from "../../../../providers/test-result/test-result.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { Observable } from "rxjs";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";

@IonicPage()
@Component({
  selector: 'page-test-cancel',
  templateUrl: 'test-cancel.html',
})
export class TestCancelPage {
  testData: TestModel;
  cancellationReason: string = '';
  changeOpacity; nextAlert; tryAgain: boolean = false;
 
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private testReportService: TestService,
              private alertCtrl: AlertController,
              private testResultService: TestResultService,
              private openNativeSettings: OpenNativeSettings,
              private visitService: VisitService,
              private loadingCtrl: LoadingController) {
    this.testData = this.navParams.get('test');
  }

  onSubmit() {
    this.changeOpacity = true;
    let alert;
    if (this.isValidReason()) {
      alert = this.alertCtrl.create({
        title: 'Cancel test',
        message: 'You will not be able to make changes to this test after it has been cancelled.',
        buttons: [
          {
            text: 'Back'
          },
          {
            text: 'Submit',
            cssClass: 'danger-action-button',
            handler: () => {
              this.testData.status = TEST_REPORT_STATUSES.CANCELLED;
              this.testData.reasonForCancellation = this.cancellationReason;
              this.testReportService.endTestReport(this.testData);
              this.nextAlert = true;
              this.submit(this.testData);
            }
          }
        ]
      });
    } else {
      this.cancellationReason = '';
      alert = this.alertCtrl.create({
        title: 'Reason not entered',
        message: 'You must add a reason for cancelling this test to submit the cancellation.',
        buttons: ['Ok']
      });
    }
    alert.present();
    alert.onDidDismiss(() => this.changeOpacity = this.nextAlert);
  }

  submit(test) {
    let stack: Observable<any>[] = [];
    const TRY_AGAIN_ALERT = this.alertCtrl.create({
      title: APP_STRINGS.UNABLE_TO_SUBMIT_TESTS_TITLE,
      message: APP_STRINGS.UNABLE_TO_SUBMIT_TESTS_TEXT,
      buttons: [{
        text: APP_STRINGS.SETTINGS_BTN,
        handler: () => {
          this.openNativeSettings.open('settings');
        }
      }, {
        text: APP_STRINGS.TRY_AGAIN_BTN,
        handler: () => {
          this.tryAgain = true; 
          this.submit(this.testData);
        }
      }]
    });

    const LOADING = this.loadingCtrl.create({
      content: 'Loading...'
    });
    LOADING.present();

    for (let vehicle of test.vehicles) {
      let testResult = this.testResultService.createTestResult(this.visitService.visit, test, vehicle);
      stack.push(this.testResultService.submitTestResult(testResult));
      Observable.forkJoin(stack).subscribe(
        () => {
          LOADING.dismiss();
          this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 6));
        },
        () => {
          LOADING.dismiss();
          TRY_AGAIN_ALERT.present();
          TRY_AGAIN_ALERT.onDidDismiss(() => {
            if(!this.tryAgain) {
              this.nextAlert = this.changeOpacity = false; 
            }
            else {
              this.tryAgain = false;
            }
          });
        }
      )
    }
  }

  isValidReason() {
    return this.cancellationReason.trim().length > 0;
  }

}
