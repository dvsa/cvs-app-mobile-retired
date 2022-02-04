import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APP_STRINGS, PAGE_NAMES } from '../../app/app.enums';
import { StateReformingService } from '../../providers/global/state-reforming.service';
import { AppAlertService } from '../../providers/global';

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html'
})
export class ConfirmationPage {
  testStationName: string;
  testerEmailAddress: string;
  message: string;
  additionalMessage: string;
  additionalMessageButton: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private stateReformingService: StateReformingService,
    private alertService: AppAlertService
  ) {
    this.testStationName = navParams.get('testStationName');
    this.testerEmailAddress = navParams.get('testerEmailAddress');
  }

  ionViewWillEnter() {
    if (this.testStationName) {
      this.message = APP_STRINGS.CONFIRMATION_MESSAGE_END_VISIT + this.testStationName;
    } else if (this.testerEmailAddress) {
      this.message = APP_STRINGS.CONFIRMATION_MESSAGE_SUBMIT_TEST + this.testerEmailAddress;
      this.additionalMessage = APP_STRINGS.CONFIRMATION_ADDITIONAL_MESSAGE_SUBMIT_TEST;
      this.additionalMessageButton =
        APP_STRINGS.CONFIRMATION_ADDITIONAL_MESSAGE_BUTTON_SUBMIT_TEST;
    }
  }

  pushPage() {
    if (this.testStationName) {
      this.navCtrl.popToRoot();
    } else if (this.testerEmailAddress) {
      let views = this.navCtrl.getViews();
      for (let i = views.length - 1; i >= 0; i--) {
        if (views[i].component.name == PAGE_NAMES.VISIT_TIMELINE_PAGE) {
          this.stateReformingService.onTestReview();
          this.navCtrl.popTo(views[i]);
        }
      }
    }
  }

  callSupport() {
    this.alertService.callSupport();
  }
}
