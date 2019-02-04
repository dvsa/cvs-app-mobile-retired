import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavParams, ViewController } from 'ionic-angular';
import { APP_STRINGS } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-test-type-details-input',
  templateUrl: 'test-type-details-input.html',
})
export class TestTypeDetailsInputPage implements OnInit {

  vehicleCategory;
  sectionName;
  input;
  fromTestReview;
  inputValue: string;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private cdRef: ChangeDetectorRef,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.vehicleCategory = this.navParams.get('vehicleCategory');
    this.sectionName = this.navParams.get('sectionName');
    this.input = this.navParams.get('input');
    this.fromTestReview = this.navParams.get('fromTestReview');
    let existentValue = this.navParams.get('existentValue');
    this.inputValue = existentValue !== null ? existentValue : '0';
  }

  valueInputChange(value) {
    this.cdRef.detectChanges();
    this.inputValue = value.length > 3 ? value.substring(0, 3) : value;
  }

  onCancel() {
    this.viewCtrl.dismiss({fromTestReview: this.fromTestReview});
  }

  onDone() {
    if (this.vehicleCategory === 'B' && this.inputValue.charAt(0) === '0') {
      const ALERT = this.alertCtrl.create({
        title: APP_STRINGS.NO_SEATBELTS_ENTERED,
        subTitle: APP_STRINGS.NO_SEATBELTS_ENTERED_SUBTITLE,
        buttons: [APP_STRINGS.OK]
      });
      ALERT.present();
    } else {
      this.viewCtrl.dismiss({inputValue: this.inputValue, fromTestReview: this.fromTestReview});
    }
  }

}
