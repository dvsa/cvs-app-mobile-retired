import { Injectable } from '@angular/core';
import { AppConfig } from "../../../config/app.config";
import { AuthenticationContext, AuthenticationResult, MSAdal, TokenCacheItem } from "@ionic-native/ms-adal";
import * as jwt_decode from "jwt-decode";
import { TesterDetailsModel } from "../../models/tester-details.model";
import { STORAGE } from "../../app/app.enums";
import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";

@Injectable()
export class AuthService {
  testerDetails: TesterDetailsModel;
  jwtToken: string;

  constructor(private msAdal: MSAdal) {
    this.testerDetails = {} as TesterDetailsModel;
    this.jwtToken = '';
  }

  login(): Observable<string> {
    let authority = AppConfig.MSAL_AUTHORITY;
    this.jwtToken = localStorage.getItem(STORAGE.JWT_TOKEN);

    let authContext: AuthenticationContext = this.msAdal.createAuthenticationContext(authority);
    return Observable.from(authContext.tokenCache.readItems()).pipe(
      flatMap((items: TokenCacheItem[]) => {
          return authContext.acquireTokenSilentAsync(AppConfig.MSAL_RESOURCE_URL, AppConfig.MSAL_CLIENT_ID, '').then(
            (silentAuthResponse: AuthenticationResult) => {
              this.setTesterDetails(silentAuthResponse.accessToken);
              return silentAuthResponse.accessToken;
            },
            () => {
              return authContext.acquireTokenAsync(AppConfig.MSAL_RESOURCE_URL, AppConfig.MSAL_CLIENT_ID, AppConfig.MSAL_REDIRECT_URL, '', '').then(
                (authResponse: AuthenticationResult) => {
                  this.setTesterDetails(authResponse.accessToken);
                  return authResponse.accessToken;
                }
              ).catch(
                (error: any) => {
                  return error;
                }
              )
            }
          )
        }
      )
    )
  }

  setJWTToken(token) {
    this.jwtToken = token
    localStorage.setItem(STORAGE.JWT_TOKEN, this.jwtToken);
  }

  getJWTToken() {
    return this.jwtToken
  }

  private setTesterDetails(token) {
    let decodedToken = this.decodeJWT(token);

    this.testerDetails.testerId = decodedToken['oid'];
    this.testerDetails.testerName = decodedToken['name'];
    this.testerDetails.testerEmail = decodedToken['upn'];
  }

  private decodeJWT(token) {
    return jwt_decode(token);
  }

}
