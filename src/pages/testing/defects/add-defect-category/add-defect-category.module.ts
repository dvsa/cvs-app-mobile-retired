import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDefectCategoryPage } from './add-defect-category';
import { PipesModule } from '../../../../pipes/pipes.module';
import { DefectsService } from '../../../../providers/defects/defects.service';
import { DirectivesModule } from '../../../../directives/directives.module';

@NgModule({
  declarations: [AddDefectCategoryPage],
  imports: [PipesModule, DirectivesModule, IonicPageModule.forChild(AddDefectCategoryPage)],
  providers: [DefectsService]
})
export class AddDefectCategoryPageModule {}
