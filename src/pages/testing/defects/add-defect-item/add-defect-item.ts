import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VehicleTestModel} from "../../../../models/vehicle-test.model";
import {VehicleModel} from "../../../../models/vehicle.model";
import {DefectCategoryModel, DefectItemModel} from "../../../../models/defects/defects.model";

@IonicPage()
@Component({
  selector: 'page-add-defect-item',
  templateUrl: 'add-defect-item.html',
})
export class AddDefectItemPage {
  vehicleType: string;
  vehicleTest: VehicleTestModel;
  category: DefectCategoryModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicleType = navParams.get('vehicleType');
    this.vehicleTest = navParams.get('vehicleTest');
    this.category = navParams.get('category');
  }

  selectItem(item: DefectItemModel): void {
    this.navCtrl.push('AddDefectPage', {
        vehicleType: this.vehicleType,
        vehicleTest: this.vehicleTest,
        category: this.category,
        item: item
      }
    );
  }
}
