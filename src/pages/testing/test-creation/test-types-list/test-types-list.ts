import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { TestTypesReferenceDataModel } from "../../../../models/reference-data-models/test-types.model";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";

@IonicPage()
@Component({
  selector: 'page-tests-types-list',
  templateUrl: 'test-types-list.html'
})

export class TestTypesListPage implements OnInit {
  vehicleData: VehicleModel;
  testTypeReferenceData: TestTypesReferenceDataModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private testTypeService: TestTypeService,
              private vehicleService: VehicleService) {
    this.vehicleData = navParams.get('vehicleData');
    this.testTypeReferenceData = navParams.get('testTypeData');
  }

  ngOnInit() {
    this.getTestTypeReferenceData();
  }

  getTestTypeReferenceData(): void {
    if (!this.testTypeReferenceData) {
      this.testTypeService.getTestTypesFromStorage().subscribe(
        data => {
          this.testTypeReferenceData = data;
        }
      )
    }
  }

  selectedItem(testType: TestTypesReferenceDataModel): void {
    if (testType.nextTestTypesOrCategories) {
      this.navCtrl.push('TestTypesListPage', {
        vehicleData: this.vehicleData,
        testTypeData: testType.nextTestTypesOrCategories
      });
    } else {
      let views = this.navCtrl.getViews();
      for (let i = views.length - 1; i >= 0; i--) {
        if (views[i].component.name == 'TestCreatePage') {
          let test = this.testTypeService.createTestType(testType);
          this.vehicleService.addTestType(this.vehicleData, test);
          this.navCtrl.popTo(views[i]);
        }
      }
    }
  }

}
