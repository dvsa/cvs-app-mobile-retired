import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestStationHomePage } from './test-station-home';

@NgModule({
  declarations: [TestStationHomePage],
  imports: [IonicPageModule.forChild(TestStationHomePage)]
})
export class TestStationHomeModule {}
