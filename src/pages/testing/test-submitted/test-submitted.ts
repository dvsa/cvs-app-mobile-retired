import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import {TestReportModel} from '../../../models/test-report.model';
import {API} from "../../../../config/config.enums";

@IonicPage()
@Component({
  selector: 'page-test-submitted',
  templateUrl: 'test-submitted.html'
})
export class TestSubmittedPage {
  testReport: TestReportModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {
    this.testReport = navParams.get('testReport');
  }

  finishTest(): void {
    this.navCtrl.popTo(this.navCtrl.getByIndex(2));
  }

  printAllDocuments(): void {
    let options = {
      message: 'The following certificates have now been issued',
      subject: 'Certificates',
      files: [API.GET_CERTIFICATE],
      url: API.GET_CERTIFICATE,
      chooserTitle: 'Pick an app'
    };
    this.socialSharing.shareWithOptions(options);
  }
}
