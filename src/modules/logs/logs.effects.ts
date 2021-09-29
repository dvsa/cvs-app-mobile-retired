import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import * as logsActions from './logs.actions';
import { getLogsState } from './logs.reducer';
import { LogsProvider } from './logs.service';
import { Log, LogsModel } from './logs.model';
import { DataStoreProvider } from './data-store.service';
import { NetworkService } from '../../providers/global';
import { CONNECTION_STATUS } from '../../app/app.enums';

type LogCache = {
  dateStored: string;
  data: Log[];
};

@Injectable()
export class LogsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<LogsModel>,
    private logsProvider: LogsProvider,
    private dataStore: DataStoreProvider,
    private networkService: NetworkService
  ) {}

  @Effect()
  startSendingLogsEffect$ = this.actions$.pipe(
    ofType(logsActions.START_SENDING_LOGS),
    switchMap(() => {
      return interval(10 * 1000).pipe(map(() => new logsActions.SendLogs()));
    })
  );

  @Effect()
  persistLogEffect$ = this.actions$.pipe(
    ofType(logsActions.PERSIST_LOG),
    withLatestFrom(this.store$.pipe(select(getLogsState))),
    switchMap(([action, logs]) => {
      this.saveLogs(logs);
      return of();
    })
  );

  @Effect()
  loadLogEffect$ = this.actions$.pipe(
    ofType(logsActions.LOAD_LOG),
    switchMap(() => {
      return this.getPersistedLogs().pipe(
        map((logs: Log[]) => new logsActions.LoadLogState(logs))
      );
    })
  );

  @Effect()
  saveLogEffect$ = this.actions$.pipe(
    ofType(logsActions.SAVE_LOG),
    switchMap(() => {
      return of(new logsActions.PersistLog());
    })
  );

  @Effect()
  sendLogsSuccessEffect$ = this.actions$.pipe(
    ofType(logsActions.SEND_LOGS_SUCCESS),
    switchMap(() => {
      return of(new logsActions.PersistLog());
    })
  );

  @Effect()
  sendLogsEffect$ = this.actions$.pipe(
    ofType(logsActions.SEND_LOGS),
    withLatestFrom(this.store$.pipe(select(getLogsState))),
    switchMap(([action, logs]) => {
      if (this.networkService.getNetworkState() === CONNECTION_STATUS.OFFLINE) {
        return of();
      }

      return Observable.forkJoin([
        this.logsProvider.sendLogs(logs),
        this.logsProvider.sendUnauthLogs(logs)
      ]).pipe(
        map((response: any) => {
          const timestamps = logs.map((log) => log.timestamp);
          return new logsActions.SendLogsSuccess(timestamps);
        }),
        catchError((err: any) => {
          return of(new logsActions.SendLogsFailure(err));
        })
      );
    })
  );

  // TODO: All this has to be moved to the LogsProvider or DataStore provider

  getPersistedLogs = (): Observable<Log[]> => {
    return from(this.getAndConvertPersistedLogs());
  };

  getAndConvertPersistedLogs = (): Promise<Log[]> =>
    this.dataStore
      .getItem('LOGS')
      .then((data) => {
        const logCache: LogCache = JSON.parse(data);
        const cachedDate = new Date(logCache.dateStored);
        if (this.isCacheTooOld(cachedDate, new Date())) {
          return this.emptyCachedData();
        }
        return logCache.data;
      })
      .catch(() => {
        const emptyLogData: Log[] = [];
        return emptyLogData;
      });

  saveLogs = (logData: Log[]) => {
    const logDataToStore: LogCache = {
      dateStored: new Date().toISOString(),
      data: logData
    };
    this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then((response) => {});
  };

  isCacheTooOld = (dateStored: Date, now: Date): boolean => {
    return (
      Math.floor(
        (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
          Date.UTC(dateStored.getFullYear(), dateStored.getMonth(), dateStored.getDate())) /
          (1000 * 60 * 60 * 24)
      ) > 7
    );
  };

  emptyCachedData = () => {
    const emptyLogData: Log[] = [];
    const logDataToStore: LogCache = {
      dateStored: new Date().toISOString(),
      data: emptyLogData
    };
    this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then(() => {});
    return emptyLogData;
  };
}
