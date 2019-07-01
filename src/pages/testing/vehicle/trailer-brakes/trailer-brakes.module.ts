import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrailerBrakesPage } from './trailer-brakes';
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { PipesModule } from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    TrailerBrakesPage,
  ],
  imports: [
    IonicPageModule.forChild(TrailerBrakesPage),
    PipesModule
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class TrailerBrakesPageModule {
}
