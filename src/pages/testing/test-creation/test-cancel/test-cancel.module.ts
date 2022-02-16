import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestCancelPage } from './test-cancel';
import { TestService } from '../../../../providers/test/test.service';
import { TestResultService } from '../../../../providers/test-result/test-result.service';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { HttpAlertService } from '../../../../providers/global/http-alert-service/http-alert.service';

@NgModule({
  declarations: [TestCancelPage],
  imports: [IonicPageModule.forChild(TestCancelPage)],
  providers: [
    TestService,
    TestResultService,
    TestTypeService,
    HttpAlertService,
  ]
})
export class TestCancelPageModule {}
