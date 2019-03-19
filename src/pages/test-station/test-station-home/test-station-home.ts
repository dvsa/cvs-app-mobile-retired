import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { StorageService } from "../../../providers/natives/storage.service";
import { VisitService } from "../../../providers/visit/visit.service";
import { LOCAL_STORAGE, STORAGE, APP_STRINGS, PAGE_NAMES } from "../../../app/app.enums";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AppService } from "../../../providers/global/app.service";

@IonicPage()
@Component({
  selector: 'page-test-station-home',
  templateUrl: 'test-station-home.html'
})
export class TestStationHomePage implements OnInit {
  appStrings: object = APP_STRINGS;

  constructor(public navCtrl: NavController,
              public appService: AppService,
              private storageService: StorageService,
              private visitService: VisitService,
              private screenOrientation: ScreenOrientation) {
  }

  ngOnInit() {
    if (this.appService.isCordova) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  getStarted(): void {
    if (this.appService.isCordova) {
      if (this.appService.isJwtTokenStored) {
        if (this.appService.isSignatureRegistered) {
          this.navCtrl.push(PAGE_NAMES.TEST_STATION_SEARCH_PAGE);
        } else {
          this.navCtrl.push(PAGE_NAMES.SIGNATURE_PAD_PAGE, {navController: this.navCtrl});
        }
      }
    } else {
      this.navCtrl.push(PAGE_NAMES.TEST_STATION_SEARCH_PAGE);
    }
  }

  enableCache() {
    this.appService.enableCache();
  }

}
