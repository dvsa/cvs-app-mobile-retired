import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { StorageService } from "../../../providers/natives/storage.service";
import { VisitService } from "../../../providers/visit/visit.service";
import { LOCAL_STORAGE, STORAGE, APP_STRINGS } from "../../../app/app.enums";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

@IonicPage()
@Component({
  selector: 'page-test-station-home',
  templateUrl: 'test-station-home.html'
})
export class TestStationHomePage implements OnInit {
  count: number = 0;
  appStrings: object = APP_STRINGS;

  constructor(public navCtrl: NavController, public toastController: ToastController, private storageService: StorageService, private visitService: VisitService, private screenOrientation: ScreenOrientation) {
  }

  ngOnInit() {
    this.visitService.easterEgg = localStorage.getItem(LOCAL_STORAGE.EASTER_EGG);
    this.visitService.caching = localStorage.getItem(LOCAL_STORAGE.CACHING);
    if (this.visitService.isCordova) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  ionViewDidLeave() {
    this.count = 0;
  }

  getStarted(): void {
    this.navCtrl.push('TestStationSearchPage');
  }

  enableCache() {
    this.count++;
    if (this.visitService.easterEgg == 'true' && this.count == 3) {
      if (this.visitService.caching == 'true') {
        localStorage.setItem(LOCAL_STORAGE.CACHING, 'false');
        this.visitService.caching = 'false';
        this.storageService.delete(STORAGE.STATE);
        this.storageService.delete(STORAGE.VISIT);
        this.count = 0;
        this.presentToast('Storage was cleared and caching was disabled. Ride on');
      } else {
        localStorage.setItem(LOCAL_STORAGE.CACHING, 'true');
        this.visitService.caching = 'true';
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
