import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleScanPage } from './vehicle-scan';

@NgModule({
  declarations: [VehicleScanPage],
  imports: [IonicPageModule.forChild(VehicleScanPage)],
})
export class VehicleScanModule {}
