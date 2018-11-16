import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDefectCategoryPage } from './add-defect-category';
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddDefectCategoryPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(AddDefectCategoryPage),
  ],
})
export class AddDefectCategoryPageModule {}
