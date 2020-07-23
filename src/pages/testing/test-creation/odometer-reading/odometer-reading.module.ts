import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OdometerReadingPage } from './odometer-reading';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';

@NgModule({
  declarations: [OdometerReadingPage],
  imports: [IonicPageModule.forChild(OdometerReadingPage)],
  providers: [VehicleService]
})
export class OdometerReadingPageModule {}
