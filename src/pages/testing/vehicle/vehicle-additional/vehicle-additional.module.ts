import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleAdditionalPage } from './vehicle-additional';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { PipesModule } from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    VehicleAdditionalPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleAdditionalPage),
    PipesModule
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleAdditionalPageModule {
}
