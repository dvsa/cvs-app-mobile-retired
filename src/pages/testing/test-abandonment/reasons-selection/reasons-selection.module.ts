import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReasonsSelectionPage } from './reasons-selection';

@NgModule({
  declarations: [
    ReasonsSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(ReasonsSelectionPage),
  ],
})
export class ReasonsSelectionPageModule {}
