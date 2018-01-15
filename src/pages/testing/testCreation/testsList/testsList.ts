import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Vehicle } from '../../../../models/vehicle';
import { VehicleTest } from '../../../../models/vehicleTest';
import { VehicleTestCategory } from '../../../../models/vehicleTestCategory';

import { VehicleTestCategorySevice } from '../../../../services/vehicleTestCategory.service';

@Component({
  selector: 'page-testsList',
  templateUrl: 'testsList.html'
})
export class TestsListPage {

  vehicle: Vehicle;
  vehicleTestCategoryTaxonomy: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private vehicleTestCategorySevice: VehicleTestCategorySevice) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTestCategoryTaxonomy = navParams.get('vehicleTestCategoryTaxonomy');
  }

  ngOnInit() {
    this.getVehicleTestCategoryTaxonomy();
  }

  getVehicleTestCategoryTaxonomy() {
    if (this.vehicleTestCategoryTaxonomy == null){
      this.vehicleTestCategorySevice.getVehicleTestCatergoriesTaxonomy().subscribe(vehicleTestCategoryTaxonomy => this.vehicleTestCategoryTaxonomy = vehicleTestCategoryTaxonomy);
    } else {
      this.filterSelectedVehicleTests();
    }
  }

  filterSelectedVehicleTests() {
    this.vehicleTestCategoryTaxonomy = this.vehicleTestCategoryTaxonomy.filter(testCategory => {
      var foundTestCategory = false;

      this.vehicle.getVehicleTests().forEach(vehicleTest => {
        if ((testCategory as VehicleTest).getName() == vehicleTest.getName()) {
          foundTestCategory = true;
        }
      });

      if (foundTestCategory) {
        return false;
      } else {
        return true;
      }
    });
  }

  selectedItem(item: Object) {
    if (item instanceof VehicleTestCategory) {
      this.navCtrl.push(TestsListPage, {'vehicle': this.vehicle, 'vehicleTestCategoryTaxonomy': item.getChildren()});
    } else {
      var views = this.navCtrl.getViews();
      for (let i = views.length - 1; i >= 0; i--) {
        if (views[i].component.name == "TestCreatePage") {
          var test = (item as VehicleTest)._clone();
          this.vehicle.addVehicleTest(test);
          this.navCtrl.popTo(views[i]);
        }
      }
    }
  }

}
