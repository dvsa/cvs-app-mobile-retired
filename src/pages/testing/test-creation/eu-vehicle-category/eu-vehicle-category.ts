import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { EuVehicleCategoryData } from "../../../../assets/app-data/eu-vehicle-category/eu-vehicle-category";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VEHICLE_TYPE } from "../../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-eu-vehicle-category',
  templateUrl: 'eu-vehicle-category.html',
})
export class CategoryReadingPage implements OnInit {
  vehicle: VehicleModel;
  vehicleType: string;
  categorySubtitle: string = '';
  errorIncomplete: boolean;
  categoriesArr = [];

  constructor(private navParams: NavParams,
              private visitService: VisitService,
              private viewCtrl: ViewController) {
    this.vehicle = this.navParams.get('vehicle');
    this.errorIncomplete = this.navParams.get('errorIncomplete');
  }

  ngOnInit(): void {
    if (this.vehicle.euVehicleCategory) this.errorIncomplete = false;
    this.vehicleType = this.vehicle.techRecord.vehicleType;
    switch (this.vehicleType) {
      case VEHICLE_TYPE.PSV:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryPsvSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryPsvData;
        break;
      case VEHICLE_TYPE.HGV:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryHgvSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryHgvData;
        break;
      case VEHICLE_TYPE.TRL:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryTrlSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryTrlData;
    }
  }

  setVehicleCategory(category) {
    this.vehicle.euVehicleCategory = category;
    this.visitService.updateVisit();
    this.errorIncomplete = false;
  }

  onSave() {
    this.viewCtrl.dismiss();
  }
}

