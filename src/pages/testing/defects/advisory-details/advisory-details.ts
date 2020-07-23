import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DefectDetailsModel } from '../../../../models/defects/defect-details.model';
import { TestTypeModel } from '../../../../models/tests/test-type.model';
import { APP_STRINGS } from '../../../../app/app.enums';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@IonicPage()
@Component({
  selector: 'page-advisory-details',
  templateUrl: 'advisory-details.html'
})
export class AdvisoryDetailsPage {
  vehicleTest: TestTypeModel;
  advisory: DefectDetailsModel;
  isEdit: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private testTypeService: TestTypeService
  ) {
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
      if (
        views[i].component.name == 'CompleteTestPage' ||
        views[i].component.name == 'ModalCmp'
      ) {
        if (!this.isEdit) {
          this.vehicleTest.defects.push(this.advisory);
        }
        this.navCtrl.popTo(views[i]);
      }
    }
  }

  removeAdvisory() {
    this.testTypeService.removeDefect(this.vehicleTest, this.advisory);
    this.navCtrl.pop();
  }

  removeAdvisoryConfirm() {
    const REMOVE_ALERT = this.alertCtrl.create({
      title: APP_STRINGS.REMOVE_DEFECT_TITLE,
      message: APP_STRINGS.REMOVE_DEFECT_MSG,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          handler: () => {}
        },
        {
          text: APP_STRINGS.REMOVE,
          handler: () => {
            this.removeAdvisory();
          }
        }
      ]
    });
    REMOVE_ALERT.present();
  }
}
