import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import {RESTRICTED_CONFIG} from '../../../../restricted.config';
import {TestReportModel} from '../../../models/test-report.model';

@IonicPage()
@Component({
  selector: 'page-test-submitted',
  templateUrl: 'test-submitted.html'
})
export class TestSubmittedPage {
  testReport: TestReportModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, @Inject(RESTRICTED_CONFIG) private restrictedConfig) {
    this.testReport = navParams.get('testReport');
  }

  finishTest(): void {
    this.navCtrl.popTo(this.navCtrl.getByIndex(2));
  }

  printAllDocuments(): void {
    let options = {
      message: 'The following certificates have now been issued',
      subject: 'Certificates',
      files: [this.restrictedConfig.apis.getCertificate.url],
      url: this.restrictedConfig.apis.getCertificate.url,
      chooserTitle: 'Pick an app'
    };
    this.socialSharing.shareWithOptions(options);
  }
}
