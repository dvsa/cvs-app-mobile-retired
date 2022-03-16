import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleHistoryPage } from './vehicle-history';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { PipesModule } from '../../../../pipes/pipes.module';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@NgModule({
  declarations: [VehicleHistoryPage],
  imports: [IonicPageModule.forChild(VehicleHistoryPage), PipesModule],
  providers: [CommonFunctionsService, TestTypeService]
})
export class VehicleHistoryPageModule {}
