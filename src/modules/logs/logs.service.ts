import { Injectable } from '@angular/core';
import { Log } from "./logs.model";
import { Observable } from "rxjs";
import { HTTPService } from "../../providers/global/http.service";

@Injectable()
export class LogsProvider {

  constructor(private httpService: HTTPService) {
  }

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
}
