import { Injectable } from '@angular/core';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { VaultService } from '../vault/vault.service';
import { cordovaAzureConfig, webAzureConfig } from './auth-options';
import { TokenInfo, TokenStatus } from '.';
import { AUTH } from './../../../app/app.enums';
import { CommonFunctionsService } from '../../utils/common-functions';

@Injectable()
export class AuthenticationService extends IonicAuth {
  private vaultService: VaultService;
  private commonFunc: CommonFunctionsService;
  private _tokenInfo: TokenInfo;

  private _loginStatusChanged: Subject<boolean>;
  get loginStatusChanged(): Observable<boolean> {
    return this._loginStatusChanged.asObservable();
  }

  get tokenInfo(): TokenInfo {
    return this._tokenInfo;
  }

  constructor(
    platform: Platform,
    vaultService: VaultService,
    commonFunc: CommonFunctionsService
  ) {
    const isCordovaApp = platform.is('cordova');
    const config = isCordovaApp ? cordovaAzureConfig : webAzureConfig;
    config.tokenStorageProvider = vaultService;

    super(config);

    this.vaultService = vaultService;
    this.commonFunc = commonFunc;

    this._loginStatusChanged = new Subject();
    vaultService.lockChanged.subscribe((locked) => this._loginStatusChanged.next(!locked));
  }

  async login(): Promise<void> {
    try {
      await this.vaultService.logout();
      await this.vaultService.setDesiredAuthMode();
      await super.login();

      this._tokenInfo = await this.getTokenDetails();
      this.storeTesterObfusctatedId(this._tokenInfo.testerId);

      this._loginStatusChanged.next(true);
    } catch (err) {
      const message: string = err.message;

      if (message !== undefined && message.startsWith('AADB2C90118')) {
        await super.login(/*optional reset link policy from Azure could be passed here*/);
      } else {
        throw new Error(err);
      }
    }
  }

  onLoginSuccess() {
    // Web only: Using "current window" sign-in,
    console.log(`We've Successfully logged in!!!`);
  }

  hasUserRights(checkRoles: string[]): boolean {
    if (!this.tokenInfo) {
      return;
    }

    const { testerRoles: roles } = this.tokenInfo;

    return roles.some((role) => checkRoles.indexOf(role) >= 0);
  }

  async getTokenDetails(): Promise<TokenInfo> {
    const { id_token: token } = await this.getAuthResponse();

    const decodedToken: any = jwt_decode(token);

    return {
      id: decodedToken.sub,
      testerName: decodedToken.name,
      testerEmail: decodedToken.email,
      testerRoles: decodedToken.roles,
      oid: decodedToken.oid || '',
      employeeId: decodedToken.employeeid || '',
      testerId: decodedToken.oid || decodedToken.employeeid,
      token: token
    };
  }

  storeTesterObfusctatedId(testerId: string) {
    localStorage.setItem('obs-tester-id', this.commonFunc.getObfuscatedTesterOid(testerId));
  }

  async isUserAuthenticated(): Promise<TokenStatus> {
    if (!(await super.isAccessTokenAvailable())) {
      return { active: false, action: AUTH.RE_LOGIN };
    }

    if (window.navigator.onLine) {
      //await super.refreshSession(); //
      if (await super.isAuthenticated()) {
        this._tokenInfo = await this.getTokenDetails();

        return { active: true, action: AUTH.CONTINUE };
      } else {
        return { active: false, action: AUTH.RE_LOGIN };
      }
    } else {
      // show a popup to indicate internet needed
      return { active: false, action: AUTH.INTERNET_REQUIRED };
    }
  }

  // async isUserAuthenticated(): Promise<TokenStatus> {
  //   if (!(await super.isAccessTokenAvailable())) {
  //     return { active: false, action: AUTH.RE_LOGIN };
  //   }

  //   if (window.navigator.onLine) {
  //     if (await super.isAccessTokenExpired()) {
  //       try {
  //         await super.refreshSession();
  //         this._tokenInfo = await this.getTokenDetails();

  //         return { active: true, action: AUTH.CONTINUE };
  //       } catch (error) {
  //         window.localStorage.clear();

  //         return { active: false, action: AUTH.RE_LOGIN };
  //       }
  //     } else {
  //       return { active: true, action: AUTH.CONTINUE };
  //     }
  //   } else {
  //     // show a popup to indicate internet needed
  //     return { active: false, action: AUTH.INTERNET_REQUIRED };
  //   }
  // }
}
