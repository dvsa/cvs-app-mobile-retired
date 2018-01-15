import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ATFDetailsPage } from '../../atf/atfDetails/atfDetails';

import { Atf } from '../../../models/atf';

import { AtfService } from '../../../services/atf.service'

@Component({
  selector: 'page-atfSearch',
  templateUrl: 'atfSearch.html'
})
export class ATFSearchPage {

  atfs: Atf[];

  constructor(public navCtrl: NavController, private atfService: AtfService) {

  }

  ngOnInit() {
    this.getAtfs();
  }

  getAtfs() {
    this.atfService.getAtfs().subscribe(atfs => this.atfs = atfs);
  }

  openATF(atf: Atf) {
    this.navCtrl.push(ATFDetailsPage, {'atf': atf});
  }
}
