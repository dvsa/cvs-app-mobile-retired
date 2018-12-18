import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestCancelPage } from './test-cancel';

@NgModule({
  declarations: [
    TestCancelPage,
  ],
  imports: [
    IonicPageModule.forChild(TestCancelPage),
  ],
})
export class TestCancelPageModule {}
