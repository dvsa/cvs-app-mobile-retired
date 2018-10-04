import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ATFSearchPage} from "./atf-search";
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    ATFSearchPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ATFSearchPage),
  ]
})
export class AtfSearchModule {
}
