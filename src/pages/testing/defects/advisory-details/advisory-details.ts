import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { TestTypeModel } from "../../../../models/tests/test-type.model";

@IonicPage()
@Component({
  selector: 'page-advisory-details',
  templateUrl: 'advisory-details.html',
})
export class AdvisoryDetailsPage {
  vehicleTest: TestTypeModel;
  advisory: DefectDetailsModel;
  isEdit: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehicleTest = navParams.get('vehicleTest');
    this.advisory = navParams.get('advisory');
    this.isEdit = navParams.get('isEdit');
  }

  cancelAdvisory() {
    this.navCtrl.pop();
  }

  submitAdvisory(): void {
    let views = this.navCtrl.getViews();
    for (let i = views.length - 1; i >= 0; i--) {
      if (views[i].component.name == "CompleteTestPage") {
        if (!this.isEdit) {
          this.vehicleTest.defects.push(this.advisory);
        }
        this.navCtrl.popTo(views[i]);
      }
    }
  }
}
