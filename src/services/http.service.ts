import { Injectable, Inject } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http';

import { RESTRICTED_CONFIG, RestrictedConfig } from '../../restricted.config';
import { AuthService } from './auth.service';

@Injectable()
export class HTTPService {
    
    constructor(private http: HTTP, @Inject(RESTRICTED_CONFIG) private restrictedConfig, private authService: AuthService) { }

    addTest(body): Promise<HTTPResponse> {
        return new Promise((resolve, reject) => {
            var testURL = this.restrictedConfig.apis.postTest.url;
            var headers = {};
            headers[this.restrictedConfig.auth.apisHeader] = this.authService.token;

            this.http.setDataSerializer("json");
            
            this.http.post(testURL, body, headers).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }
}