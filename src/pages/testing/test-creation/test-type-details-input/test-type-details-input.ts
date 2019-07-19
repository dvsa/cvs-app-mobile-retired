import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavParams, TextInput, ViewController } from 'ionic-angular';
import { APP_STRINGS, TEST_TYPE_FIELDS, REG_EX_PATTERNS } from "../../../../app/app.enums";

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
  testTypeFields;
  patterns;
  errorIncomplete: boolean;

  @ViewChild('valueInput') valueInput: TextInput;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private cdRef: ChangeDetectorRef,
              private alertCtrl: AlertController) {
    this.vehicleCategory = this.navParams.get('vehicleCategory');
    this.sectionName = this.navParams.get('sectionName');
    this.input = this.navParams.get('input');
    this.fromTestReview = this.navParams.get('fromTestReview');
    this.inputValue = this.navParams.get('existentValue');
    this.errorIncomplete = this.navParams.get('errorIncomplete');
  }

  ngOnInit() {
    this.testTypeFields = TEST_TYPE_FIELDS;
    this.patterns = REG_EX_PATTERNS;
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.valueInput.setFocus();
    }, 150);
  }

  valueInputChange(value) {
    this.cdRef.detectChanges();
    this.inputValue = value.length > 3 ? value.substring(0, 3) : value;
  }

  onCancel() {
    this.viewCtrl.dismiss({fromTestReview: this.fromTestReview});
  }

  onDone() {
    this.inputValue && this.inputValue.length ? this.errorIncomplete = false : this.errorIncomplete = true;
    if (this.vehicleCategory === 'B' && (this.inputValue && this.inputValue.charAt(0) === '0' || !this.inputValue)) {
      const ALERT = this.alertCtrl.create({
        title: APP_STRINGS.NO_SEATBELTS_ENTERED,
        subTitle: APP_STRINGS.NO_SEATBELTS_ENTERED_SUBTITLE,
        buttons: [APP_STRINGS.OK]
      });
      ALERT.present();
    } else {
      this.viewCtrl.dismiss({
        inputValue: this.inputValue,
        fromTestReview: this.fromTestReview,
        errorIncomplete: this.errorIncomplete
      });
    }
  }

}
