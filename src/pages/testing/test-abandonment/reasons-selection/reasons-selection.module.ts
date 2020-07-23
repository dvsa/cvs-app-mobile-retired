import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReasonsSelectionPage } from './reasons-selection';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@NgModule({
  declarations: [ReasonsSelectionPage],
  imports: [IonicPageModule.forChild(ReasonsSelectionPage)],
  providers: [TestTypeService]
})
export class ReasonsSelectionPageModule {}
