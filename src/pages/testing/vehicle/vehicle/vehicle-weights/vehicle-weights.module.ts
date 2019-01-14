import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleWeightsPage } from './vehicle-weights';
import {CommonFunctionsService} from "../../../../../providers/utils/common-functions";

@NgModule({
  declarations: [
    VehicleWeightsPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleWeightsPage),
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleWeightsPageModule {}
