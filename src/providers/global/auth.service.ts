import { Injectable } from '@angular/core';
// import { AppConfig } from '../../../config/app.config';
// TODO Remove once Ionic-Auth works and remove dependencies cordova & @native
import { AuthenticationContext, AuthenticationResult, MSAdal } from '@ionic-native/ms-adal';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import * as jwt_decode from 'jwt-decode';
import { TesterDetailsModel } from '../../models/tester-details.model';
import { AUTH, LOCAL_STORAGE, TESTER_ROLES, LOG_TYPES } from '../../app/app.enums';
import { Observable } from 'rxjs';
import { CommonRegExp } from '../utils/common-regExp';
import { Platform } from 'ionic-angular';
import { CommonFunctionsService } from '../utils/common-functions';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Log, LogsModel } from '../../modules/logs/logs.model';
import * as logsActions from '../../modules/logs/logs.actions';
import { Store } from '@ngrx/store';

import {default as hybridConfig} from '../../../config/application.hybrid';
import {default as webConfig} from '../../../config/application.web';


export enum Token {
  ID = 'idToken',
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken'
}


@Injectable()
export class AuthService {
  testerDetails: TesterDetailsModel;
  jwtToken: string;
  authContext: AuthenticationContext;
  userRoles: string[] = [];
  tenantId: string;
  appConfig: any;
  public ionicAuth: IonicAuth;

