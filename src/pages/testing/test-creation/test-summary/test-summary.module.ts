import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TestSummaryPage} from "./test-summary";

@NgModule({
  declarations: [
    TestSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(TestSummaryPage),
  ]
})
export class TestSummaryModule {
}
