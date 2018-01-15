import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-atfIssue',
  templateUrl: 'atfIssue.html'
})
export class ATFIssuePage {

  constructor(public navCtrl: NavController, private camera: Camera) {

  }

  addAttachment() {
   
  }
}
