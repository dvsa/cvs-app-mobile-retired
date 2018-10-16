import {Injectable} from '@angular/core';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import * as AWSCognito from 'amazon-cognito-identity-js';
import {AUTH} from "../../../config/config.enums";

@Injectable()
export class AuthService {
  token: string;

  constructor() {
  }

  authenticate(): Promise<any> {
    return new Promise((resolve, reject) => {
      let poolData = {
        UserPoolId: AUTH.USER_POOL_ID,
        ClientId: AUTH.CLIENT_ID
      };
      let isp = new CognitoIdentityServiceProvider();
      isp.config.region = 'eu-west-1';
      let userPool = new AWSCognito.CognitoUserPool(poolData);
      //------------------Authentication-------------------------
      let userData = {
        Username: AUTH.USERNAME,
        Pool: userPool
      };
      let authenticationData = {
        Username: AUTH.USERNAME,
        Password: AUTH.PASSWORD
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
