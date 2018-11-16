import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvisoryDetailsPage } from './advisory-details';

@NgModule({
  declarations: [
    AdvisoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvisoryDetailsPage),
  ],
})
export class AdvisoryDetailsPageModule {}
