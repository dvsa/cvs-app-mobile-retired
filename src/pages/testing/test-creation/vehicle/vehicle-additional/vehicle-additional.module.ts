import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleAdditionalPage } from './vehicle-additional';

@NgModule({
  declarations: [
    VehicleAdditionalPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleAdditionalPage),
  ],
})
export class VehicleAdditionalPageModule {}
