import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AbandonmentReasonItemModel } from "../../../../models/tests/abandonment-reason-item.model";
import { TestAbandonmentReasonsData } from "../../../../assets/app-data/abandon-data/test-abandonment-reasons.data";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { APP_STRINGS } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-reasons-selection',
  templateUrl: 'reasons-selection.html',
})
export class ReasonsSelectionPage {
  vehicleTest: TestTypeModel;
  selectedReasons: string[] = [];
  reasonsList: AbandonmentReasonItemModel[];
  altAbandon: boolean;
  fromTestReview: boolean;

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.vehicleTest = this.navParams.get('vehicleTest');
    this.altAbandon = this.navParams.get('altAbandon');
    this.fromTestReview = this.navParams.get('fromTestReview');
    this.reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsData.map(reason => {
      return {
        text: reason,
        isChecked: false
      }
    });
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.TEST);
  }

  onNext() {
    this.navCtrl.push('TestAbandoningPage', {
      vehicleTest: this.vehicleTest,
      selectedReasons: this.selectedReasons,
      editMode: true,
      altAbandon: this.altAbandon,
      fromTestReview: this.fromTestReview
    });
  }

  onCheck(reason: AbandonmentReasonItemModel) {
    reason.isChecked=!reason.isChecked;
    reason.isChecked ? this.selectedReasons.push(reason.text) : this.selectedReasons.splice(this.selectedReasons.indexOf(reason.text), 1);
  }

}
