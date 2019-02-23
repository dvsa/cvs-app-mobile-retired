import { Component, OnInit } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DefectsService } from "../../../../providers/defects/defects.service";
import { APP, APP_STRINGS } from "../../../../app/app.enums";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { DefectCategoryReferenceDataModel } from "../../../../models/reference-data-models/defects.reference-model";

@IonicPage()
@Component({
  selector: 'page-add-defect-category',
  templateUrl: 'add-defect-category.html',
})
export class AddDefectCategoryPage implements OnInit {
  vehicleType: string;
  vehicleTest: TestTypeModel;
  defectCategories: DefectCategoryReferenceDataModel[];
  filteredCategories: DefectCategoryReferenceDataModel[];
  searchVal: string = '';
  focusOut: boolean = false;
  appStrings: {} = APP_STRINGS;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private defectsService: DefectsService, public events: Events) {
    this.vehicleType = navParams.get('vehicleType');
    this.vehicleTest = navParams.get('vehicleTest');
    this.defectCategories = navParams.get('defects');
  }

  ngOnInit() {
    this.filteredCategories = this.populateCategoriesArray();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.vehicleTest.testTypeName);
  }

  selectCategory(category: DefectCategoryReferenceDataModel): void {
    this.focusOut = false;
    this.navCtrl.push('AddDefectItemPage', {
      vehicleType: this.vehicleType,
      vehicleTest: this.vehicleTest,
      category: category
    });
    this.events.publish(APP.NAV_OUT);
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredCategories = this.populateCategoriesArray();
  }

  private populateCategoriesArray(): DefectCategoryReferenceDataModel[] {
    let filteredArr = this.defectsService.searchDefect(this.defectCategories, this.searchVal, ['imNumber', 'imDescription']);
    return this.defectsService.orderDefectsArray(filteredArr, 'imNumber', 'asc');
  }
  keepCancelOn(ev, hideCancel?: boolean) {
    this.focusOut = !hideCancel;
  }
}
