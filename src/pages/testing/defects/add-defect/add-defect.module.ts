import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddDefectPage} from "./add-defect";
import {PipesModule} from "../../../../pipes/pipes.module";
import {DefectsService} from "../../../../providers/defects/defects.service";

@NgModule({
  declarations: [
    AddDefectPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(AddDefectPage),
  ],
  providers: [
    DefectsService
  ]
})
export class AddDefectModule {
}
