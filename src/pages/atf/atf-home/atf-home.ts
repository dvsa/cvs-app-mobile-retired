import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-atf-home',
  templateUrl: 'atf-home.html'
})
export class ATFHomePage {


  constructor(public navCtrl: NavController) {
  }

  getStarted(): void {
    this.navCtrl.push('ATFSearchPage');
  }
}
