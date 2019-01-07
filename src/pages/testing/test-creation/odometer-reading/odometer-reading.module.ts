import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OdometerReadingPage } from './odometer-reading';

@NgModule({
  declarations: [
    OdometerReadingPage,
  ],
  imports: [
    IonicPageModule.forChild(OdometerReadingPage),
  ],
})
export class OdometerReadingPageModule {}
