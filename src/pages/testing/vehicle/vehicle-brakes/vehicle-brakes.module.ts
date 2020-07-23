import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleBrakesPage } from './vehicle-brakes';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [VehicleBrakesPage],
  imports: [IonicPageModule.forChild(VehicleBrakesPage), PipesModule],
  providers: [CommonFunctionsService]
})
export class VehicleBrakesPageModule {}
