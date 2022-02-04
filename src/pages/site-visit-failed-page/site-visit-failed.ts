import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APP_STRINGS } from '../../app/app.enums';
import { StateReformingService } from '../../providers/global/state-reforming.service';
import { AppAlertService } from '../../providers/global';

@IonicPage()
@Component({
  selector: 'page-site-visit-failed',
  templateUrl: 'site-visit-failed.html'
})
export class SiteVisitFailedPage {
  messageOne: string;
  messageTwo: string;
  messageThree: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private stateReformingService: StateReformingService,
    private alertService: AppAlertService
  ) {}

  ionViewWillEnter() {
    this.messageOne = APP_STRINGS.FAILED_MESSAGE_END_VISIT_ONE;
    this.messageTwo = APP_STRINGS.FAILED_MESSAGE_END_VISIT_TWO;
    this.messageThree = APP_STRINGS.FAILED_MESSAGE_END_VISIT_THREE;
  }

  async confirm() {
    await this.navCtrl.popToRoot();
  }

  callSupport() {
    this.alertService.callSupport();
  }
}
