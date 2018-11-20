import { Component } from '@angular/core';
import { AlertController, IonicPage, ItemSliding, NavController, NavParams } from 'ionic-angular';
import { VehicleModel } from '../../../../models/vehicle.model';
import { VehicleTestModel } from '../../../../models/vehicle-test.model';
import { DefectModel } from "../../../../models/defect.model";

@IonicPage()
@Component({
  selector: 'page-complete-test',
  templateUrl: 'complete-test.html'
})
export class CompleteTestPage {
  vehicle: VehicleModel;
  vehicleTest: VehicleTestModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTest = navParams.get('test');
  }

  finishTest(): void {
    this.vehicleTest.endVehicleTest();
    this.navCtrl.pop();
  }

  openVehicleDetails(): void {
    this.navCtrl.push('VehicleDetailsPage', {vehicle: this.vehicle});
  }

  addDefect(): void {
    this.navCtrl.push('AddDefectCategoryPage', {test: this.vehicleTest});
  }

  openDefect(defect: DefectModel): void {
    return
  }

  public convertToNumber(event): number {
    return +event;
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

  showAlert(item: ItemSliding, defect) {
    const confirm = this.alertCtrl.create({
      title: 'Remove defect',
      message: 'This action wil remove this defect.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            item.close();
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

  removeDefect(defect) {
    this.vehicleTest.removeDefect(defect)
  }
}
