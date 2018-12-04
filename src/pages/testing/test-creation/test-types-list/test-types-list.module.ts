import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestTypesListPage } from "./test-types-list";
import { PipesModule } from "../../../../pipes/pipes.module";
import { TestTypesService } from "../../../../providers/test-types/test-type.service";

@NgModule({
  declarations: [
    TestTypesListPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(TestTypesListPage),
  ],
  providers: [
    TestTypesService
  ]
})
export class TestTypesListPageModule {
}
