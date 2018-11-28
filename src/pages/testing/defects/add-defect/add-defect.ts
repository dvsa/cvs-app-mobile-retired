import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VehicleTestModel} from '../../../../models/vehicle-test.model';
import {DefectCategoryModel, DefectDeficiencyModel, DefectItemModel} from "../../../../models/defects/defects.model";
import {DefectsService} from "../../../../providers/defects/defects.service";
import {DefectDetailsModel} from "../../../../models/defects/defect-details.model";
import {DefectsMetadataModel} from "../../../../models/defects/defects-metadata.model";

@IonicPage()
@Component({
  selector: 'page-add-defect',
  templateUrl: 'add-defect.html'
})
export class AddDefectPage {
  vehicleType: string;
  vehicleTest: VehicleTestModel;
  category: DefectCategoryModel;
  item: DefectItemModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public defectsService: DefectsService) {
    this.vehicleType = navParams.get('vehicleType');
    this.vehicleTest = navParams.get('vehicleTest');
    this.category = navParams.get('category');
    this.item = navParams.get('item');
  }

  selectDeficiency(deficiency: DefectDeficiencyModel): void {
    let metadata: DefectsMetadataModel = {
      category: {
        imNumber: this.category.imNumber,
        imDescription: this.category.imDescription,
        additionalInfo: this.category.additionalInfo[this.vehicleType]
      },
      item: {
        itemNumber: this.item.itemNumber,
        itemDescription: this.item.itemDescription
      }
    };

    let defect: DefectDetailsModel = {
      ref: deficiency.ref,
      deficiencyCategory: deficiency.deficiencyCategory,
      deficiencyId: deficiency.deficiencyId,
      deficiencyText: deficiency.deficiencyText,
      metadata: metadata,
      prs: false,
      notes: '',
      location: {
        vertical: '',
        horizontal: '',
        lateral: '',
        longitudinal: '',
        rowNumber: '',
        seatNumber: '',
        axleNumber: ''
      }
    };

    this.navCtrl.push('DefectDetailsPage', {
      vehicleTest: this.vehicleTest,
      deficiency: defect,
      isEdit: false
    });
  }

  addAdvisory() {
    const metadata: DefectsMetadataModel = {
      category: {
        imNumber: this.category.imNumber,
        imDescription: this.category.imDescription,
      },
      item: {
        itemNumber: this.item.itemNumber,
        itemDescription: this.item.itemDescription
      }
    };

    const advisory: DefectDetailsModel = {
      ref: `${this.category.imNumber}.${this.item.itemNumber}`,
      deficiencyCategory: 'Advisory',
      metadata: metadata,
      notes: ''
    };

    this.navCtrl.push('AdvisoryDetailsPage', {
      vehicleTest: this.vehicleTest,
      advisory: advisory,
      isEdit: false
    });
  }


}


