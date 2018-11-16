import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DefectModel} from "../../../../models/defect.model";

@IonicPage()
@Component({
  selector: 'page-advisory-details',
  templateUrl: 'advisory-details.html',
})
export class AdvisoryDetailsPage {
  parentCategory;
  defectRef;
  test;
  advisory: DefectModel;
  notes;

  parentDefectCategory;
  parentDefectCategoryId;
  parentDefectItem;
  parentDefectItemId;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parentCategory = navParams.get('parentCategory');
    this.test = navParams.get('test');
    this.defectRef = navParams.get('defectRef');

    this.parentDefectCategory = navParams.get('parentDefectCategory');
    this.parentDefectCategoryId = navParams.get('parentDefectCategoryId');
    this.parentDefectItem = navParams.get('parentDefectItem');
    this.parentDefectItemId = navParams.get('parentDefectItemId');
  }

  cancelAdvisory() {
    this.navCtrl.pop();
  }

  submitAdvisory(): void {
    this.advisory = new DefectModel(this.defectRef, this.notes, 'Advisory');
    this.advisory.parentDefectCategory = this.parentDefectCategory;
    this.advisory.parentDefectCategoryId = this.parentDefectCategoryId;
    this.advisory.parentDefectItem = this.parentDefectItem;
    this.advisory.parentDefectItemId = this.parentDefectItemId;
    let views = this.navCtrl.getViews();
    for (let i = views.length - 1; i >= 0; i--) {
      if (views[i].component.name == "CompleteTestPage") {
        this.test.addDefect(this.advisory);
        console.log('vehicle test: ', this.test);
        this.navCtrl.popTo(views[i]);
      }
    }
  }
}
