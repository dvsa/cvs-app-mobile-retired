import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleAdrDetailsPage } from './vehicle-adr-details';
import { PipesModule } from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    VehicleAdrDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleAdrDetailsPage),
    PipesModule,
  ],
})
export class VehicleAdrDetailsPageModule {}
