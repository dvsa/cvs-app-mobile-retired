import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authentication: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authentication.checkUserAuthStatus()).pipe(
      filter((authStatus: boolean) => !!req.url && authStatus),
      map((_) => this.addTokenToRequest(req)),
      flatMap((updatedReq) => next.handle(updatedReq))
      // takeUntil(of())
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
