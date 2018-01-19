import { Injectable, Inject } from '@angular/core';
import { HTTP } from '@ionic-native/http';

import { RESTRICTED_CONFIG, RestrictedConfig } from '../../restricted.config';

@Injectable()
export class HTTPService {
    
    constructor(private http: HTTP, @Inject(RESTRICTED_CONFIG) private restrictedConfig) { }

    addTest(body): Promise<void> {
        var testURL = this.restrictedConfig.apis.postTest.url;
        var headers = {};
        this.restrictedConfig.apis.postTest.headers.forEach(header => {
            headers[header.key] = header.value;
        });

        this.http.setDataSerializer("json");
        
        return this.http.post(testURL, body, headers).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
}