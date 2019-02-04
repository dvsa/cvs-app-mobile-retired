import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestModel } from "../../../../models/tests/test.model";
import { TestService } from "../../../../providers/test/test.service";
import { TEST_REPORT_STATUSES } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-test-cancel',
  templateUrl: 'test-cancel.html',
})
export class TestCancelPage {
  testData: TestModel;
  cancellationReason: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private testReportService: TestService,
              private alertCtrl: AlertController) {
    this.testData = this.navParams.get('test');
  }

  onSubmit() {
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
