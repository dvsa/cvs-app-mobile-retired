import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { map, switchMap, withLatestFrom, toArray, tap, filter, delay } from "rxjs/operators";

import { Storage } from '@ionic/storage';

import { Log, LogsModel } from './logs.model';
import { HTTPService } from '../../providers/global/http.service';
import { SaveLog } from './logs.actions';
import { STORAGE } from '../../app/app.enums';
import { AuthenticationService } from '../../providers/auth/authentication/authentication.service';
// import { STORAGE } from '../../app/app.enums';

@Injectable()
export class LogsProvider {

  constructor(
    private httpService: HTTPService,
    private store$: Store<LogsModel>,
    private storage: Storage,
    // private authenticationService: AuthenticationService,
  ) { }

  public sendLogs = (logs: Log[]): Observable<any> => {
    return from(logs)
      .pipe(
        tap((s) => console.log('from logs pipe', s)),
        filter((log) => !log.unauthenticated),
        tap((g) => console.log('passed filter', g)),
        withLatestFrom(
          from(this.storage.get(STORAGE.APP_VERSION)),
          from('c'), // this.authenticationService.tokenInfo.employeeId,
        ),
        tap((a) => console.log('latest from', a)),
        map(([log, appVersion, employeeId]: [Log, string, string]) => ({ ...log, appVersion, employeeId })),
        toArray(),
        tap((e) => console.log('result', e)),
        // switchMap((authLogs: Log[]) => this.httpService.sendAuthenticatedLogs(authLogs)),
        switchMap((authLogs: Log[]) => of()),
      );
  };

  public sendUnauthLogs = (logs: Log[]): Observable<any> => {
    let unauthLogs: Log[] = [];
    for (let log of logs) {
      if (log.unauthenticated) unauthLogs.push(log);
    }
    return this.httpService.sendUnauthenticatedLogs(unauthLogs);
  };

  public dispatchLog(log: Log): void {
    this.store$.dispatch(new SaveLog(log));
  }
}
