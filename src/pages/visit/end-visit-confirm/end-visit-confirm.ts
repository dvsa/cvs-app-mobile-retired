import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-end-visit-confirm',
  templateUrl: 'end-visit-confirm.html',
})
export class EndVisitConfirmPage {
  testStationName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.testStationName = navParams.get('testStationName');
  }

  pushPage() {
    this.navCtrl.popToRoot();
  }
}
