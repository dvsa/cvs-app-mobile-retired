import { Component } from '@angular/core';
import { AlertController, ItemSliding, IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleModel } from '../../../../models/vehicle.model';
import { VehicleTestModel } from '../../../../models/vehicle-test.model';
import { HTTPService } from "../../../../providers/global/http.service";
import { DefectsModel } from "../../../../models/defects/defects.model";
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { DefectsService } from "../../../../providers/defects/defects.service";

@IonicPage()
@Component({
  selector: 'page-complete-test',
  templateUrl: 'complete-test.html'
})
export class CompleteTestPage {
  vehicle: VehicleModel;
  vehicleTest: VehicleTestModel;
  defectsCategories: DefectsModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HTTPService, public defectsService: DefectsService, private alertCtrl: AlertController) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTest = navParams.get('vehicleTest');
    this.httpService.getDefects().subscribe(
      (data: DefectsModel) => {
        this.defectsCategories = data
      }
    )
  }

  finishTest(): void {
    this.vehicleTest.endVehicleTest();
    this.navCtrl.pop();
  }

  openVehicleDetails(): void {
    this.navCtrl.push('VehicleDetailsPage', {vehicle: this.vehicle});
  }

  addDefect(): void {
    this.navCtrl.push('AddDefectCategoryPage', {
      vehicleType: 'psv',
      vehicleTest: this.vehicleTest,
      defects: this.defectsCategories
    });
  }

  openDefect(defect: DefectDetailsModel): void {
    if (defect.deficiencyCategory != 'Advisory') {
      this.navCtrl.push('DefectDetailsPage', {
        vehicleTest: this.vehicleTest,
        deficiency: defect,
        isEdit: true
      });
    } else {
      this.navCtrl.push('AdvisoryDetailsPage', {
        vehicleTest: this.vehicleTest,
        advisory: defect,
        isEdit: true
      })
    }
  }

  public convertToNumber(event): number {
    return +event;
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
