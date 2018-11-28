import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleWeightsPage } from './vehicle-weights';

@NgModule({
  declarations: [
    VehicleWeightsPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleWeightsPage),
  ],
})
export class VehicleWeightsPageModule {}
