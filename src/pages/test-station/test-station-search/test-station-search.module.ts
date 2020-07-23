import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestStationSearchPage } from './test-station-search';
import { PipesModule } from '../../../pipes/pipes.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { TestStationService } from '../../../providers/test-station/test-station.service';

@NgModule({
  declarations: [TestStationSearchPage],
  imports: [PipesModule, DirectivesModule, IonicPageModule.forChild(TestStationSearchPage)],
  providers: [TestStationService]
})
export class TestStationSearchModule {}
