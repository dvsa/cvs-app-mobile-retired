import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DefectDetailsPage} from "./defect-details";

@NgModule({
  declarations: [
    DefectDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DefectDetailsPage),
  ]
})
export class DefectDetailsModule {
}
