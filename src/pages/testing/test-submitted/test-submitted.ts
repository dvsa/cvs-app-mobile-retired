import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TestModel } from "../../../models/tests/test.model";

@IonicPage()
@Component({
  selector: 'page-test-submitted',
  templateUrl: 'test-submitted.html'
})
export class TestSubmittedPage {
  testData: TestModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private socialSharing: SocialSharing) {
    this.testData = this.navParams.get('test');
  }

  finishTest(): void {
    this.navCtrl.popTo(this.navCtrl.getByIndex(2));
  }

  printAllDocuments(): void {
    let options = {
      message: 'The following certificates have now been issued',
      subject: 'Certificates',
      files: [''],
      url: '',
      chooserTitle: 'Pick an app'
    };
    this.socialSharing.shareWithOptions(options);
  }
}
