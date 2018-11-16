import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDefectItemPage } from './add-defect-item';
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddDefectItemPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(AddDefectItemPage),
  ],
})
export class AddDefectItemPageModule {}
