import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleTestModel } from "../../../../models/vehicle-test.model";

@IonicPage()
@Component({
  selector: 'page-add-defect-item',
  templateUrl: 'add-defect-item.html',
})
export class AddDefectItemPage {
  vehicleTest: VehicleTestModel;
  defectCategories: Object[];
  parentDefectCategory: string;
  parentDefectCategoryId;
  additionalInfo;
  forVehicleType;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicleTest = navParams.get('test');
    this.defectCategories = navParams.get('defectCategoryTaxonomy');
    this.parentDefectCategory = navParams.get('parentDefectCategory');
    this.parentDefectCategoryId = navParams.get('parentDefectCategoryId');
    this.additionalInfo = navParams.get('additionalInfo');
    this.forVehicleType = navParams.get('forVehicleType');
  }

  // addDefect(defect: DefectModel): void {
  //   this.vehicleTest.addDefect(defect);
  //   this.navCtrl.pop();
  // }

  // getDefectCategories(): void {
  //   // if (this.defectCategories == null) {
  //     // this.defectCategoryService.getDefectCategories().subscribe(
  //     //   defectCategories => this.defectCategories = defectCategories
  //     // );
  //     // this.defectCategories = DefectsDataMock.DefectsData;
  //   // }
  // }

  selectedItem(item): void {
    this.navCtrl.push('AddDefectPage', {
        test: this.vehicleTest,
        defectCategoryTaxonomy: item.deficiencies,
        parentDefectCategory: this.parentDefectCategory,
        parentDefectCategoryId: this.parentDefectCategoryId,
        parentDefectItem: item.itemDescription,
        parentDefectItemId: item.itemNumber,
        additionalInfo: this.additionalInfo,
        forVehicleType: this.forVehicleType
      }
    );
  }
}
