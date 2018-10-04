import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AtfModel} from '../../../models/atf.model';
import {AtfService} from '../../../services/atf.service';

@IonicPage()
@Component({
  selector: 'page-atf-home',
  templateUrl: 'atf-home.html'
})
export class ATFHomePage implements OnInit {
  closestAtf: AtfModel;

  constructor(public navCtrl: NavController, private atfService: AtfService) {
  }

  ngOnInit() {
    this.getClosestAtf();
  }

  getClosestAtf(): void {
    this.atfService.getClosestAtf()
      .subscribe(
        atf => this.closestAtf = atf
      );
  }

  searchATF(): void {
    this.navCtrl.push('ATFSearchPage');
  }

  openATF(): void {
    this.navCtrl.push('ATFDetailsPage', {atf: this.closestAtf});
  }
}
