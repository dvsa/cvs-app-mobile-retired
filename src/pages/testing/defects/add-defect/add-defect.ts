import { Component, OnInit } from '@angular/core';
import { Events, IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { DefectsService } from '../../../../providers/defects/defects.service';
import { APP, DEFICIENCY_CATEGORY, APP_STRINGS } from '../../../../app/app.enums';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { TestTypeModel } from '../../../../models/tests/test-type.model';
import {
  DefectCategoryReferenceDataModel,
  DefectDeficiencyReferenceDataModel,
  DefectItemReferenceDataModel
} from '../../../../models/reference-data-models/defects.reference-model';

@IonicPage()
@Component({
  selector: 'page-add-defect',
  templateUrl: 'add-defect.html'
})
export class AddDefectPage implements OnInit {
  vehicleType: string;
  vehicleTest: TestTypeModel;
  category: DefectCategoryReferenceDataModel;
  item: DefectItemReferenceDataModel;
  filteredDeficiencies: DefectDeficiencyReferenceDataModel[];
  fromTestReview: boolean;
  searchVal: string = '';
  focusOut: boolean = false;
  appStrings: typeof APP_STRINGS = APP_STRINGS;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public defectsService: DefectsService,
    public events: Events,
    public commonFunc: CommonFunctionsService
  ) {
    this.vehicleType = navParams.get('vehicleType');
    this.vehicleTest = navParams.get('vehicleTest');
    this.category = navParams.get('category');
    this.item = navParams.get('item');
    this.fromTestReview = navParams.get('fromTestReview');
  }

  ngOnInit() {
    this.filteredDeficiencies = this.populateDeficienciesArray();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.DEFECT_ITEM);
  }

  selectDeficiency(deficiency: DefectDeficiencyReferenceDataModel): void {
    let defect = this.defectsService.createDefect(
      this.category,
      this.item,
      deficiency,
      this.vehicleType,
      false
    );
    this.focusOut = false;

    this.navCtrl.push('DefectDetailsPage', {
      vehicleTest: this.vehicleTest,
      deficiency: defect,
      isEdit: false,
      fromTestReview: this.fromTestReview
    });
    this.clearSearch();
  }

  addAdvisory(): void {
    let advisory = this.defectsService.createDefect(
      this.category,
      this.item,
      null,
      this.vehicleType,
      true
    );

    this.navCtrl.push('AdvisoryDetailsPage', {
      vehicleTest: this.vehicleTest,
      advisory: advisory,
      isEdit: false
    });
    this.clearSearch();
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredDeficiencies = this.populateDeficienciesArray();
  }

  returnBadgeClass(deficiencyCategory): string {
    return deficiencyCategory === this.commonFunc.capitalizeString(DEFICIENCY_CATEGORY.MINOR)
      ? 'badge-text-black'
      : '';
  }

  private clearSearch(): void {
    this.events.publish(APP.NAV_OUT);
  }

  private populateDeficienciesArray(): DefectDeficiencyReferenceDataModel[] {
    let filteredArr = this.defectsService.searchDefect(this.item.deficiencies, this.searchVal, [
      'deficiencyId',
      'deficiencyText'
    ]);
    return this.defectsService.orderDefectsArray(filteredArr, 'deficiencyId', 'asc');
  }

  keepCancelOn(ev, hideCancel?: boolean) {
    this.focusOut = !hideCancel;
  }
}
