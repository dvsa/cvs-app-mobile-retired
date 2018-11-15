import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VisitTimelinePage} from "./visit-timeline";

@NgModule({
  declarations: [
    VisitTimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(VisitTimelinePage),
  ]
})
export class VisitTimelineModule {
}
