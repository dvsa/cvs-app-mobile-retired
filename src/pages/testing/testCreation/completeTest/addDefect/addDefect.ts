import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { VehicleTest } from '../../../../../models/vehicleTest';
import { Defect } from '../../../../../models/defect';
import { DefectCategoryService } from '../../../../../services/defect.service';
import { DefectCategory } from '../../../../../models/defectCategory';
import { DefectDetailsPage } from '../defectDetails/defectDetails';

@Component({
  selector: 'page-addDefect',
  templateUrl: 'addDefect.html'
})
export class AddDefectPage {

  vehicleTest: VehicleTest;
  defectCategories: Object[];
  parentDefectCategory: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private defectCategoryService: DefectCategoryService, private iab: InAppBrowser) {
    this.vehicleTest = navParams.get('test');
    this.defectCategories = navParams.get('defectCategoryTaxonomy');
    this.parentDefectCategory = navParams.get('parentDefectCategory');
  }

  addDefect(defect: Defect) {
    this.vehicleTest.addDefect(defect);
    this.navCtrl.pop();
  }

  ngOnInit() {
    this.getDefectCategories();
  }

  getDefectCategories() {
    if (this.defectCategories == null){
      this.defectCategoryService.getDefectCategories().subscribe(defectCategories => this.defectCategories = defectCategories);
    }
  }

  selectedItem(item: Object) {
    if (item instanceof Defect) {
      this.navCtrl.push(DefectDetailsPage, {'test':this.vehicleTest, 'defect': item._clone()});
    } else if (item instanceof DefectCategory && item.getChildren() != null) {
      this.navCtrl.push(AddDefectPage, {'test': this.vehicleTest, 'defectCategoryTaxonomy': item.getChildren(), 'parentDefectCategory': item.getName()});
    }
  }

  isDefectCategoryType(item: Object): boolean {
    if (item instanceof DefectCategory) {
      return true;
    } else {
      return false;
    };
  } 

  openManual() {
    const browser = this.iab.create('https://www.gov.uk/government/publications/hgv-inspection-manual');
  }
}


 