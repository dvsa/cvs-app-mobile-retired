import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';

import { AuthenticationService } from '../authentication/authentication.service';
import { NetworkService } from './../../global/network.service';
import { AUTH, CONNECTION_STATUS } from './../../../app/app.enums';
import { default as AppConfig } from '../../../../config/application.hybrid';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authentication: AuthenticationService,
    private networkService: NetworkService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const netWorkStatus: CONNECTION_STATUS = this.networkService.getNetworkState();

    if (netWorkStatus === CONNECTION_STATUS.OFFLINE) {
      return Observable.throw(new HttpErrorResponse({ error: AUTH.INTERNET_REQUIRED }));
    }

    // don't mutate request for this EP
    if (req.url === AppConfig.app.URL_LATEST_VERSION) {
      return next.handle(req);
    }

    return from(this.authentication.checkUserAuthStatus()).pipe(
      filter((authStatus: boolean) => !!req.url && authStatus),
      map((_) => this.addTokenToRequest(req)),
      flatMap((updatedReq) => next.handle(updatedReq))
    );
  }

  addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const { token } = this.authentication.tokenInfo;

    const httpReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });

    return httpReq;
  }
}
