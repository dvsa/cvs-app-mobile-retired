import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteTestPage } from "./complete-test";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";

@NgModule({
  declarations: [
    CompleteTestPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteTestPage),
  ],
  providers: [
    DefectsService,
    TestTypeService
  ]
})
export class CompleteTestModule {
}
