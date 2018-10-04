import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddDefectPage} from "./add-defect";
import {PipesModule} from "../../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddDefectPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(AddDefectPage),
  ]
})
export class AddDefectModule {
}
