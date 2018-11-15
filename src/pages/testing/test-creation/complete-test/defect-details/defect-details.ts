import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {SocialSharing} from '@ionic-native/social-sharing';
import {VehicleTestModel} from '../../../../../models/vehicle-test.model';
import {DefectModel} from '../../../../../models/defect.model';
import {CameraService} from '../../../../../providers/natives/camera.service';
import {ActionSheetController} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-defect-details',
  templateUrl: 'defect-details.html'
})
export class DefectDetailsPage {
  vehicleTest: VehicleTestModel;
  defect: DefectModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, private imageProvider: CameraService, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing) {
    this.vehicleTest = navParams.get('test');
    this.defect = navParams.get('defect');
  }

  addDefect(): void {
    let views = this.navCtrl.getViews();
    for (let i = views.length - 1; i >= 0; i--) {
      if (views[i].component.name == "CompleteTestPage") {
        this.vehicleTest.addDefect(this.defect);
        this.navCtrl.popTo(views[i]);
      }
    }
  }

  checkIfDefectWasAdded(): boolean {
    let found = false;
    this.vehicleTest.getDefects().forEach(
      defect => {
        if (defect == this.defect) {
          found = true;
        }
      }
    );
    return found;
  }

  showAttachmentDialog(): void {
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

  openAttachment(asset: string): void {
    let options = {
      message: 'Defect photo',
      subject: 'Defect photo',
      files: [asset],
      url: asset,
      chooserTitle: 'Pick an app'
    };
    this.socialSharing.shareWithOptions(options);
  }

  selectPhoto(): void {
    this.imageProvider.selectPhotograph()
      .then(
        (mediaAsset) => {
          this.defect.addAttachment(mediaAsset.toString());
        }
      )
  }

  takePhoto(): void {
    this.imageProvider.takePhotograph()
      .then((mediaAsset) => {
          this.defect.addAttachment(mediaAsset.toString());
        }
      )
  }

  openManual(): void {
    const browser = this.inAppBrowser.create('https://www.gov.uk/government/publications/hgv-inspection-manual');
  }

}
