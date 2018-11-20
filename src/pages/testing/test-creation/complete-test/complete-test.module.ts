import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CompleteTestPage} from "./complete-test";
import { DefectsService } from "../../../../providers/defects/defects.service";

@NgModule({
  declarations: [
    CompleteTestPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteTestPage),
  ],
  providers: [
    DefectsService
  ]
})
export class CompleteTestModule {
}
