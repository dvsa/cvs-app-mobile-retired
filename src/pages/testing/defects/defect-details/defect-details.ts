import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {SocialSharing} from '@ionic-native/social-sharing';
import {VehicleTestModel} from '../../../../models/vehicle-test.model';
import {DefectModel} from '../../../../models/defect.model';
import {CameraService} from '../../../../providers/natives/camera.service';
import {ActionSheetController} from 'ionic-angular'
import {DefectsDataMock} from "../../../../../test-config/data-mocks/defects-data.mock";

@IonicPage()
@Component({
  selector: 'page-defect-details',
  templateUrl: 'defect-details.html'
})
export class DefectDetailsPage {
  vehicleTest: VehicleTestModel;
  defect;

  additionalInfo;
  parentDefectCategory;
  parentDefectCategoryId;
  parentDefectItem;
  parentDefectItemId;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicleTest = navParams.get('test');
    this.defect = navParams.get('defect');
    this.parentDefectCategory = navParams.get('parentDefectCategory');
    this.parentDefectCategoryId = navParams.get('parentDefectCategoryId');
    this.parentDefectItem = navParams.get('parentDefectItem');
    this.parentDefectItemId = navParams.get('parentDefectItemId');
    this.additionalInfo = navParams.get('additionalInfo');
  }

  addDefect(): void {
    let views = this.navCtrl.getViews();
    for (let i = views.length - 1; i >= 0; i--) {
      if (views[i].component.name == "CompleteTestPage") {
        this.defect.parentDefectCategory = this.parentDefectCategory;
        this.defect.parentDefectCategoryId = this.parentDefectCategoryId;
        this.defect.parentDefectItem = this.parentDefectItem;
        this.defect.parentDefectItemId = this.parentDefectItemId;
        this.vehicleTest.addDefect(this.defect);
        this.navCtrl.popTo(views[i]);
      }
    }
  }

  checkIfDefectWasAdded(): boolean {
    let found = false;
    this.vehicleTest.getDefects().forEach(
      defect => {
        if (defect.ref == this.defect.ref) {
          found = true;
        }
      }
    );
    return found;
  }

  getBadgeColor(category) {
    switch (category.toLowerCase()) {
      case 'dangerous':
        return 'dark';
      case 'major':
        return 'danger';
      case 'minor':
        return 'attention';
      case 'prs':
        return 'primary';
      case 'advisory':
        return 'light';
    }
  }

}
