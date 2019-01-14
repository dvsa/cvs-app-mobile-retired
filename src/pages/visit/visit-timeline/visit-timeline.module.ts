import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitTimelinePage } from "./visit-timeline";
import { TestService } from "../../../providers/test/test.service";

@NgModule({
  declarations: [
    VisitTimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(VisitTimelinePage),
  ],
  providers: [
    TestService
  ]
})
export class VisitTimelineModule {
}
