import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleTyresPage } from './vehicle-tyres';
import {CommonFunctionsService} from "../../../../providers/utils/common-functions";

@NgModule({
  declarations: [
    VehicleTyresPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleTyresPage),
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleTyresPageModule {}
