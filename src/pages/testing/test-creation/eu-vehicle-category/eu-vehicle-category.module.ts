import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryReadingPage } from './eu-vehicle-category';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';

@NgModule({
  declarations: [CategoryReadingPage],
  imports: [IonicPageModule.forChild(CategoryReadingPage)],
  providers: [VehicleService],
})
export class RegionReadingPageModule {}
