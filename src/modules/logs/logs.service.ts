import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { map, switchMap, withLatestFrom, toArray, tap, filter } from "rxjs/operators";

// import { Storage } from '@ionic/storage';

import { Log, LogsModel } from './logs.model';
import { HTTPService } from '../../providers/global/http.service';
import { SaveLog } from './logs.actions';
// import { STORAGE } from '../../app/app.enums';

@Injectable()
export class LogsProvider {

  constructor(
    private httpService: HTTPService,
    private store$: Store<LogsModel>,
    // private storage: Storage,
    // private appVersionService: AppVersionService,
    // private authenticationService: AuthenticationService,
  ) { }

  public sendLogs = (logs: Log[]): Observable<any> => {
    console.log('send logs called');
    // return from(logs)
    //   .pipe(
    //     tap(console.log),
    //     filter((log) => !log.unauthenticated),
    //     withLatestFrom(
    //       // this.storage.get(STORAGE.APP_VERSION),
    //       of('1234'), // employeeid
    //     ),
    //     tap(console.log),
    //     map(([log, appVersion, employeeId]: [Log, string, string]) => ({ ...log, appVersion, employeeId })),
    //     toArray(),
    //     switchMap((authLogs: Log[]) => this.httpService.sendAuthenticatedLogs(authLogs)),
    //   );
    return of();
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
