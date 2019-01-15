import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleHistoryPage } from './vehicle-history';
import {CommonFunctionsService} from "../../../../providers/utils/common-functions";

@NgModule({
  declarations: [
    VehicleHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleHistoryPage),
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleHistoryPageModule {}
