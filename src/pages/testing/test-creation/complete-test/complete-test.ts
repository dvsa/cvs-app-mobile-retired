import { Component, OnInit } from '@angular/core';
import { AlertController, ItemSliding, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { DEFICIENCY_CATEGORY } from "../../../../app/app.enums";
import { DefectCategoryModel } from "../../../../models/reference-data-models/defects.model";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { VisitService } from "../../../../providers/visit/visit.service";

@IonicPage()
@Component({
  selector: 'page-complete-test',
  templateUrl: 'complete-test.html'
})
export class CompleteTestPage implements OnInit {
  vehicle: VehicleModel;
  vehicleTest: TestTypeModel;
  defectsCategories: DefectCategoryModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitService: VisitService,
              public defectsService: DefectsService,
              private alertCtrl: AlertController,
              private testTypeService: TestTypeService) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTest = navParams.get('vehicleTest');
  }

  ngOnInit(): void {
    this.defectsService.getDefectsFromStorage().subscribe(
      (defects: DefectCategoryModel[]) => {
        this.defectsCategories = defects;
      }
    );
  }

  finishTest(): void {
    this.testTypeService.endTestType(this.vehicleTest);
    this.navCtrl.pop();
  }

  checkPass(testType: TestTypeModel): boolean {
    return this.testTypeService.checkPass(testType);
  }

  openVehicleDetails(): void {
    this.navCtrl.push('VehicleDetailsPage', {vehicle: this.vehicle});
  }

  addDefect(): void {
    this.navCtrl.push('AddDefectCategoryPage', {
      vehicleType: this.vehicle.techRecord[0].vehicleType,
      vehicleTest: this.vehicleTest,
      defects: this.defectsCategories
    });
  }

  openDefect(defect: DefectDetailsModel): void {
    if (defect.deficiencyCategory.toLowerCase() != DEFICIENCY_CATEGORY.ADVISORY.toLowerCase()) {
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
    this.testTypeService.removeDefect(this.vehicleTest, defect);
  }
}
