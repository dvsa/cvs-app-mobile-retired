import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { VehicleTest } from '../../../../../models/vehicleTest';
import { Defect } from '../../../../../models/defect';

@Component({
  selector: 'page-defectDetails',
  templateUrl: 'defectDetails.html'
})
export class DefectDetailsPage {
  vehicleTest: VehicleTest;
  defect: Defect; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    this.vehicleTest = navParams.get('test');
    this.defect = navParams.get('defect');
  }

  addDefect() {
    var views = this.navCtrl.getViews();
    for (let i = views.length - 1; i >= 0; i--) {
      if (views[i].component.name == "CompleteTestPage") {
        this.vehicleTest.addDefect(this.defect);
        this.navCtrl.popTo(views[i]);
      }
    }
  }

  checkIfDefectWasAdded(): boolean {
    var found = false;
    this.vehicleTest.getDefects().forEach(defect => {
      if (defect == this.defect) {
        found = true;
      }
    });
    return found;
  }

  addAttachment() {
    
  }

  openManual() {
    const browser = this.iab.create('https://www.gov.uk/government/publications/hgv-inspection-manual');
  }
 
}
