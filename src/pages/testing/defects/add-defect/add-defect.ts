import { Component, OnInit } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  DefectCategoryModel,
  DefectDeficiencyModel,
  DefectItemModel
} from "../../../../models/reference-data-models/defects.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { DefectsMetadataModel } from "../../../../models/defects/defects-metadata.model";
import { APP, DEFICIENCY_CATEGORY } from "../../../../app/app.enums";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { TestTypeModel } from "../../../../models/tests/test-type.model";

@IonicPage()
@Component({
  selector: 'page-add-defect',
  templateUrl: 'add-defect.html'
})
export class AddDefectPage implements OnInit {
  vehicleType: string;
  vehicleTest: TestTypeModel;
  category: DefectCategoryModel;
  item: DefectItemModel;
  filteredDeficiencies: DefectDeficiencyModel[];
  searchVal: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public defectsService: DefectsService, public events: Events, public commonFunc: CommonFunctionsService) {
    this.vehicleType = navParams.get('vehicleType');
    this.vehicleTest = navParams.get('vehicleTest');
    this.category = navParams.get('category');
    this.item = navParams.get('item');
  }

  ngOnInit() {
    this.filteredDeficiencies = this.populateDeficienciesArray();
  }

  selectDeficiency(deficiency: DefectDeficiencyModel): void {
    let metadata: DefectsMetadataModel = {
      category: {
        imNumber: this.category.imNumber,
        imDescription: this.category.imDescription,
        additionalInfo: this.category.additionalInfo[this.vehicleType.toLowerCase()]
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
        rowNumber: null,
        seatNumber: null,
        axleNumber: null
      }
    };

    this.navCtrl.push('DefectDetailsPage', {
      vehicleTest: this.vehicleTest,
      deficiency: defect,
      isEdit: false
    });
    this.clearSearch()
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
    this.clearSearch()
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredDeficiencies = this.populateDeficienciesArray();
  }

  returnBadgeClass(deficiencyCategory): string {
    return deficiencyCategory === this.commonFunc.capitalizeString(DEFICIENCY_CATEGORY.MINOR) ? 'badge-text-black' : ''
  }

  private clearSearch(): void {
    this.events.publish(APP.NAV_OUT);
  }

  private populateDeficienciesArray() {
    let filteredArr = this.defectsService.searchDefect(this.item.deficiencies, this.searchVal, ['deficiencyId', 'deficiencyText']);
    return this.defectsService.orderDefectsArray(filteredArr, 'deficiencyId', 'asc');
  }
}


