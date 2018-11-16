import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {VehicleTestModel} from '../../../../models/vehicle-test.model';
import {DefectModel} from "../../../../models/defect.model";

@IonicPage()
@Component({
  selector: 'page-add-defect',
  templateUrl: 'add-defect.html'
})
export class AddDefectPage {
  vehicleTest: VehicleTestModel;
  defectCategories: Object[];
  parentDefectCategory: string;
  parentDefectCategoryId;
  parentDefectItem;
  parentDefectItemId;
  additionalInfo;
  forVehicleType;
  defectClone: DefectModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser) {
    this.vehicleTest = navParams.get('test');
    this.defectCategories = navParams.get('defectCategoryTaxonomy');
    this.parentDefectCategory = navParams.get('parentDefectCategory');
    this.parentDefectCategoryId = navParams.get('parentDefectCategoryId');
    this.parentDefectItem = this.navParams.get('parentDefectItem');
    this.parentDefectItemId = this.navParams.get('parentDefectItemId');
    this.additionalInfo = navParams.get('additionalInfo');
    this.forVehicleType = navParams.get('forVehicleType');
  }

  addDefect(defect: DefectModel): void {
    this.vehicleTest.addDefect(defect);
    this.navCtrl.pop();
  }

  selectedItem(item): void {
    let additionalInfo = this.additionalInfo[this.forVehicleType[0]];
    let defectRef = `${this.parentDefectCategoryId}.${this.parentDefectItemId} (${item.deficiencyId})`;
    this.defectClone = new DefectModel(defectRef, item.deficiencyText, item.deficiencyCategory);
    this.defectClone.deficiencyId = item.deficiencyId;

    this.navCtrl.push('DefectDetailsPage', {
      test: this.vehicleTest,
      defect: this.defectClone.clone(),
      parentDefectCategory: this.parentDefectCategory,
      parentDefectCategoryId: this.parentDefectCategoryId,
      parentDefectItem: this.parentDefectItem,
      parentDefectItemId: this.parentDefectItemId,
      additionalInfo: additionalInfo
    });
  }

  addAdvisory() {
    let defectRef = `${this.parentDefectCategoryId}.${this.parentDefectItemId}`;
    this.navCtrl.push('AdvisoryDetailsPage', {
      test: this.vehicleTest,
      parentDefectCategory: this.parentDefectCategory,
      parentDefectCategoryId: this.parentDefectCategoryId,
      parentDefectItem: this.parentDefectItem,
      parentDefectItemId: this.parentDefectItemId,
      defectRef: defectRef
    });
  }

  getBadgeColor(category) {
    switch (category.toLowerCase()) {
      case 'dangerous':
        return 'dark';
      case 'major':
        return 'danger';
      case 'minor':
        return 'attention';
      case 'prs':
        return 'primary';
      case 'advisory':
        return 'light';
    }
  }

}


