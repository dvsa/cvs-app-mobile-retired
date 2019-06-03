import {Injectable} from '@angular/core';
import {AppConfig} from "../../../config/app.config";
import {AuthenticationContext, AuthenticationResult, MSAdal} from "@ionic-native/ms-adal";
import * as jwt_decode from "jwt-decode";
import {TesterDetailsModel} from "../../models/tester-details.model";
import {AUTH, LOCAL_STORAGE, TESTER_ROLES, FIREBASE_AUTH} from "../../app/app.enums";
import {Observable} from "rxjs";
import {CommonRegExp} from "../utils/common-regExp";
import {Platform} from "ionic-angular";
import {CommonFunctionsService} from "../utils/common-functions";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {NetworkStateProvider} from "../../modules/logs/network-state.service";
import {FirebaseLogsService} from '../firebase-logs/firebase-logs.service';

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
              private networkStateProvider: NetworkStateProvider,
              private firebaseLogsService: FirebaseLogsService) {
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
        this.logFirebaseLoginAttempt(true);
        let authHeader = silentAuthResponse.createAuthorizationHeader();
        this.testerDetails = this.setTesterDetails(silentAuthResponse);
        this.logFirebaseLoginSuccessful();
        return authHeader;
      },
    ).catch(
      (error) => {
        if (error.code == AUTH.MS_ADA_ERROR_USER_INPUT) {
          return this.loginWithUI();
        } else {
          console.error(error);
          this.logFirebaseLoginUnsuccessful(error['code']);
        }
      }
    )
  }


  private loginWithUI(): Promise<string> {
    this.logFirebaseLoginAttempt(false);
    return this.authContext.acquireTokenAsync(AppConfig.MSAL_RESOURCE_URL, AppConfig.MSAL_CLIENT_ID, AppConfig.MSAL_REDIRECT_URL, '', '').then(
      (authResponse: AuthenticationResult) => {
        let authHeader = authResponse.createAuthorizationHeader();
        this.testerDetails = this.setTesterDetails(authResponse);
        this.networkStateProvider.initialiseNetworkState();
        this.logFirebaseLoginSuccessful();
        return authHeader;
      }
    ).catch(
      (error) => {
        console.log(error);
        this.logFirebaseLoginUnsuccessful(error['code']);
        return error['code'];
      }
    )
  }

  private logFirebaseLoginAttempt(silentLoginAttempt: boolean) {
    if (silentLoginAttempt) this.firebaseLogsService.logEvent(FIREBASE_AUTH.LOGIN_ATTEMPT,
      FIREBASE_AUTH.CLIENT_ID, AppConfig.MSAL_CLIENT_ID,
      FIREBASE_AUTH.RESOURCE_URL, AppConfig.MSAL_RESOURCE_URL);
    else this.firebaseLogsService.logEvent(FIREBASE_AUTH.LOGIN_ATTEMPT,
      FIREBASE_AUTH.CLIENT_ID, AppConfig.MSAL_CLIENT_ID,
      FIREBASE_AUTH.REDIRECT_URL, AppConfig.MSAL_REDIRECT_URL,
      FIREBASE_AUTH.RESOURCE_URL, AppConfig.MSAL_RESOURCE_URL);

  }

  private logFirebaseLoginSuccessful() {
    this.firebaseLogsService.logEvent(FIREBASE_AUTH.LOGIN_SUCCESSFUL,
      FIREBASE_AUTH.CLIENT_ID, AppConfig.MSAL_CLIENT_ID,
      FIREBASE_AUTH.TENANT_ID, this.tenantId,
      FIREBASE_AUTH.OID, this.testerDetails.testerId,
      FIREBASE_AUTH.USER_ROLES, this.userRoles.toString());
  }

  private logFirebaseLoginUnsuccessful(errorMessage: string) {
    this.firebaseLogsService.logEvent(FIREBASE_AUTH.LOGIN_UNSUCCESSFUL,
      FIREBASE_AUTH.ERROR_MESSAGE, errorMessage,
      FIREBASE_AUTH.CLIENT_ID, AppConfig.MSAL_CLIENT_ID);
  }

  setJWTToken(token): Promise<any> {
    this.jwtToken = token;
    localStorage.setItem(LOCAL_STORAGE.JWT_TOKEN, this.jwtToken);
    return Promise.resolve();
  }

  getJWTToken() {
    return this.jwtToken
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
      details.testerId = decodedToken['oid'];
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
