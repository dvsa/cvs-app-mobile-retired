import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CompleteTestPage} from "./complete-test";

@NgModule({
  declarations: [
    CompleteTestPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteTestPage),
  ]
})
export class CompleteTestModule {
}
