import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { WaitTimeReasonsData } from '../../../assets/app-data/wait-time-data/wait-time-reasons.data';
import { WaitReasonItemModel } from '../../../models/visit/wait-reason-item.model';
import { AbandonmentReasonItemModel } from '../../../models/tests/abandonment-reason-item.model';
import { ActivityModel } from '../../../models/visit/activity.model';
import { APP_STRINGS, WAIT_TIME_REASONS } from '../../../app/app.enums';

@IonicPage()
@Component({
  selector: 'page-wait-time-reasons',
  templateUrl: 'wait-time-reasons.html'
})
export class WaitTimeReasonsPage {
  reasonsList: WaitReasonItemModel[];
  selectedReasons: string[];
  notes: string;
  waitActivity: ActivityModel;
  WAIT_REASONS = WAIT_TIME_REASONS;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController
  ) {
    this.waitActivity = this.navParams.get('waitActivity');
  }

  ngOnInit() {
    this.selectedReasons =
      this.waitActivity.waitReason.length > 0 ? this.waitActivity.waitReason : [];
    this.reasonsList = WaitTimeReasonsData.WaitTimeReasonsData.map((reason) => {
      return {
        text: reason,
        isChecked: this.isItChecked(reason)
      };
    });
    this.notes = this.waitActivity.notes;
  }

  onSave(selectedReasons: string[]) {
    let message = '';
    selectedReasons.forEach((elem) => {
      if (elem == WAIT_TIME_REASONS.SITE_ISSUE) {
        message = APP_STRINGS.WAIT_REASONS_MSG_ISSUE;
      } else if (elem == WAIT_TIME_REASONS.OTHER) {
        message = APP_STRINGS.WAIT_REASONS_MSG_OTHER;
      }
    });
    const CONFIRM = this.alertCtrl.create({
      title: APP_STRINGS.WAIT_REASONS_TITLE,
      message: message,
      buttons: [
        {
          text: APP_STRINGS.OK,
          role: 'cancel'
        }
      ]
    });

    if (
      (selectedReasons.indexOf(WAIT_TIME_REASONS.SITE_ISSUE) > -1 && this.notes === '') ||
      (selectedReasons.indexOf(WAIT_TIME_REASONS.OTHER) > -1 && this.notes === '')
    ) {
      CONFIRM.present();
    } else {
      this.waitActivity.waitReason = selectedReasons;
      this.waitActivity.notes = this.notes;
      this.viewCtrl.dismiss({ waitActivity: this.waitActivity });
    }
  }

  onCheck(reason: AbandonmentReasonItemModel, selectedReasons) {
    reason.isChecked
      ? selectedReasons.push(reason.text)
      : selectedReasons.splice(selectedReasons.indexOf(reason.text), 1);
  }

  isItChecked(reason) {
    return this.waitActivity.waitReason.indexOf(reason) !== -1;
  }
}
