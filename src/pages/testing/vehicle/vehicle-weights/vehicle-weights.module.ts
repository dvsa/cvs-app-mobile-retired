import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleWeightsPage } from './vehicle-weights';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { PipesModule } from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    VehicleWeightsPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleWeightsPage),
    PipesModule
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleWeightsPageModule {}
