import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestReviewPage } from './test-review';
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { DefectsService } from "../../../../providers/defects/defects.service";

@NgModule({
  declarations: [
    TestReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(TestReviewPage),
  ],
  providers: [
    VehicleService,
    DefectsService
  ]
})
export class TestReviewPageModule {
}
