import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AtfModel} from '../../../models/atf.model';
import {AtfService} from '../../../services/atf.service'

@IonicPage()
@Component({
  selector: 'page-atf-search',
  templateUrl: 'atf-search.html'
})
export class ATFSearchPage implements OnInit {
  atfs: AtfModel[];

  constructor(public navCtrl: NavController, private atfService: AtfService) {

  }

  ngOnInit() {
    this.getAtfs();
  }

  getAtfs(): void {
    this.atfService.getAtfs()
      .subscribe(
        atfs => this.atfs = atfs
      );
  }

  openATF(atf: AtfModel): void {
    this.navCtrl.push('ATFDetailsPage', {atf: atf});
  }
}
