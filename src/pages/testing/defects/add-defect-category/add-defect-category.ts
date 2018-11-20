import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { DefectCategoryModel, DefectsModel } from "../../../../models/defects/defects.model";

@IonicPage()
@Component({
  selector: 'page-add-defect-category',
  templateUrl: 'add-defect-category.html',
})
export class AddDefectCategoryPage {
  vehicleType: string;
  vehicleTest: VehicleTestModel;
  defectCategories: DefectsModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicleType = navParams.get('vehicleType');
    this.vehicleTest = navParams.get('vehicleTest');
    this.defectCategories = navParams.get('defects');
  }

  selectCategory(category: DefectCategoryModel): void {
    this.navCtrl.push('AddDefectItemPage', {
        vehicleType: this.vehicleType,
        vehicleTest: this.vehicleTest,
        category: category
      }
    );
  }
}
