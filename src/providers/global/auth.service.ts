import { Injectable } from '@angular/core';
import { AppConfig } from "../../../config/app.config";
import { AuthenticationContext, AuthenticationResult, MSAdal } from "@ionic-native/ms-adal";
import * as jwt_decode from "jwt-decode";
import { TesterDetailsModel } from "../../models/tester-details.model";
import { AUTH, LOCAL_STORAGE } from "../../app/app.enums";
import { Observable } from "rxjs";
import { CommonRegExp } from "../utils/common-regExp";
import { Platform } from "ionic-angular";
import { CommonFunctionsService } from "../utils/common-functions";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class AuthService {
  testerDetails: TesterDetailsModel;
  jwtToken: string;
  authContext: AuthenticationContext;

  constructor(private msAdal: MSAdal,
              public platform: Platform,
              private commonFunc: CommonFunctionsService) {
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
        let authHeader = silentAuthResponse.createAuthorizationHeader();
        this.testerDetails = this.setTesterDetails(silentAuthResponse);
        return authHeader;
      },
    ).catch(
      (error) => {
        if (error.code == AUTH.MS_ADA_ERROR_USER_INPUT) {
          return this.loginWithUI();
        } else {
          console.error(error);
        }
      }
    )
  }

  private loginWithUI(): Promise<string> {
    return this.authContext.acquireTokenAsync(AppConfig.MSAL_RESOURCE_URL, AppConfig.MSAL_CLIENT_ID, AppConfig.MSAL_REDIRECT_URL, '', '').then(
      (authResponse: AuthenticationResult) => {
        let authHeader = authResponse.createAuthorizationHeader();
        this.testerDetails = this.setTesterDetails(authResponse);
        return authHeader;
      }
    ).catch(
      (error: string) => {
        console.log(error);
        return error['code'];
      }
    )
  }

  setJWTToken(token): Promise<any> {
    this.jwtToken = token;
    localStorage.setItem(LOCAL_STORAGE.JWT_TOKEN, this.jwtToken);
    return Promise.resolve();
  }

  getJWTToken() {
    return this.jwtToken
  }

  isValidToken(token): boolean {
    let tokenStr = token ? token.slice(7, token.length - 1) : null;
    return (tokenStr && tokenStr.match(CommonRegExp.JTW_TOKEN));
  }

  setTesterDetails(authResponse: AuthenticationResult,
                   testerId = this.commonFunc.randomString(9),
                   testerName = this.commonFunc.randomString(9),
                   testerEmail = `${testerName}.${testerId}@email.com`): TesterDetailsModel {

    let details: TesterDetailsModel = {
      testerName,
      testerId,
      testerEmail
    };

    if (authResponse) {
      let decodedToken = this.decodeJWT(authResponse.accessToken);
      details.testerId = decodedToken[AppConfig.STAFF_ID_KEY][0];
      details.testerName = decodedToken['name'];
      details.testerEmail = decodedToken['upn'];
    }
    localStorage.setItem('tester-details', JSON.stringify(details));
    return details
  }

  decodeJWT(token) {
    return jwt_decode(token);
  }
}
