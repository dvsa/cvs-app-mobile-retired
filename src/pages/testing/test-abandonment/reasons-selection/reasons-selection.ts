import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AbandonmentReasonItemModel } from '../../../../models/tests/abandonment-reason-item.model';
import { TestAbandonmentReasonsData } from '../../../../assets/app-data/abandon-data/test-abandonment-reasons.data';
import { TestTypeModel } from '../../../../models/tests/test-type.model';
import { APP_STRINGS, VEHICLE_TYPE } from '../../../../app/app.enums';
import { TirTestTypesData } from '../../../../assets/app-data/test-types-data/tir-test-types.data';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private testTypeService: TestTypeService,
  ) {
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
      fromTestReview: this.fromTestReview,
    });
  }

  onCheck(reason: AbandonmentReasonItemModel) {
    reason.isChecked = !reason.isChecked;
    reason.isChecked
      ? this.selectedReasons.push(reason.text)
      : this.selectedReasons.splice(this.selectedReasons.indexOf(reason.text), 1);
  }

  populateReasonList(vehicleType: string): string[] {
    let reasonsList: string[];
    if (this.testTypeService.isSpecialistTestType(this.vehicleTest.testTypeId)) {
      reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsSpecialistTestTypesData;
    } else {
      if (vehicleType === VEHICLE_TYPE.PSV) {
        reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsPsvData;
      } else {
        if (this.testTypeService.isTirTestType(this.vehicleTest.testTypeId)) {
          reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsTirTestTypesData;
        } else {
          reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsHgvTrailerData;
        }
      }
    }
    return reasonsList;
  }

  transformReasons(vehicleType: string): { text: string; isChecked: boolean }[] {
    const reasonsList: string[] = this.populateReasonList(vehicleType);
    return reasonsList.map((reason) => {
      return {
        text: reason,
        isChecked: false,
      };
    });
  }
}
