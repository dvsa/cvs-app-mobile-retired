import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddDefectPage} from "./add-defect";
import {PipesModule} from "../../../../pipes/pipes.module";
import {DefectsService} from "../../../../providers/defects/defects.service";
import { DirectivesModule } from "../../../../directives/directives.module";

@NgModule({
  declarations: [
    AddDefectPage,
  ],
  imports: [
    PipesModule,
    DirectivesModule,
    IonicPageModule.forChild(AddDefectPage),
  ],
  providers: [
    DefectsService
  ]
})
export class AddDefectModule {
}
