import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Log, LogsModel } from './logs.model';
import { HTTPService } from '../../providers/global/http.service';
import { SaveLog } from './logs.actions';

@Injectable()
export class LogsProvider {
  constructor(private httpService: HTTPService, private store$: Store<LogsModel>) {}

  public sendLogs = (logs: Log[]): Observable<any> => {
    let authLogs: Log[] = [];
    for (let log of logs) {
      if (!log.unauthenticated) authLogs.push(log);
    }
    return this.httpService.sendAuthenticatedLogs(authLogs);
  };

  public sendUnauthLogs = (logs: Log[]): Observable<any> => {
    let unauthLogs: Log[] = [];
    for (let log of logs) {
      if (log.unauthenticated) unauthLogs.push(log);
    }
    return this.httpService.sendUnauthenticatedLogs(unauthLogs);
  };

  public dispatchLog(log: Log): void {
    console.log('dispatchLog', log);
    this.store$.dispatch(new SaveLog(log));
  }
}
