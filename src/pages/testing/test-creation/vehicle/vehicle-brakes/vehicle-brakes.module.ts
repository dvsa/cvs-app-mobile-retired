import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleBrakesPage } from './vehicle-brakes';

@NgModule({
  declarations: [
    VehicleBrakesPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleBrakesPage),
  ],
})
export class VehicleBrakesPageModule {}
