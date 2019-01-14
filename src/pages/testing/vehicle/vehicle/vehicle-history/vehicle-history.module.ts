import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleHistoryPage } from './vehicle-history';

@NgModule({
  declarations: [
    VehicleHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleHistoryPage),
  ],
})
export class VehicleHistoryPageModule {}
