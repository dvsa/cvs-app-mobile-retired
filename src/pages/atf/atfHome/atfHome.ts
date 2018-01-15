import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ATFSearchPage } from '../../atf/atfSearch/atfSearch';
import { ATFDetailsPage } from '../../atf/atfDetails/atfDetails';

import { Atf } from '../../../models/atf';

import { AtfService } from '../../../services/atf.service';

@Component({
  selector: 'page-atfHome',
  templateUrl: 'atfHome.html'
})
export class ATFHomePage {

    closestAtf: Atf;

    constructor(public navCtrl: NavController, private atfService: AtfService) {

    }

    ngOnInit() {
        this.getClosestAtf();
    }

    getClosestAtf() {
        this.atfService.getClosestAtf().subscribe(atf => this.closestAtf = atf);
    }

    searchATF() {
        this.navCtrl.push(ATFSearchPage);
    }
    
    openATF() {
        this.navCtrl.push(ATFDetailsPage, {'atf': this.closestAtf});
    }
}
