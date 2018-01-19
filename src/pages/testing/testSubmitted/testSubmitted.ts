import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { RESTRICTED_CONFIG, RestrictedConfig } from '../../../../restricted.config';

import { TestReport } from '../../../models/testReport';

import { PrintPage } from './print/print';

@Component({
  selector: 'page-testSubmitted',
  templateUrl: 'testSubmitted.html'
})
export class TestSubmittedPage {

  testReport: TestReport;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, @Inject(RESTRICTED_CONFIG) private restrictedConfig) {
    this.testReport = navParams.get('testReport');
  }

  finishTest() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(2));
  }

  printAllDocuments() {
    // this.navCtrl.push(PrintPage);
    var options = {
      message: 'The following certificates have now been issued',
      subject: 'Certificates',
      files: [this.restrictedConfig.apis.getCertificate.url],
      url: this.restrictedConfig.apis.getCertificate.url,
      chooserTitle: 'Pick an app'
    };
    this.socialSharing.shareWithOptions(options);
  }
}
