import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleBrakesPage } from './vehicle-brakes';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";

@NgModule({
  declarations: [
    VehicleBrakesPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleBrakesPage),
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleBrakesPageModule {
}
