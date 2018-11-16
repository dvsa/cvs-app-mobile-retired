import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { DefectsDataMock } from "../../../../../test-config/data-mocks/defects-data.mock";

@IonicPage()
@Component({
  selector: 'page-add-defect-category',
  templateUrl: 'add-defect-category.html',
})
export class AddDefectCategoryPage {
  vehicleTest: VehicleTestModel;
  defectCategories: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicleTest = navParams.get('test');
  }

  ngOnInit() {
    this.getDefectCategories();
  }

  getDefectCategories(): void {
    if (this.defectCategories == null) {
      this.defectCategories = DefectsDataMock.DefectsData;
    }
  }

  selectedItem(item): void {
    this.navCtrl.push('AddDefectItemPage', {
        test: this.vehicleTest,
        defectCategoryTaxonomy: item.items,
        parentDefectCategory: item.imDescription,
        parentDefectCategoryId: item.imNumber,
        additionalInfo: item.additionalInfo,
        forVehicleType: item.forVehicleType
      }
    );
  }
}
