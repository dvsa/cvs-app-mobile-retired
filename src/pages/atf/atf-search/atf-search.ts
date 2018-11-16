import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {AtfModel} from '../../../models/atf.model';
import {AtfService} from '../../../providers/atf/atf.service'
import {SearchService} from "../../../providers/search.service";

@IonicPage()
@Component({
  selector: 'page-atf-search',
  templateUrl: 'atf-search.html',
})
export class ATFSearchPage implements OnInit {
  @ViewChild('searchBar') searchBar
  atfs: AtfModel[] = [];
  filteredAtfs: AtfModel[] = [];
  searchVal: string = '';

  constructor(public navCtrl: NavController, public events: Events, private atfService: AtfService, private searchService: SearchService) {
  }

  ngOnInit() {
    this.getAtfs();
  }

  getAtfs(): void {
    this.atfService.getAtfsFromStorage().subscribe(
      (atfs: AtfModel[]) => {
        this.atfs = this.filteredAtfs = this.searchService.sortAndSearchATF(atfs, this.searchVal, ['atfName']);
      }
    );
  }

  openATF(atf: AtfModel): void {
    this.navCtrl.push('ATFDetailsPage', {atf: atf}).then(
      () => {
        this.clearSearch();
      }
    );
  }

  boldSearchVal(str: string, find: string): string {
    return this.searchService.boldSearchVal(str, find);
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredAtfs = this.searchService.sortAndSearchATF(this.atfs, this.searchVal, ['atfName', 'atfNumber', 'atfAddress'])
  }

  private clearSearch(): void {
    this.events.publish('navToDetails');
    this.searchVal = '';
    this.filteredAtfs = this.searchService.sortAndSearchATF(this.atfs, this.searchVal, ['atfName']);
  }
}