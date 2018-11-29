import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDefectItemPage } from './add-defect-item';
import {PipesModule} from "../../../../pipes/pipes.module";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { DirectivesModule } from "../../../../directives/directives.module";

@NgModule({
  declarations: [
    AddDefectItemPage,
  ],
  imports: [
    PipesModule,
    DirectivesModule,
    IonicPageModule.forChild(AddDefectItemPage),
  ],
  providers: [
    DefectsService
  ]
})
export class AddDefectItemPageModule {}
