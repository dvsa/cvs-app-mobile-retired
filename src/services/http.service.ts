import {Injectable, Inject} from '@angular/core';
import {RESTRICTED_CONFIG} from '../../restricted.config';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class HTTPService {

  constructor(private http: HttpClient, @Inject(RESTRICTED_CONFIG) private restrictedConfig, private authService: AuthService) {
  }

  addTest(body): Observable<any> {
    let testURL = this.restrictedConfig.apis.postTest.url;
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(this.restrictedConfig.auth.apisHeader, this.authService.token);
    return this.http.post(testURL, body, {headers: headers})
  }
}
