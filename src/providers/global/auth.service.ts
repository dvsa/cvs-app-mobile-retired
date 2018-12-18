import {Injectable} from '@angular/core';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { AppConfig } from "../../../config/app.config";

@Injectable()
export class AuthService {
  token: string;

  constructor() {
  }

  authenticate(): Promise<any> {
    return new Promise((resolve, reject) => {
      let poolData = {
        UserPoolId: AppConfig.AUTH_USER_POOL_ID,
        ClientId: AppConfig.AUTH_CLIENT_ID
      };
      let isp = new CognitoIdentityServiceProvider();
      isp.config.region = AppConfig.AUTH_REGION;
      let userPool = new AWSCognito.CognitoUserPool(poolData);
      //------------------Authentication-------------------------
      let userData = {
        Username: AppConfig.AUTH_USERNAME,
        Pool: userPool
      };
      let authenticationData = {
        Username: AppConfig.AUTH_USERNAME,
        Password: AppConfig.AUTH_PASSWORD
      };
      let authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
      let cognitoUser = new AWSCognito.CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.token = result.getIdToken().getJwtToken();
          resolve();
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  };
}
