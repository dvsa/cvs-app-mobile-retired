import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestCancelPage } from './test-cancel';
import { TestService } from "../../../../providers/test/test.service";

@NgModule({
  declarations: [
    TestCancelPage,
  ],
  imports: [
    IonicPageModule.forChild(TestCancelPage),
  ],
  providers: [
    TestService
  ]
})
export class TestCancelPageModule {
}
