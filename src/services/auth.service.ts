import { Injectable, Inject } from '@angular/core';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import * as AWSCognito from 'amazon-cognito-identity-js';

import { RESTRICTED_CONFIG, RestrictedConfig } from '../../restricted.config';

@Injectable()
export class AuthService {

    token: string;

    constructor(@Inject(RESTRICTED_CONFIG) private restrictedConfig) { }

    authenticate(): Promise<any>  {
        return new Promise((resolve, reject) => {
            let poolData = {
                UserPoolId : this.restrictedConfig.auth.userPoolId,
                ClientId : this.restrictedConfig.auth.clientId
            };
            let isp = new CognitoIdentityServiceProvider();
            isp.config.region = 'eu-west-1';
            let userPool = new AWSCognito.CognitoUserPool(poolData);
            //------------------Authentication-------------------------
            let userData = {
                Username : this.restrictedConfig.auth.username,
                Pool : userPool
            };
            let authenticationData = {
                Username : this.restrictedConfig.auth.username,
                Password : this.restrictedConfig.auth.password
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
