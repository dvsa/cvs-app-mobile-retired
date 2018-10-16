import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ATFHomePage} from "./atf-home";

@NgModule({
  declarations: [
    ATFHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ATFHomePage)
  ]
})
export class AtfHomeModule {
}
