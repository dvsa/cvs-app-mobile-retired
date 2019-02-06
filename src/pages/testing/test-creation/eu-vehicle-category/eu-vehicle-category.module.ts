import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryReadingPage } from "./eu-vehicle-category";

@NgModule({
  declarations: [
    CategoryReadingPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryReadingPage),
  ],
  providers: []
})
export class RegionReadingPageModule {
}
