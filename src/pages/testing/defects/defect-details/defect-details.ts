import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { AdditionalInfoMetadataModel, DefectDetailsModel } from '../../../../models/defects/defect-details.model';
import { DefectsService } from "../../../../providers/defects/defects.service";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { APP_STRINGS } from "../../../../app/app.enums";

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
  isLocation: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public defectsService: DefectsService,
              private testTypeService: TestTypeService,
              private alertCtrl: AlertController) {
    this.vehicleTest = navParams.get('vehicleTest');
    this.defect = navParams.get('deficiency');
    this.isEdit = navParams.get('isEdit');
  }

  ngOnInit() {
    this.defectMetadata = this.defect.metadata.category.additionalInfo;
    this.isLocation = this.checkForLocation(this.defectMetadata.location);
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.DEFECT_DESC);
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

  checkForLocation(location: {}): boolean{
    for (let type in location){
      if(location[type]){
        return true;
      }
    }
    return false;
  }

  checkIfDefectWasAdded(): boolean {
    let found = false;
    this.vehicleTest.defects.forEach(
      defect => {
        if (defect.deficiencyRef == this.defect.deficiencyRef) {
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
