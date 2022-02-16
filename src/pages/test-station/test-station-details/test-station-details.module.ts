import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpAlertService } from '../../../providers/global/http-alert-service/http-alert.service';
import { TestStationDetailsPage } from './test-station-details';

@NgModule({
  declarations: [TestStationDetailsPage],
  imports: [IonicPageModule.forChild(TestStationDetailsPage)],
  providers: [HttpAlertService],
})
export class TestStationDetailsModule {}
