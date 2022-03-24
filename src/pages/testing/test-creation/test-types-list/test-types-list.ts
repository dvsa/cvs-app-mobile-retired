import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { TestTypesReferenceDataModel } from '../../../../models/reference-data-models/test-types.model';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import {
  APP_STRINGS,
  PAGE_NAMES
} from '../../../../app/app.enums';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';

@IonicPage()
@Component({
  selector: 'page-tests-types-list',
  templateUrl: 'test-types-list.html'
})
export class TestTypesListPage implements OnInit {
  vehicleData: VehicleModel;
  testTypeReferenceData: TestTypesReferenceDataModel[];
  firstPage: boolean;
  previousPage: string;
  backBtn: string;
  backBtnName: string;
  testTypeCategoryName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private testTypeService: TestTypeService,
    private vehicleService: VehicleService,
    private viewCtrl: ViewController,
    public commonFunctions: CommonFunctionsService
  ) {
    this.vehicleData = navParams.get('vehicleData');
    this.testTypeReferenceData = navParams.get('testTypeData');
    this.previousPage = navParams.get('previousPage');
    this.testTypeCategoryName = navParams.get('testTypeCategoryName');
  }

  ngOnInit() {
    if (this.testTypeReferenceData) {
      this.testTypeReferenceData = this.testTypeService.orderTestTypesArray(
        this.testTypeReferenceData,
        'sortId',
        'asc'
      );
    } else {
      this.getTestTypeRefByStorage();
    }

    this.backBtn = this.navParams.get('backBtn');
    let previousView = this.navCtrl.getPrevious();
    this.firstPage = previousView.id != PAGE_NAMES.TEST_TYPES_LIST_PAGE;
  }

  ionViewWillEnter() {
    if (this.firstPage) {
      this.viewCtrl.setBackButtonText(APP_STRINGS.TEST_TYPE);
    } else {
      this.backBtnName = this.commonFunctions.capitalizeString(this.backBtn);
      this.viewCtrl.setBackButtonText(this.backBtnName);
    }
  }

  getTestTypeRefByStorage(): void {
    this.testTypeService
      .getTestTypesFromStorage()
      .subscribe((data: TestTypesReferenceDataModel[]) => {
        this.testTypeReferenceData = this.testTypeService.orderTestTypesArray(
          data,
          'sortId',
          'asc'
        );
      });
  }

  selectedItem(testType: TestTypesReferenceDataModel, vehicleData: VehicleModel): void {
    if (this.firstPage) this.testTypeCategoryName = testType.name;

    if (testType.nextTestTypesOrCategories) {
      this.navCtrl.push(PAGE_NAMES.TEST_TYPES_LIST_PAGE, {
        vehicleData: vehicleData,
        testTypeData: testType.nextTestTypesOrCategories,
        previousPage: testType.name,
        testTypeCategoryName: this.testTypeCategoryName,
        backBtn: this.previousPage || APP_STRINGS.TEST_TYPE
      });
    } else {
      let views = this.navCtrl.getViews();
      for (let i = views.length - 1; i >= 0; i--) {
        if (views[i].component.name == PAGE_NAMES.TEST_CREATE_PAGE) {
          testType.name = this.testTypeCategoryName;
          let test = this.testTypeService.createTestType(
            testType,
            this.vehicleData.techRecord.vehicleType
          );
          test.testTypeCategoryName = this.testTypeCategoryName;
          this.vehicleService.addTestType(vehicleData, test);
          this.navCtrl.popTo(views[i]);
          break;
        }
      }
    }
  }

  cancelTypes() {
    this.navCtrl.pop();
  }

  canDisplay(addedTestsIds: string[], testToDisplay: TestTypesReferenceDataModel | any): boolean {
    return addedTestsIds.every((elem) =>
      testToDisplay.linkedIds ? testToDisplay.linkedIds.indexOf(elem) > -1 : true
    );
  }

  canDisplayCategory(
    testTypeCategory: TestTypesReferenceDataModel,
    addedTestTypesIds: string[]
  ): boolean {
    let displayable = false;
    if (testTypeCategory.nextTestTypesOrCategories) {
      for (let elem of testTypeCategory.nextTestTypesOrCategories) {
        if (elem.nextTestTypesOrCategories) {
          displayable = this.canDisplayCategory(elem, addedTestTypesIds);
        } else {
          if (addedTestTypesIds.indexOf(elem.id) === -1) displayable = true;
        }
      }
      return displayable;
    }
    return addedTestTypesIds.indexOf(testTypeCategory.id) === -1;
  }

  addedTestTypesIds(vehicleData: VehicleModel): string[] {
    let addedIds = [];
    for (let testType of vehicleData.testTypes) addedIds.push(testType.testTypeId);
    return addedIds;
  }
}
