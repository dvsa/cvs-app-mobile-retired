import { Component } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';

import { AppService } from '../../providers/global';
import { PAGE_NAMES, SIGNATURE_STATUS } from '../../app/app.enums';
import { AuthenticationService } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    private navCtrl: NavController,
    private events: Events,
    private authenticationService: AuthenticationService,
    private appService: AppService
  ) {}

  async login() {
    const authStatus = await this.authenticationService.checkUserAuthStatus();
    if (authStatus) {
      await this.navigateToSignature();
    }
  }

  // async login() {
  //   // await this.authenticationService.initialiseAuth();
  //   // await this.authenticationService.expireTokens();

  //   const isAuthenticated = await this.authenticationService.isAuthenticated();
  //   if (!isAuthenticated) {
  //     await this.authenticationService.login();
  //   }

  //   await this.navigateToSignature();

  //   // const authStatus = await this.authenticationService.checkUserAuthStatus();
  //   // if (authStatus) {
  //   // }
  // }

  async navigateToSignature() {
    if (!this.appService.isSignatureRegistered) {
      await this.navCtrl.setRoot(PAGE_NAMES.SIGNATURE_PAD_PAGE);
    } else {
      this.events.publish(SIGNATURE_STATUS.PRE_REGISTERED);
    }
  }
}
