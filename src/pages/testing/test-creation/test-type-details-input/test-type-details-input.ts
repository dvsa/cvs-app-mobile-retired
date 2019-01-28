import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-test-type-details-input',
  templateUrl: 'test-type-details-input.html',
})
export class TestTypeDetailsInputPage implements OnInit {

  sectionName;
  input;
  inputValue: string;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.sectionName = this.navParams.get('sectionName');
    this.input = this.navParams.get('input');
    let existentValue = this.navParams.get('existentValue');
    this.inputValue = existentValue !== null ? existentValue : '0';
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  onDone() {
    this.viewCtrl.dismiss(this.inputValue);
  }

}
