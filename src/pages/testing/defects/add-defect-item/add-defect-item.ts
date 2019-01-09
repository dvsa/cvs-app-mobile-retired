import { Component, OnInit } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DefectCategoryModel, DefectItemModel } from "../../../../models/reference-data-models/defects.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { APP } from "../../../../app/app.enums";
import { TestTypeModel } from "../../../../models/tests/test-type.model";

@IonicPage()
@Component({
  selector: 'page-add-defect-item',
  templateUrl: 'add-defect-item.html',
})
export class AddDefectItemPage implements OnInit {
  vehicleType: string;
  vehicleTest: TestTypeModel;
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
