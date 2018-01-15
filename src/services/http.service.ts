import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class HTTPService {
    
    constructor(private http: HTTP) { }

    addTest(body): Promise<void> {
        var testURL = "";
        var headers = {
        };

        this.http.setDataSerializer("json");
        
        return this.http.post(testURL, body, headers).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
}