import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { TestAbandonmentReasonsData } from "../../../../../config/data/test-abandonment-reasons.data";
import { AbandonmentReasonItemModel } from "../../../../models/abandonment-reason-item.model";

@IonicPage()
@Component({
  selector: 'page-reasons-selection',
  templateUrl: 'reasons-selection.html',
})
export class ReasonsSelectionPage {
  vehicleTest: VehicleTestModel;
  selectedReasons: string[] = [];
  reasonsList: AbandonmentReasonItemModel[];

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.vehicleTest = this.navParams.get('vehicleTest');
    this.reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsData.map(reason => {
      return {
        text: reason,
        isChecked: false
      }
    });
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Test');
  }

  onNext() {
    this.navCtrl.push('TestAbandoningPage', {
      vehicleTest: this.vehicleTest,
      selectedReasons: this.selectedReasons,
      editMode: true
    });
  }

  onCheck(reason: AbandonmentReasonItemModel) {
    reason.isChecked ? this.selectedReasons.push(reason.text) : this.selectedReasons.splice(this.selectedReasons.indexOf(reason.text), 1);
  }

}
