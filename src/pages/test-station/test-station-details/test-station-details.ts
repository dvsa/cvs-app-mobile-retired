import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TestStationReferenceDataModel } from '../../../models/reference-data-models/test-station.model';
import { APP_STRINGS } from "../../../app/app.enums";
import { PhoneService } from "../../../providers/natives/phone.service";

@IonicPage()
@Component({
  selector: 'page-test-station-details',
  templateUrl: 'test-station-details.html'
})
export class TestStationDetailsPage implements OnInit {
  testStation: TestStationReferenceDataModel;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private phoneService: PhoneService) {
    this.testStation = navParams.get('testStation');
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.SEARCH_TEST_STATION);
  }

  startVisit(): void {
    let confirm = this.alertCtrl.create({
      title: APP_STRINGS.TEST_STATION_SAFETY,
      subTitle: `Confirm that you are at ${this.testStation.testStationName} (${this.testStation.testStationPNumber}) and that it is suitable to begin testing before continuing.`,
      buttons: [
        {
          text: APP_STRINGS.CONFIRM,
          handler: () => {
            this.navCtrl.push('VisitTimelinePage', {testStation: this.testStation});
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
      title: `${this.testStation.testStationContactNumber}`,
      buttons: [
        {
          text: APP_STRINGS.CANCEL
        },
        {
          text: APP_STRINGS.CALL,
          handler: () => {
            this.phoneService.callPhoneNumber(this.testStation.testStationContactNumber);
          }
        }
      ]
    });
    confirm.present();
  }
}
