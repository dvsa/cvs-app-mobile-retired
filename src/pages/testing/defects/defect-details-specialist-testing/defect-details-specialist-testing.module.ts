import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefectDetailsSpecialistTestingPage } from './defect-details-specialist-testing';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@NgModule({
  declarations: [DefectDetailsSpecialistTestingPage],
  imports: [IonicPageModule.forChild(DefectDetailsSpecialistTestingPage)],
  providers: [TestTypeService],
})
export class DefectDetailsSpecialistTestingPageModule {}
