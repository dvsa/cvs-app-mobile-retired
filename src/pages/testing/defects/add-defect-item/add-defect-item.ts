import { Component, OnInit } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DefectsService } from "../../../../providers/defects/defects.service";
import { APP } from "../../../../app/app.enums";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { DefectCategoryReferenceDataModel, DefectItemReferenceDataModel } from "../../../../models/reference-data-models/defects.reference-model";

@IonicPage()
@Component({
  selector: 'page-add-defect-item',
  templateUrl: 'add-defect-item.html',
})
export class AddDefectItemPage implements OnInit {
  vehicleType: string;
  vehicleTest: TestTypeModel;
  category: DefectCategoryReferenceDataModel;
  filteredItems: DefectItemReferenceDataModel[];
  searchVal: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public defectsService: DefectsService, public events: Events) {
    this.vehicleType = navParams.get('vehicleType');
    this.vehicleTest = navParams.get('vehicleTest');
    this.category = navParams.get('category');
  }

  ngOnInit() {
    this.filteredItems = this.populateItemsArray();
  }

  selectItem(item: DefectItemReferenceDataModel): void {
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
    this.filteredItems = this.populateItemsArray();
  }

  private populateItemsArray(): DefectItemReferenceDataModel[] {
    let filteredArr = this.defectsService.searchDefect(this.category.items, this.searchVal, ['itemNumber', 'itemDescription']);
    return this.defectsService.orderDefectsArray(filteredArr, 'itemNumber', 'asc');
  }
}
