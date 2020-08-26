import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../global/auth.service';
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { AUTH, STATUS_CODE } from '../../app/app.enums';
import { Log, LogsModel } from '../../modules/logs/logs.model';
import * as logsActions from '../../modules/logs/logs.actions';
import { Store } from '@ngrx/store';
import { AppConfig } from '../../../config/app.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService, private store$: Store<LogsModel>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!window.navigator.onLine) {
      // TOOD: Remove after the white screen bug is resolved
      // CVSB: 17584
      const log: Log = {
        type: 'error',
        message: `${this.authService.getOid()} - Cannot perform call to ${
          req.url
        }. Currently offline`,
        timestamp: Date.now()
      };
      this.store$.dispatch(new logsActions.SaveLog(log));

      return Observable.throw(new HttpErrorResponse({ error: AUTH.INTERNET_REQUIRED }));
    }

    const oid = this.authService.getOid();
    const log: Log = {
      type: 'info',
      message: `${oid} - API call to ${req.url}`,
      timestamp: Date.now()
    };
    this.store$.dispatch(new logsActions.SaveLog(log));
    return next.handle(this.addAuthHeader(req, this.authService.getJWTToken())).pipe(
      tap((response) => {
        // TOOD: Remove logging after the white screen bug is resolved
        // CVSB: 17584
        if (response instanceof HttpResponse) {
          const log: Log = {
            type: 'info',
            message: `${oid} - ${response.status} Response for API call to ${response.url}`,
            timestamp: Date.now()
          };
          this.store$.dispatch(new logsActions.SaveLog(log));
        }
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          // TOOD: Remove logging after the white screen bug is resolved
          // CVSB: 17584
          const log: Log = {
            type: 'error-next.handle-intercept in auth.interceptor.ts',
            message: `${oid} - ${error.status} ${error.message} for API call to ${error.url}`,
            timestamp: Date.now()
          };
          this.store$.dispatch(new logsActions.SaveLog(log));

          switch ((<HttpErrorResponse>error).status) {
            case (STATUS_CODE.UNAUTHORIZED, STATUS_CODE.FORBIDDEN):
              return this.handleResponseError(req, next);
            default:
              return _throw(error);
          }
        }
      })
    );
  }

  handleResponseError(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshingToken) {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addAuthHeader(req, token));
        })
      );
    } else {
      this.isRefreshingToken = true;
      this.refreshTokenSubject.next(null);

      return this.authService.login().pipe(
        switchMap((newToken: string) => {
          if (newToken) {
            this.authService.setJWTToken(newToken);
            this.refreshTokenSubject.next(newToken);
            return next.handle(this.addAuthHeader(req, newToken));
          }
          return this.logoutUser();
        }),
        catchError((error) => {
          const log: Log = {
            type: 'error-handleResponseError in auth.interceptor.ts',
            message: `${this.authService.getOid()} - ${JSON.stringify(error)}`,
            timestamp: Date.now()
          };
          this.store$.dispatch(new logsActions.SaveLog(log));

          return this.logoutUser(error);
        }),
        finalize(() => (this.isRefreshingToken = false))
      );
    }
  }

  addAuthHeader(request: HttpRequest<any>, token: string) {
    const AUTH_TOKEN = token;
    if (AUTH_TOKEN && request.url !== AppConfig.URL_LATEST_VERSION) {
      return request.clone({
        setHeaders: {
          Authorization: `${AUTH_TOKEN}`
        }
      });
    }
    return request;
  }

  logoutUser(error?): Observable<any> {
    return _throw(error || AUTH.INVALID_TOKEN);
  }
}
