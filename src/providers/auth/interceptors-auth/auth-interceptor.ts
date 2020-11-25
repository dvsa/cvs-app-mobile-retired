import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
// rename back to AuthInterceptor once all cleanup is done
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authentication: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authentication.checkUserAuthStatus())
      .pipe(
        filter((authStatus: boolean) => !!req.url && authStatus),
        map((_) => this.addTokenToRequest(req))
      )
      .pipe(
        flatMap((updatedReq) => next.handle(updatedReq))
        // takeUntil(of())
      );
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return from(this.authentication.isUserAuthenticated())
  //     .pipe(
  //       filter((_) => !!req.url),
  //       tap(this.respondToTokenStatus),
  //       filter((status: TokenStatus) => status.active),
  //       map((_) => this.addTokenToRequest(req))
  //     )
  //     .pipe(
  //       flatMap((updatedReq) => next.handle(updatedReq))
  //       // takeUntil(of())
  //     );
  // }

  // private respondToTokenStatus(status: TokenStatus) {
  //   const { active, action } = status;
  //   if (!active) {
  //     // call to block app
  //   }
  // }

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
