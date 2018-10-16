import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VehicleModel} from '../../../../models/vehicle.model';
import {VehicleTestModel} from '../../../../models/vehicle-test.model';
import {VehicleTestCategoryModel} from '../../../../models/vehicle-test-category.model';
import {VehicleTestCategoryService} from '../../../../providers/vehicle-test-category.service';

@IonicPage()
@Component({
  selector: 'page-tests-list',
  templateUrl: 'tests-list.html'
})
export class TestsListPage implements OnInit {
  vehicle: VehicleModel;
  vehicleTestCategoryTaxonomy: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private vehicleTestCategorySevice: VehicleTestCategoryService) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTestCategoryTaxonomy = navParams.get('vehicleTestCategoryTaxonomy');
  }

  ngOnInit() {
    this.getVehicleTestCategoryTaxonomy();
  }

  getVehicleTestCategoryTaxonomy(): void {
    if (this.vehicleTestCategoryTaxonomy == null) {
      this.vehicleTestCategorySevice.getVehicleTestCatergoriesTaxonomy().subscribe(
          vehicleTestCategoryTaxonomy => this.vehicleTestCategoryTaxonomy = vehicleTestCategoryTaxonomy
        );
    } else {
      this.filterSelectedVehicleTests();
    }
  }

  filterSelectedVehicleTests(): void {
    this.vehicleTestCategoryTaxonomy = this.vehicleTestCategoryTaxonomy.filter(
      testCategory => {
        let foundTestCategory = false;
        this.vehicle.getVehicleTests().forEach(vehicleTest => {
            if ((testCategory as VehicleTestModel).getName() == vehicleTest.getName()) {
              foundTestCategory = true;
            }
          }
        );
        return !foundTestCategory;
      });
  }

  selectedItem(item: Object): void {
    if (item instanceof VehicleTestCategoryModel) {
      this.navCtrl.push('TestsListPage', {vehicle: this.vehicle, vehicleTestCategoryTaxonomy: item.getChildren()});
    } else {
      let views = this.navCtrl.getViews();
      for (let i = views.length - 1; i >= 0; i--) {
        if (views[i].component.name == 'TestCreatePage') {
          let test = (item as VehicleTestModel)._clone();
          this.vehicle.addVehicleTest(test);
          this.navCtrl.popTo(views[i]);
        }
      }
    }
  }

}
