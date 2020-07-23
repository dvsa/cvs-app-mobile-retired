import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleTyresPage } from './vehicle-tyres';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [VehicleTyresPage],
  imports: [IonicPageModule.forChild(VehicleTyresPage), PipesModule],
  providers: [CommonFunctionsService]
})
export class VehicleTyresPageModule {}
