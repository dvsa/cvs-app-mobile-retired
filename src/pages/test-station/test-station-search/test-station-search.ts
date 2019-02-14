import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController } from 'ionic-angular';
import { TestStationReferenceDataModel } from '../../../models/reference-data-models/test-station.model';
import { TestStationService } from '../../../providers/test-station/test-station.service'
import { APP } from "../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-test-station-search',
  templateUrl: 'test-station-search.html',
})
export class TestStationSearchPage implements OnInit {
  @ViewChild('searchBar') searchBar;
  testStations: TestStationReferenceDataModel[] = [];
  filteredTestStations: TestStationReferenceDataModel[] = [];
  searchVal: string = '';

  constructor(public navCtrl: NavController, public events: Events, private testStationService: TestStationService) {
  }

  ngOnInit() {
    this.getTestStations();
    document.querySelector('.back-button-icon').setAttribute('aria-hidden', 'true');
  }

  getTestStations(): void {
    this.testStationService.getTestStationsFromStorage().subscribe(
      (testStations: TestStationReferenceDataModel[]) => {
        this.testStations = this.filteredTestStations = this.testStationService.sortAndSearchTestStation(testStations, this.searchVal, ['testStationName']);
      }
    );
  }

  openTestStation(testStation: TestStationReferenceDataModel): void {
    this.navCtrl.push('TestStationDetailsPage', {testStation: testStation}).then(
      () => {
        this.clearSearch();
      }
    );
  }

  boldSearchVal(str: string, find: string): string {
    return this.testStationService.boldSearchVal(str, find);
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredTestStations = this.testStationService.sortAndSearchTestStation(this.testStations, this.searchVal, ['testStationName', 'testStationPNumber', 'testStationAddress'])
  }

  private clearSearch(): void {
    this.events.publish(APP.NAV_OUT);
    this.searchVal = '';
    this.filteredTestStations = this.testStationService.sortAndSearchTestStation(this.testStations, this.searchVal, ['testStationName']);
  }
}
