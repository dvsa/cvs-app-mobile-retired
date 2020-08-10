import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestAbandoningPage } from './test-abandoning';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@NgModule({
  declarations: [TestAbandoningPage],
  imports: [IonicPageModule.forChild(TestAbandoningPage)],
  providers: [TestTypeService],
})
export class TestAbandoningPageModule {}
