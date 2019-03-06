import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleHistoryDetailsPage } from './vehicle-history-details';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    VehicleHistoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleHistoryDetailsPage),
    PipesModule
  ],
  providers: [
    CommonFunctionsService
  ],
})
export class VehicleHistoryDetailsPageModule {}
