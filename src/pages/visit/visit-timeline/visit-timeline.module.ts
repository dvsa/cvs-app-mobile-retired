import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitTimelinePage } from "./visit-timeline";
import { TestService } from "../../../providers/test/test.service";
import { PipesModule } from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    VisitTimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(VisitTimelinePage),
    PipesModule
  ],
  providers: [
    TestService
  ]
})
export class VisitTimelineModule {
}
