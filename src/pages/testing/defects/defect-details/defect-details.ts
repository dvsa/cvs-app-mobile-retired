import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdditionalInfoMetadataModel, DefectDetailsModel } from '../../../../models/defects/defect-details.model';
import { DefectsService } from "../../../../providers/defects/defects.service";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";

@IonicPage()
@Component({
  selector: 'page-defect-details',
  templateUrl: 'defect-details.html'
})
export class DefectDetailsPage implements OnInit {
  vehicleTest: TestTypeModel;
  defect: DefectDetailsModel;
  defectMetadata: AdditionalInfoMetadataModel;
  isEdit: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public defectsService: DefectsService,
              private testTypeService: TestTypeService,
              private alertCtrl: AlertController) {
    this.vehicleTest = navParams.get('vehicleTest');
    this.defect = navParams.get('deficiency');
    this.isEdit = navParams.get('isEdit');
  }

  ngOnInit() {
    this.defectMetadata = this.defect.metadata.category.additionalInfo;
  }

  addDefect(): void {
    let views = this.navCtrl.getViews();
    for (let i = views.length - 1; i >= 0; i--) {
      if (views[i].component.name == "CompleteTestPage") {
        if (!this.isEdit) this.testTypeService.addDefect(this.vehicleTest, this.defect);
        this.navCtrl.popTo(views[i]);
      }
    }
  }

  checkIfDefectWasAdded(): boolean {
    let found = false;
    this.vehicleTest.defects.forEach(
      defect => {
        if (defect.ref == this.defect.ref) {
          found = true;
        }
      }
    );
    return found;
  }

  removeDefectConfirm(defect: DefectDetailsModel): void {
    const confirm = this.alertCtrl.create({
      title: 'Remove defect',
      message: 'This action will remove this defect.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeDefect(defect);
          }
        }
      ]
    });
    confirm.present();
  }

  removeDefect(defect: DefectDetailsModel): void {
    this.testTypeService.removeDefect(this.vehicleTest, defect);
    this.navCtrl.pop();
  }
}
