import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestReviewPage } from './test-review';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { DefectsService } from '../../../../providers/defects/defects.service';
import { TestResultService } from '../../../../providers/test-result/test-result.service';
import { TestService } from '../../../../providers/test/test.service';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@NgModule({
  declarations: [TestReviewPage],
  imports: [IonicPageModule.forChild(TestReviewPage)],
  providers: [VehicleService, DefectsService, TestResultService, TestService, TestTypeService]
})
export class TestReviewPageModule {}
