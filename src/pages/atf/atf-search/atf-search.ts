import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {AtfReferenceDataModel} from '../../../models/reference-data-models/atf.model';
import {AtfService} from '../../../providers/atf/atf.service'
import { APP } from "../../../app/app.enums";

@IonicPage()
@Component({
  selector: 'page-atf-search',
  templateUrl: 'atf-search.html',
})
export class ATFSearchPage implements OnInit {
  @ViewChild('searchBar') searchBar
  atfs: AtfReferenceDataModel[] = [];
  filteredAtfs: AtfReferenceDataModel[] = [];
  searchVal: string = '';

  constructor(public navCtrl: NavController, public events: Events, private atfService: AtfService) {
  }

  ngOnInit() {
    this.getAtfs();
  }

  getAtfs(): void {
    this.atfService.getAtfsFromStorage().subscribe(
      (atfs: AtfReferenceDataModel[]) => {
        this.atfs = this.filteredAtfs = this.atfService.sortAndSearchATF(atfs, this.searchVal, ['atfName']);
      }
    );
  }

  openATF(atf: AtfReferenceDataModel): void {
    this.navCtrl.push('ATFDetailsPage', {atf: atf}).then(
      () => {
        this.clearSearch();
      }
    );
  }

  boldSearchVal(str: string, find: string): string {
    return this.atfService.boldSearchVal(str, find);
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredAtfs = this.atfService.sortAndSearchATF(this.atfs, this.searchVal, ['atfName', 'atfNumber', 'atfAddress'])
  }

  private clearSearch(): void {
    this.events.publish(APP.NAV_OUT);
    this.searchVal = '';
    this.filteredAtfs = this.atfService.sortAndSearchATF(this.atfs, this.searchVal, ['atfName']);
  }
}
