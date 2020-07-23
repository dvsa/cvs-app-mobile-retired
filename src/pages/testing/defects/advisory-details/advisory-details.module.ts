import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvisoryDetailsPage } from './advisory-details';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@NgModule({
  declarations: [AdvisoryDetailsPage],
  imports: [IonicPageModule.forChild(AdvisoryDetailsPage)],
  providers: [TestTypeService]
})
export class AdvisoryDetailsPageModule {}
