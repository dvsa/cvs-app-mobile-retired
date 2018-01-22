import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

import { VehicleTest } from '../../../../../models/vehicleTest';
import { Defect } from '../../../../../models/defect';
import { ImageProvider } from '../../../../../helpers/image';
import { ActionSheetController } from 'ionic-angular'

@Component({
  selector: 'page-defectDetails',
  templateUrl: 'defectDetails.html'
})
export class DefectDetailsPage {
  vehicleTest: VehicleTest;
  defect: Defect;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private iab: InAppBrowser,
              private imageProvider: ImageProvider,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing) {
    this.vehicleTest = navParams.get('test');
    this.defect = navParams.get('defect');
  }

  addDefect() {
    var views = this.navCtrl.getViews();
    for (let i = views.length - 1; i >= 0; i--) {
      if (views[i].component.name == "CompleteTestPage") {
        this.vehicleTest.addDefect(this.defect);
        this.navCtrl.popTo(views[i]);
      }
    }
  }

  checkIfDefectWasAdded(): boolean {
    var found = false;
    this.vehicleTest.getDefects().forEach(defect => {
      if (defect == this.defect) {
        found = true;
      }
    });
    return found;
  }

  showAttachmentDialog() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take photo',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Select photo from library',
          handler: () => {
            this.selectPhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  openAttachment(asset: string) {
    var options = {
      message: 'Defect photo',
      subject: 'Defect photo',
      files: [asset],
      url: asset,
      chooserTitle: 'Pick an app'
    };
    this.socialSharing.shareWithOptions(options);
  }

  selectPhoto() {
    this.imageProvider.selectPhotograph().then((mediaAsset) => {
      this.defect.addAttachment(mediaAsset.toString());
    }).catch((err)=> {
      console.log(err);
    });
  }

  takePhoto() {
    this.imageProvider.takePhotograph().then((mediaAsset) => {
      this.defect.addAttachment(mediaAsset.toString());
    }).catch((err)=> {
       console.log(err);
    });
  }

  openManual() {
    const browser = this.iab.create('https://www.gov.uk/government/publications/hgv-inspection-manual');
  }

}
