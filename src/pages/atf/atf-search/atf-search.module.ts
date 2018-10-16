import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ATFSearchPage} from "./atf-search";
import {PipesModule} from "../../../pipes/pipes.module";
import {DirectivesModule} from "../../../directives/directives.module";
import {AtfService} from "../../../providers/atf/atf.service";
import {SearchService} from "../../../providers/search.service";

@NgModule({
  declarations: [
    ATFSearchPage,
  ],
  imports: [
    PipesModule,
    DirectivesModule,
    IonicPageModule.forChild(ATFSearchPage),
  ],
  providers: [
    AtfService,
    SearchService
  ]
})
export class AtfSearchModule {
}
