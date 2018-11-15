import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TestCreatePage} from "./test-create";

@NgModule({
  declarations: [
    TestCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TestCreatePage),
  ]
})
export class TestCreateModule {
}
