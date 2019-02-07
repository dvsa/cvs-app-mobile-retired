import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { TestTypesReferenceDataModel } from "../../../../models/reference-data-models/test-types.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { APP_STRINGS } from "../../../../app/app.enums";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private testTypeService: TestTypeService,
              private vehicleService: VehicleService,
              private viewCtrl: ViewController,
              public commonFunctions: CommonFunctionsService) {
    this.vehicleData = navParams.get('vehicleData');
    this.testTypeReferenceData = navParams.get('testTypeData');
    this.previousPage = navParams.get('previousPage');
    this.testTypeCategoryName = navParams.get('testTypeCategoryName');
  }

  ngOnInit() {
    if(this.testTypeReferenceData) this.testTypeReferenceData = this.testTypeService.orderTestTypesArray(this.testTypeReferenceData, 'id', 'asc')
    this.backBtn = this.navParams.get('backBtn');
    this.getTestTypeReferenceData();
    let previousView = this.navCtrl.getPrevious();
    this.firstPage = previousView.id != 'TestTypesListPage';
  }

  ionViewWillEnter() {
    if (this.firstPage) {
      this.viewCtrl.setBackButtonText(APP_STRINGS.TEST_TYPE);
    } else {
      this.backBtnName = this.commonFunctions.capitalizeString(this.backBtn);
      this.viewCtrl.setBackButtonText(this.backBtnName);
    }
  }

  getTestTypeReferenceData(): void {
    if (!this.testTypeReferenceData) {
      this.testTypeService.getTestTypesFromStorage().subscribe(
        (data: TestTypesReferenceDataModel[]) => {
          this.testTypeReferenceData = this.testTypeService.orderTestTypesArray(data, 'id', 'asc');
        }
      )
    }
  }

  selectedItem(testType: TestTypesReferenceDataModel): void {
    if (this.firstPage) this.testTypeCategoryName = testType.name;
    if (testType.nextTestTypesOrCategories) {
      this.navCtrl.push('TestTypesListPage', {
        vehicleData: this.vehicleData,
        testTypeData: testType.nextTestTypesOrCategories,
        previousPage: testType.name,
        testTypeCategoryName: this.testTypeCategoryName,
        backBtn: this.previousPage || APP_STRINGS.TEST_TYPE
      });
    } else {
      let views = this.navCtrl.getViews();
      for (let i = views.length - 1; i >= 0; i--) {
        if (views[i].component.name == 'TestCreatePage') {
          let test = this.testTypeService.createTestType(testType);
          test.testTypeCategoryName = this.testTypeCategoryName;
          this.vehicleService.addTestType(this.vehicleData, test);
          this.navCtrl.popTo(views[i]);
        }
      }
    }
  }

  cancelTypes() {
    this.navCtrl.pop();
  }
}
