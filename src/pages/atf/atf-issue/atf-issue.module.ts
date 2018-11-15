import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ATFIssuePage} from "./atf-issue";

@NgModule({
  declarations: [
    ATFIssuePage,
  ],
  imports: [
    IonicPageModule.forChild(ATFIssuePage),
  ]
})
export class AtfIssueModule {
}
