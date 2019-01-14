import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPreparerPage } from './add-preparer';
import { PipesModule } from "../../../../pipes/pipes.module";
import { DirectivesModule } from "../../../../directives/directives.module";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";

@NgModule({
  declarations: [
    AddPreparerPage,
  ],
  imports: [
    PipesModule,
    DirectivesModule,
    IonicPageModule.forChild(AddPreparerPage),
  ],
  providers: [
    VehicleService
  ]
})
export class AddPreparerPageModule {}
