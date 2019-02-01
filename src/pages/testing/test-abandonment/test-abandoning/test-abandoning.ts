import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";

@IonicPage()
@Component({
  selector: 'page-test-abandoning',
  templateUrl: 'test-abandoning.html',
})
export class TestAbandoningPage implements OnInit {
  vehicleTest: TestTypeModel;
  selectedReasons: string[];
  additionalComment: string;
  editMode: string;
  altAbandon: boolean;

  constructor(private navParams: NavParams, private alertCtrl: AlertController, private navCtrl: NavController, public visitService: VisitService, private testTypeService: TestTypeService) {
    this.vehicleTest = this.navParams.get('vehicleTest');
    this.selectedReasons = this.navParams.get('selectedReasons');
    this.editMode = this.navParams.get('editMode');
    this.altAbandon = this.navParams.get('altAbandon');
  }

  ngOnInit() {
    if (!this.editMode) {
      this.additionalComment = this.vehicleTest.abandonment.additionalComment;
    }
  }

  onDone() {
    const alert = this.alertCtrl.create({
      title: 'Abandon test',
      message: 'You will not be able to make changes to this test after it has been abandoned.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Abandon',
          cssClass: 'danger-action-button',
          handler: () => {
            this.updateVehicleTestModel();
            this.altAbandon ? this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4)) : this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
          }
        }
      ]
    });

    alert.present();
  }

  updateVehicleTestModel() {
    this.vehicleTest.abandonment.reasons.push(...this.selectedReasons);
    if (this.additionalComment && this.additionalComment.length) {
      this.vehicleTest.abandonment.additionalComment = this.additionalComment;
    }
    this.visitService.updateVisit();
  }

}
