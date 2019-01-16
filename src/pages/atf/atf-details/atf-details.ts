import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AtfReferenceDataModel } from '../../../models/reference-data-models/atf.model';
import { APP_STRINGS } from "../../../app/app.enums";
import { PhoneService } from "../../../providers/natives/phone.service";

@IonicPage()
@Component({
  selector: 'page-atf-details',
  templateUrl: 'atf-details.html'
})
export class ATFDetailsPage implements OnInit {
  atf: AtfReferenceDataModel;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private phoneService: PhoneService) {
    this.atf = navParams.get('atf');
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.SEARCH_ATF);
  }

  startVisit(): void {
    let confirm = this.alertCtrl.create({
      title: APP_STRINGS.ATF_SAFETY,
      subTitle: `Confirm that you are at ${this.atf.atfName} (${this.atf.atfNumber}) and that it is suitable to begin testing before continuing.`,
      buttons: [
        {
          text: APP_STRINGS.CONFIRM,
          handler: () => {
            this.navCtrl.push('VisitTimelinePage', {atf: this.atf});
          }
        },
        {
          text: APP_STRINGS.REPORT_ISSUE,
          cssClass: 'danger-action-button',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: APP_STRINGS.REPORT_TITLE,
              subTitle: APP_STRINGS.SPEAK_TO_TTL,
              buttons: [APP_STRINGS.OK]
            });
            alert.present();
          }
        },
        {
          text: APP_STRINGS.CANCEL,
        }
      ]
    });
    confirm.present();
  }

  callNumber(): void {
    let confirm = this.alertCtrl.create({
      title: `${this.atf.atfContactNumber}`,
      buttons: [
        {
          text: APP_STRINGS.CANCEL
        },
        {
          text: APP_STRINGS.CALL,
          handler: () => {
            this.phoneService.callPhoneNumber(this.atf.atfContactNumber);
          }
        }
      ]
    });
    confirm.present();
  }
}
