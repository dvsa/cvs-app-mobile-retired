import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefectDetailsPage } from './defect-details';
import { DefectsService } from '../../../../providers/defects/defects.service';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@NgModule({
  declarations: [DefectDetailsPage],
  imports: [IonicPageModule.forChild(DefectDetailsPage)],
  providers: [DefectsService, TestTypeService],
})
export class DefectDetailsModule {}
