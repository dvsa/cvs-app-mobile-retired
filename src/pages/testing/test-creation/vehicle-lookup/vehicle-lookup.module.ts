import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VehicleLookupPage} from "./vehicle-lookup";

@NgModule({
  declarations: [
    VehicleLookupPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleLookupPage),
  ]
})
export class VehicleLookupModule {
}
