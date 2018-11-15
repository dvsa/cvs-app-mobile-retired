import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ATFDetailsPage } from "./atf-details";

@NgModule({
  declarations: [
    ATFDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ATFDetailsPage)
  ]
})
export class AtfDetailsModule {
}
