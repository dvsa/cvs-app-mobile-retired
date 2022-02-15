import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleLookupPage } from './vehicle-lookup';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { HttpAlertService } from '../../../../providers/global/http-alert-service/http-alert.service';

@NgModule({
  declarations: [VehicleLookupPage],
  imports: [IonicPageModule.forChild(VehicleLookupPage)],
  providers: [
    VehicleService,
    HttpAlertService,
  ]
})
export class VehicleLookupModule {}
