import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleAdditionalPage } from './vehicle-additional';
import {CommonFunctionsService} from "../../../../../providers/utils/common-functions";

@NgModule({
  declarations: [
    VehicleAdditionalPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleAdditionalPage),
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleAdditionalPageModule {}
