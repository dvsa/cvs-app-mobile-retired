import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleDetailsPage } from "./vehicle-details";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { TestService } from "../../../../providers/test/test.service";

@NgModule({
  declarations: [
    VehicleDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleDetailsPage),
  ],
  providers: [
    CommonFunctionsService,
    TestService
  ]
})
export class VehicleDetailsModule {
}
