import { Injectable } from '@angular/core';
import { AppConfig } from "../../../config/app.config";
import { AuthenticationContext, AuthenticationResult, MSAdal } from "@ionic-native/ms-adal";
import * as jwt_decode from "jwt-decode";
import { TesterDetailsModel } from "../../models/tester-details.model";
import { AUTH, LOCAL_STORAGE, TESTER_ROLES, LOG_TYPES } from "../../app/app.enums";
import { Observable } from "rxjs";
import { CommonRegExp } from "../utils/common-regExp";
import { Platform } from "ionic-angular";
import { CommonFunctionsService } from "../utils/common-functions";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Log, LogsModel } from "../../modules/logs/logs.model";
import * as logsActions from "../../modules/logs/logs.actions";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthService {
  testerDetails: TesterDetailsModel;
  jwtToken: string;
  authContext: AuthenticationContext;
  userRoles: string[] = [];
  tenantId: string;

  constructor(private msAdal: MSAdal,
              public platform: Platform,
              private commonFunc: CommonFunctionsService,
              private store$: Store<LogsModel>) {
    this.testerDetails = {} as TesterDetailsModel;
    this.jwtToken = localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN);
  }

  createAuthContext(): Promise<any> {
    this.authContext = this.msAdal.createAuthenticationContext(AppConfig.MSAL_AUTHORITY);
    return Promise.resolve();
  }

  resetTokenCache(): Promise<any> {
    this.authContext.tokenCache.clear();
    return Promise.resolve();
  }

  login(): Observable<string | ErrorObservable> {
    return Observable.from(this.loginSilently());
  }

  private loginSilently(): Promise<string> {
    return this.authContext.acquireTokenSilentAsync(AppConfig.MSAL_RESOURCE_URL, AppConfig.MSAL_CLIENT_ID, '').then(
      (silentAuthResponse: AuthenticationResult) => {
        this.logLoginAttempt(true);
        let authHeader = silentAuthResponse.createAuthorizationHeader();
        this.testerDetails = this.setTesterDetails(silentAuthResponse);
        this.logLoginSuccessful();
        return authHeader;
      },
    ).catch(
      (error) => {
        if (error.code == AUTH.MS_ADA_ERROR_USER_INPUT) {
          return this.loginWithUI();
        } else {
          console.error(error);
          this.logLoginUnsuccessful(error['code']);
        }
      }
    )
  }


  private loginWithUI(): Promise<string> {
    this.logLoginAttempt(false);
    return this.authContext.acquireTokenAsync(AppConfig.MSAL_RESOURCE_URL, AppConfig.MSAL_CLIENT_ID, AppConfig.MSAL_REDIRECT_URL, '', '').then(
      (authResponse: AuthenticationResult) => {
        let authHeader = authResponse.createAuthorizationHeader();
        this.testerDetails = this.setTesterDetails(authResponse);
        this.logLoginSuccessful();
        return authHeader;
      }
    ).catch(
      (error) => {
        console.log(error);
        this.logLoginUnsuccessful(error['code']);
        return error['code'];
      }
    )
  }

  logLoginAttempt(silentLoginAttempt: boolean) {
    let log: Log;
    if (silentLoginAttempt) {
      log = {
        type: LOG_TYPES.INFO,
        message: `Silent login attempt, token present for client_id=${AppConfig.MSAL_CLIENT_ID}, resource_url=${AppConfig.MSAL_RESOURCE_URL}`,
        timestamp: Date.now(),
        unauthenticated: true
      };
    } else {
      log = {
        type: LOG_TYPES.INFO,
        message: `Login attempt, token not present for client_id=${AppConfig.MSAL_CLIENT_ID}, redirect_url=${AppConfig.MSAL_REDIRECT_URL}, resource_url=${AppConfig.MSAL_RESOURCE_URL}`,
        timestamp: Date.now(),
        unauthenticated: true
      };
    }
    this.store$.dispatch(new logsActions.SaveLog(log));
  }

  logLoginSuccessful() {
    const log: Log = {
      type: LOG_TYPES.INFO,
      message: `${this.testerDetails.testerId} - Login successful for client_id=${AppConfig.MSAL_CLIENT_ID}, tenant_id=${this.tenantId} with the user roles=${this.userRoles.toString()}`,
      timestamp: Date.now()
    };
    this.store$.dispatch(new logsActions.SaveLog(log));
  }

  logLoginUnsuccessful(errorMessage: string) {
    const log: Log = {
      type: LOG_TYPES.ERROR,
      message: `Login unsuccessful for client_id=${AppConfig.MSAL_CLIENT_ID} with the error message ${errorMessage}`,
      timestamp: Date.now(),
      unauthenticated: true
    };
    this.store$.dispatch(new logsActions.SaveLog(log));
  }

  setJWTToken(token): Promise<any> {
    this.jwtToken = token;
    localStorage.setItem(LOCAL_STORAGE.JWT_TOKEN, this.jwtToken);
    return Promise.resolve();
  }

  getJWTToken() {
    return this.jwtToken;
  }

  getOid() {
    return (JSON.parse(localStorage.getItem('tester-details'))).testerId;
  }

  isValidToken(token): boolean {
    let tokenStr = token ? token.slice(7, token.length - 1) : null;
    return (tokenStr && tokenStr.match(CommonRegExp.JTW_TOKEN));
  }

  setTesterDetails(authResponse: AuthenticationResult | any,
                   testerId = this.commonFunc.randomString(9),
                   testerName = this.commonFunc.randomString(9),
                   testerEmail = `${testerName}.${testerId}@email.com`,
                   testerRoles = [TESTER_ROLES.FULL_ACCESS]): TesterDetailsModel {

    let details: TesterDetailsModel = {
      testerName,
      testerId,
      testerEmail,
      testerRoles
    };

    if (authResponse) {
      let decodedToken = this.decodeJWT(authResponse.accessToken);
      details.testerId = decodedToken.employeeid || decodedToken.oid;
      details.testerName = decodedToken['name'];
      details.testerEmail = decodedToken['upn'];
      details.testerRoles = decodedToken['roles'];
      this.tenantId = decodedToken['tid'];
    }
    this.userRoles = details.testerRoles;
    localStorage.setItem('tester-details', JSON.stringify(details));
    return details
  }

  decodeJWT(token) {
    return jwt_decode(token);
  }

  hasRights(userRoles: string[], neededRoles: string[]): boolean {
    return userRoles.some(role => neededRoles.indexOf(role) >= 0);
  }
}
