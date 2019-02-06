import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AppConfig } from "../../../../config/app.config";
import { StorageService } from "../../../providers/natives/storage.service";
import { VisitService } from "../../../providers/visit/visit.service";

@IonicPage({
  segment: 'home'
})
@Component({
  selector: 'page-test-station-home',
  templateUrl: 'test-station-home.html'
})
export class TestStationHomePage implements OnInit {
  count: number = 0;

  constructor(public navCtrl: NavController, public toastController: ToastController, private storageService: StorageService, private visitService: VisitService) {
  }

  ngOnInit() {
    this.visitService.easterEgg = localStorage.getItem('easterEgg');
  }

  ionViewDidLeave() {
    this.count = 0;
  }

  getStarted() {
    this.navCtrl.push('TestStationSearchPage');
  }

  enableCache() {
    this.count++;
    if (AppConfig.IS_PRODUCTION == 'false' && this.count == 3) {
      if (this.visitService.easterEgg == 'false') {
        localStorage.setItem('easterEgg', 'true');
        this.visitService.easterEgg = 'true';
        this.storageService.delete('state');
        this.storageService.delete('visit');
        this.count = 0;
        this.presentToast('Storage was cleared and caching was disabled. Ride on');
      } else {
        localStorage.setItem('easterEgg', 'false');
        this.visitService.easterEgg = 'false';
        this.count = 0;
        this.presentToast('Caching was enabled');
      }
    }
  }

  presentToast(message: string): void {
    const toast = this.toastController.create({
      message: message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
