import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestTypesListPage } from './test-types-list';
import { PipesModule } from '../../../../pipes/pipes.module';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';

@NgModule({
  declarations: [TestTypesListPage],
  imports: [PipesModule, IonicPageModule.forChild(TestTypesListPage)],
  providers: [TestTypeService, VehicleService]
})
export class TestTypesListPageModule {}
