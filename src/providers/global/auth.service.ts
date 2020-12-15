import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
// import { AuthenticationContext, AuthenticationResult, MSAdal } from '@ionic-native/ms-adal';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { default as AppConfig } from '../../../config/application.hybrid';
import { TesterDetailsModel } from '../../models/tester-details.model';
import { AUTH, LOCAL_STORAGE, TESTER_ROLES, LOG_TYPES } from '../../app/app.enums';
import { CommonRegExp } from '../utils/common-regExp';
import { CommonFunctionsService } from '../utils/common-functions';
import { Log } from '../../modules/logs/logs.model';
import { LogsProvider } from '../../modules/logs/logs.service';

@Injectable()
export class AuthService {
  testerDetails: TesterDetailsModel;
  jwtToken: string;
  // authContext: AuthenticationContext;
  userRoles: string[] = [];
  tenantId: string;

  constructor(
    // private msAdal: MSAdal,
    public platform: Platform,
    private commonFunc: CommonFunctionsService,
    private logProvider: LogsProvider
  ) {
    this.testerDetails = {} as TesterDetailsModel;
    this.jwtToken = localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN);
  }

  createAuthContext(): Promise<any> {
    // this.authContext = this.msAdal.createAuthenticationContext(AppConfig.app.MSAL_AUTHORITY);
    return Promise.resolve();
  }

  resetTokenCache(): Promise<any> {
    // this.authContext.tokenCache.clear();
    return Promise.resolve();
  }

  login(): Observable<string | ErrorObservable> {
    return Observable.from(this.loginSilently());
  }

  private loginSilently(): Promise<any> {
    // return this.authContext
    //   .acquireTokenSilentAsync(AppConfig.app.MSAL_RESOURCE_URL, AppConfig.app.MSAL_CLIENT_ID, '')
    //   .then((silentAuthResponse: any) => {
    //     this.logLoginAttempt(true);
    //     let authHeader = silentAuthResponse.createAuthorizationHeader();
    //     this.testerDetails = this.setTesterDetails(silentAuthResponse);
    //     this.logLoginSuccessful();
    //     return authHeader;
    //   })
    //   .catch((error) => {
    //     if (error.code == AUTH.MS_ADA_ERROR_USER_INPUT) {
    //       return this.loginWithUI();
    //     } else {
    //       console.error(error);
    //       this.logLoginUnsuccessful(error['code']);
    //     }
    //   });
    return Promise.resolve();
  }

  private loginWithUI(): Promise<any> {
    this.logLoginAttempt(false);
    // return this.authContext
    //   .acquireTokenAsync(
    //     AppConfig.app.MSAL_RESOURCE_URL,
    //     AppConfig.app.MSAL_CLIENT_ID,
    //     AppConfig.app.MSAL_REDIRECT_URL,
    //     '',
    //     ''
    //   )
    //   .then((authResponse: any) => {
    //     let authHeader = authResponse.createAuthorizationHeader();
    //     this.testerDetails = this.setTesterDetails(authResponse);
    //     this.logLoginSuccessful();
    //     return authHeader;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.logLoginUnsuccessful(error['code']);
    //     return error['code'];
    //   });
    return Promise.resolve();
  }

  logLoginAttempt(silentLoginAttempt: boolean) {
    let log: Log;
    if (silentLoginAttempt) {
      log = {
        type: LOG_TYPES.INFO,
        message: `Silent login attempt, token present for client_id=${AppConfig.app.MSAL_CLIENT_ID}, resource_url=${AppConfig.app.MSAL_RESOURCE_URL}`,
        timestamp: Date.now(),
        unauthenticated: true
      };
    } else {
      log = {
        type: LOG_TYPES.INFO,
        message: `Login attempt, token not present for client_id=${AppConfig.app.MSAL_CLIENT_ID}, redirect_url=${AppConfig.app.MSAL_REDIRECT_URL}, resource_url=${AppConfig.app.MSAL_RESOURCE_URL}`,
        timestamp: Date.now(),
        unauthenticated: true
      };
    }

    this.logProvider.dispatchLog(log);
  }

  logLoginSuccessful() {
    const log: Log = {
      type: LOG_TYPES.INFO,
      message: `${this.testerDetails.testerId} - Login successful for client_id=${
        AppConfig.app.MSAL_CLIENT_ID
      }, tenant_id=${this.tenantId} with the user roles=${this.userRoles.toString()}`,
      timestamp: Date.now()
    };

    this.logProvider.dispatchLog(log);
  }

  logLoginUnsuccessful(errorMessage: string) {
    const log: Log = {
      type: LOG_TYPES.ERROR,
      message: `Login unsuccessful for client_id=${AppConfig.app.MSAL_CLIENT_ID} with the error message ${errorMessage}`,
      timestamp: Date.now(),
      unauthenticated: true
    };

    this.logProvider.dispatchLog(log);
  }

  setJWTToken(token: string): void {
    this.jwtToken = token;
    localStorage.setItem(LOCAL_STORAGE.JWT_TOKEN, this.jwtToken);
  }

  getJWTToken() {
    return this.jwtToken;
  }

  getOid() {
    return JSON.parse(localStorage.getItem('tester-details')).testerId;
  }

  isValidToken(token): boolean {
    let tokenStr = token ? token.slice(7, token.length - 1) : null;
    return tokenStr && tokenStr.match(CommonRegExp.JTW_TOKEN);
  }

  setTesterDetails(
    authResponse: any | any,
    testerId = this.commonFunc.randomString(9),
    testerObfuscatedOid = this.commonFunc.randomString(9),
    testerName = this.commonFunc.randomString(9),
    testerEmail = `${testerName}.${testerId}@email.com`,
    testerRoles = [TESTER_ROLES.FULL_ACCESS]
  ): TesterDetailsModel {
    let details: TesterDetailsModel = {
      testerName,
      testerId,
      testerEmail,
      testerRoles,
      testerObfuscatedOid
    };

    if (authResponse) {
      let decodedToken = this.decodeJWT(authResponse.accessToken);
      details.testerId = decodedToken.employeeid || decodedToken.oid;
      details.testerObfuscatedOid = this.commonFunc.getObfuscatedTesterOid(
        decodedToken.oid ? decodedToken.oid : ''
      );
      details.testerName = decodedToken['name'];
      details.testerEmail = decodedToken['upn'];
      details.testerRoles = decodedToken['roles'];
      this.tenantId = decodedToken['tid'];
    }
    this.userRoles = details.testerRoles;
    localStorage.setItem('tester-details', JSON.stringify(details));
    return details;
  }

  decodeJWT(token) {
    return jwt_decode(token);
  }

  hasRights(userRoles: string[], neededRoles: string[]): boolean {
    return userRoles.some((role) => neededRoles.indexOf(role) >= 0);
  }
}
