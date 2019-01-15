import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleHistoryDetailsPage } from './vehicle-history-details';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";

@NgModule({
  declarations: [
    VehicleHistoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleHistoryDetailsPage),
  ],
  providers: [
    CommonFunctionsService
  ],
})
export class VehicleHistoryDetailsPageModule {}
