import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TestReportService } from "../../../providers/test-report/test-report.service";
import { AppConfig } from "../../../../config/app.config";
import { TestReportModel } from "../../../models/tests/test-report.model";

@IonicPage()
@Component({
  selector: 'page-test-submitted',
  templateUrl: 'test-submitted.html'
})
export class TestSubmittedPage {
  testReport: TestReportModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private socialSharing: SocialSharing,
              private testReportService: TestReportService) {
    this.testReport = this.testReportService.getTestReport();
  }

  finishTest(): void {
    this.navCtrl.popTo(this.navCtrl.getByIndex(2));
  }

  printAllDocuments(): void {
    let options = {
      message: 'The following certificates have now been issued',
      subject: 'Certificates',
      files: [AppConfig.BACKEND_GET_CERTIFICATE],
      url: AppConfig.BACKEND_GET_CERTIFICATE,
      chooserTitle: 'Pick an app'
    };
    this.socialSharing.shareWithOptions(options);
  }
}
