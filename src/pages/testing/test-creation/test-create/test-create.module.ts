import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TestCreatePage} from "./test-create";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";

@NgModule({
  declarations: [
    TestCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TestCreatePage),
  ],
  providers: [
    VehicleService
  ]
})
export class TestCreateModule {
}
