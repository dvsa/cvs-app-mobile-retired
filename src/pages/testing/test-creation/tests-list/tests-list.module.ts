import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TestsListPage} from "./tests-list";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    TestsListPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(TestsListPage),
  ]
})
export class TestsListModule {
}
