import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { TestReportModel } from "../../../../models/tests/test-report.model";
import { TestReportService } from "../../../../providers/test-report/test-report.service";
import { TEST_REPORT_STATUSES } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-test-cancel',
  templateUrl: 'test-cancel.html',
})
export class TestCancelPage {
  testReport: TestReportModel;
  cancellationReason: string = '';

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, private testReportService: TestReportService) {
    this.testReport = this.testReportService.getTestReport();
  }

  onSubmit() {
    let alert;
    if (this.isValidReason()) {
      alert = this.alertCtrl.create({
        title: 'Cancel test',
        message: 'You will not be able to make changes to this test after it has been cancelled.',
        buttons: [
          {
            text: 'Back',
            handler: () => {
              this.navCtrl.pop();
            }
          },
          {
            text: 'Submit',
            cssClass: 'danger-action-button',
            handler: () => {
              this.testReport.testStatus = TEST_REPORT_STATUSES.CANCELLED;
              this.testReport.cancellationReason = this.cancellationReason;
              this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 6));
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
  }

  isValidReason() {
    return this.cancellationReason.trim().length > 0;
  }

}
