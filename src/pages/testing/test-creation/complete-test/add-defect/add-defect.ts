import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {VehicleTestModel} from '../../../../../models/vehicle-test.model';
import {DefectModel} from '../../../../../models/defect.model';
import {DefectCategoryService} from '../../../../../services/defect.service';
import {DefectCategoryModel} from '../../../../../models/defect-category.model';

@IonicPage()
@Component({
  selector: 'page-add-defect',
  templateUrl: 'add-defect.html'
})
export class AddDefectPage implements OnInit {
  vehicleTest: VehicleTestModel;
  defectCategories: Object[];
  parentDefectCategory: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private defectCategoryService: DefectCategoryService, private inAppBrowser: InAppBrowser) {
    this.vehicleTest = navParams.get('test');
    this.defectCategories = navParams.get('defectCategoryTaxonomy');
    this.parentDefectCategory = navParams.get('parentDefectCategory');
  }

  ngOnInit() {
    this.getDefectCategories();
  }

  addDefect(defect: DefectModel): void {
    this.vehicleTest.addDefect(defect);
    this.navCtrl.pop();
  }

  getDefectCategories(): void {
    if (this.defectCategories == null) {
      this.defectCategoryService.getDefectCategories()
        .subscribe(
          defectCategories => this.defectCategories = defectCategories
        );
    }
  }

  selectedItem(item: Object): void {
    if (item instanceof DefectModel) {
      this.navCtrl.push('DefectDetailsPage', {test: this.vehicleTest, defect: item._clone()});
    } else if (item instanceof DefectCategoryModel && item.getChildren() != null) {
      this.navCtrl.push('AddDefectPage', {
          test: this.vehicleTest,
          defectCategoryTaxonomy: item.getChildren(),
          parentDefectCategory: item.getName()
        }
      );
    }
  }

  isDefectCategoryType(item: Object): boolean {
    return item instanceof DefectCategoryModel;
  }

  openManual(): void {
    const browser = this.inAppBrowser.create('https://www.gov.uk/government/publications/hgv-inspection-manual');
  }
}


