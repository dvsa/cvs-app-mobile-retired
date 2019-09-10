import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavParams, TextInput, ViewController } from 'ionic-angular';
import { APP_STRINGS, REG_EX_PATTERNS, TEST_TYPE_FIELDS, TEST_TYPE_INPUTS } from "../../../../app/app.enums";

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
  testTypesInputs: typeof TEST_TYPE_INPUTS = TEST_TYPE_INPUTS;
  patterns: typeof REG_EX_PATTERNS;
  errorIncomplete: boolean;

  @ViewChild('valueInput') valueInput: TextInput;
  @ViewChild('customValueInput') customValueInput: TextInput;

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
      if (this.valueInput) this.valueInput.setFocus();
      if (this.customValueInput) this.customValueInput.setFocus();
    }, 150);
  }

  valueInputChange(value) {
    this.cdRef.detectChanges();
    switch (this.input.testTypePropertyName) {
      case TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER:
        this.inputValue = value.length > 3 ? value.substring(0, 3) : value;
        break;
      case TEST_TYPE_INPUTS.K_LIMIT:
        this.inputValue = value.length > 10 ? value.substring(0, 10) : value;
        break;
      case TEST_TYPE_INPUTS.PT_SERIAL_NUMBER:
        this.inputValue = value.length > 30 ? value.substring(0, 30) : value;
        break;
      case TEST_TYPE_INPUTS.PT_FITTED:
      case TEST_TYPE_INPUTS.MOD_TYPE_USED:
        this.inputValue = value.length > 40 ? value.substring(0, 40) : value;
        break;
    }
  }

  onCancel() {
    this.viewCtrl.dismiss({fromTestReview: this.fromTestReview});
  }

  onDone() {
    this.inputValue && this.inputValue.length ? this.errorIncomplete = false : this.errorIncomplete = true;
    if (this.vehicleCategory === 'B' && (this.inputValue && this.inputValue.charAt(0) === '0' || !this.inputValue)) {
      const ALERT = this.alertCtrl.create({
        title: APP_STRINGS.NO_SEATBELTS_ENTERED,
        message: APP_STRINGS.NO_SEATBELTS_ENTERED_SUBTITLE,
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
