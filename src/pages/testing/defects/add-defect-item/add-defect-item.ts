import { Component, OnInit } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleTestModel } from "../../../../models/vehicle-test.model";
import { DefectCategoryModel, DefectItemModel } from "../../../../models/defects/defects.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { APP } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-add-defect-item',
  templateUrl: 'add-defect-item.html',
})
export class AddDefectItemPage implements OnInit {
  vehicleType: string;
  vehicleTest: VehicleTestModel;
  category: DefectCategoryModel;
  filteredItems: DefectItemModel[];
  searchVal: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public defectsService: DefectsService, public events: Events) {
    this.vehicleType = navParams.get('vehicleType');
    this.vehicleTest = navParams.get('vehicleTest');
    this.category = navParams.get('category');
  }

  ngOnInit() {
    this.filteredItems = this.defectsService.searchDefect(this.category.items, this.searchVal, ['itemNumber', 'itemDescription']);
  }

  selectItem(item: DefectItemModel): void {
    this.navCtrl.push('AddDefectPage', {
      vehicleType: this.vehicleType,
      vehicleTest: this.vehicleTest,
      category: this.category,
      item: item
    });
    this.events.publish(APP.NAV_OUT);
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredItems = this.defectsService.searchDefect(this.category.items, this.searchVal, ['itemNumber', 'itemDescription']);
  }
}
