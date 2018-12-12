import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleModel } from '../../../../models/vehicle.model';
import { TestTypesService } from '../../../../providers/test-types/test-type.service';
import { TestTypesModel } from "../../../../models/reference-data-models/test-types.model";
import { VehicleTestModel } from "../../../../models/vehicle-test.model";

@IonicPage()
@Component({
  selector: 'page-tests-types-list',
  templateUrl: 'test-types-list.html'
})

export class TestTypesListPage implements OnInit {
  vehicleData: VehicleModel;
  testTypeReferenceData: TestTypesModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private testTypeService: TestTypesService) {
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

  selectedItem(testType: TestTypesModel): void {
    if (testType.nextTestTypesOrCategories) {
      this.navCtrl.push('TestTypesListPage', {vehicleData: this.vehicleData, testTypeData: testType.nextTestTypesOrCategories});
    } else {
      let views = this.navCtrl.getViews();
      for (let i = views.length - 1; i >= 0; i--) {
        if (views[i].component.name == 'TestCreatePage') {
          let test = new VehicleTestModel(testType.name)._clone();
          this.vehicleData.addVehicleTest(test);
          this.navCtrl.popTo(views[i]);
        }
      }
    }
  }

}
