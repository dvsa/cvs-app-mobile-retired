import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';
import { map, switchMap, toArray, filter, combineLatest } from "rxjs/operators";
import { of } from 'rxjs/observable/of';

import { Storage } from '@ionic/storage';

import { Log, LogsModel } from './logs.model';
import { HTTPService } from '../../providers/global/http.service';
import { SaveLog } from './logs.actions';
import { STORAGE } from '../../app/app.enums';

@Injectable()
export class LogsProvider {

  constructor(
    private httpService: HTTPService,
    private store$: Store<LogsModel>,
    private storage: Storage,
  ) { }

  public sendLogs = (logs: Log[]): Observable<any> => {
    if (logs && logs.length === 0) {
      return of();
    }

    return from(logs)
      .pipe(
        filter((log: Log) => !log.unauthenticated),
        combineLatest(
          from(this.storage.get(STORAGE.LATEST_VERSION)),
          from(this.storage.get(STORAGE.APP_VERSION)),
          from(this.storage.get(STORAGE.EMPLOYEE_ID)),
        ),
        map(([log, latestVersion, appVersion, employeeId]: [Log, string, string, string]) => ({
          ...log,
          latestVersion,
          appVersion,
          employeeId,
        })),
        toArray(),
        switchMap((authLogs: Log[]) => this.httpService.sendAuthenticatedLogs(authLogs)),
      );
  };

  public sendUnauthLogs = (logs: Log[]): Observable<any> => {
    if (logs && logs.length === 0) {
      return of();
    }
    
    return from(logs)
      .pipe(
        filter((log: Log) => log.unauthenticated),
        combineLatest(
          from(this.storage.get(STORAGE.LATEST_VERSION)),
          from(this.storage.get(STORAGE.APP_VERSION)),
          from(this.storage.get(STORAGE.EMPLOYEE_ID)),
        ),
        map(([log, latestVersion, appVersion, employeeId]: [Log, string, string, string]) => ({
          ...log,
          latestVersion,
          appVersion,
          employeeId,
        })),
        toArray(),
        switchMap((unAuthLogs: Log[]) => this.httpService.sendUnauthenticatedLogs(unAuthLogs)),
      );
  };

  public dispatchLog(log: Log): void {
    this.store$.dispatch(new SaveLog(log));
  }
}
