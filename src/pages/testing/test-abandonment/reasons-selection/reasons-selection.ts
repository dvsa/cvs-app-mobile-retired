import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AbandonmentReasonItemModel } from "../../../../models/tests/abandonment-reason-item.model";
import { TestAbandonmentReasonsData } from "../../../../assets/app-data/abandon-data/test-abandonment-reasons.data";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { APP_STRINGS, VEHICLE_TYPE } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-reasons-selection',
  templateUrl: 'reasons-selection.html',
})
export class ReasonsSelectionPage {
  vehicleTest: TestTypeModel;
  vehicleType: string;
  selectedReasons: string[] = [];
  reasonsList: AbandonmentReasonItemModel[];
  altAbandon: boolean;
  fromTestReview: boolean;

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.vehicleTest = this.navParams.get('vehicleTest');
    this.vehicleType = this.navParams.get('vehicleType');
    this.altAbandon = this.navParams.get('altAbandon');
    this.fromTestReview = this.navParams.get('fromTestReview');
  }

  ionViewWillEnter() {
    this.reasonsList = this.transformReasons(this.vehicleType);
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

  transformReasons(vehicleType: string): { text: string, isChecked: boolean }[] {
    let reasonsList: string[];
    vehicleType === VEHICLE_TYPE.PSV ? reasonsList = [...TestAbandonmentReasonsData.TestAbandonmentReasonsPsvData] :
      reasonsList = [...TestAbandonmentReasonsData.TestAbandonmentReasonsHgvTrailerData];
    return reasonsList.map(reason => {
      return {
        text: reason,
        isChecked: false
      }
    });
  }
}
