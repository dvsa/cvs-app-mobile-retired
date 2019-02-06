import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { EuVehicleCategoryData } from "../../../../assets/app-data/eu-vehicle-category/eu-vehicle-category";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VisitService } from "../../../../providers/visit/visit.service";

@IonicPage()
@Component({
  selector: 'page-eu-vehicle-category',
  templateUrl: 'eu-vehicle-category.html',
})
export class CategoryReadingPage implements OnInit {
  vehicle: VehicleModel;
  categoriesArr = [];

  constructor(private navParams: NavParams,
              private visitService: VisitService,
              private viewCtrl: ViewController) {
    this.vehicle = this.navParams.get('vehicle');
  }

  ngOnInit(): void {
    this.categoriesArr = EuVehicleCategoryData.EuCategoryData;
  }

  setVehicleCategory(category) {
    this.vehicle.euVehicleCategory = category;
    this.visitService.updateVisit();
  }

  onSave() {
    this.viewCtrl.dismiss();
  }
}