  constructor(
    private msAdal: MSAdal,
    public platform: Platform,
    private commonFunc: CommonFunctionsService,
    private store$: Store<LogsModel>
  ) {
    // console.log({msAdal});
    // console.log({platform});

    this.testerDetails = {} as TesterDetailsModel;
    this.jwtToken = localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN);
    this.appConfig = null
  }

  private createAuthConfig = async(): Promise<IonicAuthOptions> => {
    //TODO flip the !, we want the hybrid config when hybrid, for now it is to debug
    // call IonicAuth create here
    const appConfig = !this.platform.is('hybrid') ?
      hybridConfig.options :
      webConfig.options
    this.appConfig = appConfig;
    return this.appConfig
  }

  public initIonicAuthConfig = async(): Promise<void> => {
    // Add those to the hybridConfig as IonicAuth needs options/IonicAuthOptions
    // https://github.com/ionic-team/demo-authconnect-azureb2c/blob/master/completed/src/environments/environment.ts
    // context: '',
    // resourceUrl: '',
    // clientId: '',
    // redirectUrl: '',
    // logoutUrl: ''
    try {
      const config = await this.createAuthConfig()
      console.log('config')
      console.log({config})
      // const azureWebConfig : IonicAuthOptions = {
      //   authConfig: 'azure',
      //   platform: 'web',
      //   clientID: config.MSAL_CLIENT_ID,
      //   discoveryUrl: `https://login.microsoftonline.com/${config}/v2.0/.well-known/openid-configuration?appid=${config.MSAL_CLIENT_ID}`,
      //   redirectUri: 'http://localhost:8100/',
      //   scope: 'openid offline_access profile email',
      //   logoutUrl: 'http://localhost:8100/'
      // };
      // console.log({azureWebConfig})
      // TODO this throws an error with webpack trying bundle that to run the tests
      // This has to be explored as it could require a shim or @ionic-enterprise/auth
      // not supported, Ionic team support/Sanj can help with that perhaps or Matt Culliford
      // https://github.com/ionic-team/demo-authconnect-azureb2c/blob/master/completed/src/app/services/authentication.service.ts#L28
      // const toto = this.ionicAuth = new IonicAuth(azureWebConfig)
      // console.log(toto)
    } catch(e) {
      throw new Error(e)
    }
  }

  public getAuthConfigOptions = (): any => {
    return this.appConfig
  }

  createAuthContext(): Promise<any> {
    this.authContext = this.msAdal.createAuthenticationContext(this.appConfig.MSAL_AUTHORITY);
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
    return this.authContext
      .acquireTokenSilentAsync(this.appConfig.MSAL_RESOURCE_URL, this.appConfig.MSAL_CLIENT_ID, '')
      .then((silentAuthResponse: AuthenticationResult) => {
        this.logLoginAttempt(true);
        let authHeader = silentAuthResponse.createAuthorizationHeader();
        this.testerDetails = this.setTesterDetails(silentAuthResponse);
        this.logLoginSuccessful();
        return authHeader;
      })
      .catch((error) => {
        if (error.code == AUTH.MS_ADA_ERROR_USER_INPUT) {
          return this.loginWithUI();
        } else {
          console.error(error);
          this.logLoginUnsuccessful(error['code']);
        }
      });
  }

  // private loginSilently(): Promise<any> {
  //   // https://login.microsoftonline.com/organizations/oauth2/v2.0/token
  //   return this.authContext.acquireTokenSilentAsync("https://login.microsoftonline.com/organizations/oauth2/v2.0/token", this.appConfig.MSAL_CLIENT_ID)
  //   .then(function(authResponse) {
  //     console.log("Token acquired: " + authResponse.accessToken);
  //     console.log("Token will expire on: " + authResponse.expiresOn);
  //   }, function(err) {
  //     console.log("Failed to authenticate: " + err);
  //   });
  // }

  private loginWithUI(): Promise<string> {
    this.logLoginAttempt(false);
    return this.authContext
      .acquireTokenAsync(
        this.appConfig.MSAL_RESOURCE_URL,
        this.appConfig.MSAL_CLIENT_ID,
        this.appConfig.MSAL_REDIRECT_URL,
        '',
        ''
      )
      .then((authResponse: AuthenticationResult) => {
        let authHeader = authResponse.createAuthorizationHeader();
        this.testerDetails = this.setTesterDetails(authResponse);
        this.logLoginSuccessful();
        return authHeader;
      })
      .catch((error) => {
        console.log(error);
        this.logLoginUnsuccessful(error['code']);
        return error['code'];
      });
  }


  setJWTToken(token): Promise<any> {
    this.jwtToken = token;
    localStorage.setItem(LOCAL_STORAGE.JWT_TOKEN, this.jwtToken);
    return Promise.resolve();
  }

  getJWTToken() {
    return 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiIxMWJlOGM0NC0yMmY1LTQzYmYtYjliYi01MDQ2N2EyNmNmYTciLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82YzQ0OGQ5MC00Y2ExLTRjYWYtYWI1OS0wYTJhYTY3ZDc4MDEvIiwiaWF0IjoxNTk3NDM0NzkyLCJuYmYiOjE1OTc0MzQ3OTIsImV4cCI6MTU5NzQzNjI5MiwiYWlvIjoiQVNRQTIvOFFBQUFBUE9QU1hjS1N3Z2F2b2R5TTNXMHNPL09YT0w1NGplTW8ralE1RFZ2dXRNRT0iLCJhbXIiOlsicHdkIl0sImZhbWlseV9uYW1lIjoiRGV2IiwiZ2l2ZW5fbmFtZSI6IkNWUyIsImlwYWRkciI6IjIuMTIyLjMwLjIxMCIsIm5hbWUiOiJDVlMgRGV2Iiwibm9uY2UiOiI2Nzg5MTAiLCJvaWQiOiI4M2QwNTdjZi1jZTFlLTQ2NjktYWMxNy01OGJjMzg3OGVjYjAiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTYyMjIxMTAzMC0xNjAzNDEzMjI4LTEyNzk5NjkxMTctMTIxMiIsInJvbGVzIjpbIkNWU0Z1bGxBY2Nlc3MiXSwic3ViIjoiZVNVS1VwUXpMZ29veG9pLVdTWjdDRHJidWVNempoMmRFRXdHSFBEdXJRayIsInRpZCI6IjZjNDQ4ZDkwLTRjYTEtNGNhZi1hYjU5LTBhMmFhNjdkNzgwMSIsInVuaXF1ZV9uYW1lIjoiQ1ZTLkRldkBkdnNhdGVzdC1jbG91ZC51ayIsInVwbiI6IkNWUy5EZXZAZHZzYXRlc3QtY2xvdWQudWsiLCJ1dGkiOiIyX3ladXpqQWtrbUQ3anpieGdzSUFBIiwidmVyIjoiMS4wIiwiZW1wbG95ZWVpZCI6IjExMTExMTExIn0.ejj6bEK8ZUBetx3XY0koJDHpSuxGiAmDHnWOSfX6WFb8rxIS99L0x3qyaQHRz-g05i3mNutLdztLTjRNgNbeOwXeXlbTZEQon5ZuDlK2tJ780Dw-hKo2HkaezdJAFX5990b6WoBQLW7ZoxUKOUONLcfcCkLQbefxe3YsCABcFfHXn1Edp6c8xOWnArzqkSMcPTSE5fYRGAWCLCfIV3WxyV7FuGIhTO-xVKFTEA01zhk6jpjv1QUWuA_gcboAFIb9A2vw3oNrY7-fwh3fvnMI_CyzGldmG0OqbVyXghaCT-Ly6Uqxfg14rGvBuJ72uwPNcJKM3mtN_bUR_GvRSMY90A';
  }

  getOid() {
    return JSON.parse(localStorage.getItem('tester-details')).testerId;
  }


  setTesterDetails(
    authResponse: AuthenticationResult | any,
    testerId = this.commonFunc.randomString(9),
    testerName = this.commonFunc.randomString(9),
    testerEmail = `${testerName}.${testerId}@email.com`,
    testerRoles = [TESTER_ROLES.FULL_ACCESS]
  ): TesterDetailsModel {
    let details: TesterDetailsModel = {
      testerName,
      testerId,
      testerEmail,
      testerRoles
    };

    console.log({authResponse})
    if (authResponse) {
      let decodedToken = this.decodeJWT(authResponse.accessToken);
      console.log({decodedToken})
      details.testerId = decodedToken.employeeid || decodedToken.oid;
      details.testerName = decodedToken['name'];
      details.testerEmail = decodedToken['upn'];
      details.testerRoles = decodedToken['roles'];
      this.tenantId = decodedToken['tid'];
    }
    this.userRoles = details.testerRoles;
    localStorage.setItem('tester-details', JSON.stringify(details));
    return details;
  }


  // Utils

  decodeJWT(token) {
    return jwt_decode(token);
  }

  isValidToken(token): boolean {
    let tokenStr = token ? token.slice(7, token.length - 1) : null;
    return tokenStr && tokenStr.match(CommonRegExp.JTW_TOKEN);
  }


  hasRights(userRoles: string[], neededRoles: string[]): boolean {
    return userRoles.some((role) => neededRoles.indexOf(role) >= 0);
  }


  // Logs
  logLoginAttempt(silentLoginAttempt: boolean) {
    let log: Log;
    if (silentLoginAttempt) {
      log = {
        type: LOG_TYPES.INFO,
        message: `Silent login attempt, token present for client_id=${this.appConfig.MSAL_CLIENT_ID}, resource_url=${this.appConfig.MSAL_RESOURCE_URL}`,
        timestamp: Date.now(),
        unauthenticated: true
      };
    } else {
      log = {
        type: LOG_TYPES.INFO,
        message: `Login attempt, token not present for client_id=${this.appConfig.MSAL_CLIENT_ID}, redirect_url=${this.appConfig.MSAL_REDIRECT_URL}, resource_url=${this.appConfig.MSAL_RESOURCE_URL}`,
        timestamp: Date.now(),
        unauthenticated: true
      };
    }
    this.store$.dispatch(new logsActions.SaveLog(log));
  }

  logLoginSuccessful() {
    const log: Log = {
      type: LOG_TYPES.INFO,
      message: `${this.testerDetails.testerId} - Login successful for client_id=${
        this.appConfig.MSAL_CLIENT_ID
      }, tenant_id=${this.tenantId} with the user roles=${this.userRoles.toString()}`,
      timestamp: Date.now()
    };
    this.store$.dispatch(new logsActions.SaveLog(log));
  }

  logLoginUnsuccessful(errorMessage: string) {
    const log: Log = {
      type: LOG_TYPES.ERROR,
      message: `Login unsuccessful for client_id=${this.appConfig.MSAL_CLIENT_ID} with the error message ${errorMessage}`,
      timestamp: Date.now(),
      unauthenticated: true
    };
    this.store$.dispatch(new logsActions.SaveLog(log));
  }
}
