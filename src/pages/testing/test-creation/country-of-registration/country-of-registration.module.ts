import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegionReadingPage } from './country-of-registration';
import { DirectivesModule } from "../../../../directives/directives.module";

@NgModule({
  declarations: [
    RegionReadingPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(RegionReadingPage),

  ],
  providers: []
})
export class RegionReadingPageModule {
}
