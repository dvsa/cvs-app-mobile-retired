import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/platform/platform';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Observable, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import to from 'await-to-js';

import { VaultService } from '../vault/vault.service';
import { CommonFunctionsService } from '../../utils/common-functions';
import { AppAlertService } from '../../global/app-alert.service';
import { TokenInfo, TokenStatus } from '../authentication/auth-model';
import { cordovaAzureConfig, webAzureConfig } from '../authentication/auth-options';
import { AUTH } from '../../../app/app.enums';

@Injectable()
export class AuthenticationService {
  private _tokenInfo: TokenInfo;
  public _auth: IonicAuth;

  private _loginStatusChanged: Subject<boolean>;
  get loginStatusChanged(): Observable<boolean> {
    return this._loginStatusChanged.asObservable();
  }

  get tokenInfo(): TokenInfo {
    return this._tokenInfo;
  }

  get auth(): IonicAuth {
    return this._auth;
  }

  constructor(
    private platform: Platform,
    private vaultService: VaultService,
    private alertService: AppAlertService,
    private commonFunc: CommonFunctionsService
  ) {
    this.initialiseAuth();
  }

  async initialiseAuth() {
    const isCordovaApp = this.platform.is('cordova');
    const config = isCordovaApp ? cordovaAzureConfig : webAzureConfig;
    config.tokenStorageProvider = this.vaultService;

    this._loginStatusChanged = new Subject();
    this.vaultService.lockChanged.subscribe((locked) => this._loginStatusChanged.next(!locked));

    this._auth = new IonicAuth(config);
  }

  async expireTokens(): Promise<void> {
    await this._auth.expire();
  }

  async login(): Promise<void> {
    await this.vaultService.logout();
    await this.vaultService.setDesiredAuthMode();

    try {
      await this._auth.login();
    } catch (err) {
      console.log(err || err.message);
      /**
       * Not an idea solution here. Calling refreshSession immediately
       * because login failed.
       */
      const [error] = await to(this._auth.refreshSession());
      throw error;
    } finally {
      this._tokenInfo = await this.getTokenDetails();
      localStorage.setItem(
        'obs-tester-id',
        this.commonFunc.getObfuscatedTesterOid(this._tokenInfo.testerId)
      );
    }
  }

  async hasUserRights(checkRoles: string[]): Promise<boolean> {
    this._tokenInfo = (await this.getTokenDetails()) || ({} as TokenInfo);

    const { testerRoles: roles } = this._tokenInfo;
    return roles && roles.some((role) => checkRoles.indexOf(role) >= 0);
  }

  async getTokenDetails(): Promise<TokenInfo> {
    const authResponse = await this._auth.getAuthResponse();
    if (!authResponse) {
      return;
    }

    const { id_token: token } = authResponse;
    const decodedToken: any = jwt_decode(token);

    return {
      id: decodedToken.sub,
      testerName: decodedToken.name,
      testerEmail: decodedToken.email,
      testerRoles: decodedToken.roles,
      oid: decodedToken.oid || '',
      employeeId: decodedToken.employeeid || '',
      testerId: decodedToken.oid || decodedToken.employeeid,
      tokenExpiration: decodedToken.exp,
      token: token
    };
  }

  storeTesterValidity(tokenInfo: TokenInfo) {
    const { testerId, tokenExpiration } = tokenInfo;
    localStorage.setItem('obs-tester-id', this.commonFunc.getObfuscatedTesterOid(testerId));
    localStorage.setItem('tester-validity', tokenExpiration.toString());
  }

  isTesterTokenExpired(): boolean {
    const duration: number = +localStorage.getItem('tester-validity');
    return new Date(duration * 1000) < new Date();
  }

  async isUserAuthenticated(): Promise<TokenStatus> {
    if (window.navigator.onLine) {
      if (!(await this._auth.isAccessTokenAvailable())) {
        return { active: false, action: AUTH.RE_LOGIN };
      }

      if (await this._auth.isAccessTokenExpired()) {
        try {
          await this._auth.refreshSession();
        } catch (error) {
          return { active: false, action: AUTH.RE_LOGIN };
        }
      }

      this._tokenInfo = await this.getTokenDetails();

      return { active: true, action: AUTH.CONTINUE };
    } else {
      return { active: false, action: AUTH.INTERNET_REQUIRED };
    }
  }

  async checkUserAuthStatus(): Promise<boolean> {
    const { action } = await this.isUserAuthenticated();

    if (action === AUTH.RE_LOGIN) {
      const [error] = await to(this.login());
      if (error) {
        this.alertService.alertLoginFailed();
        return Promise.resolve(false);
      } else {
        this._loginStatusChanged.next(true);
      }
    }

    if (action === AUTH.INTERNET_REQUIRED) {
      this.alertService.alertInternetRequired();
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }
}
