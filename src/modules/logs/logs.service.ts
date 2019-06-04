import { Injectable } from '@angular/core';
import { Log } from "./logs.model";
import { Observable } from "rxjs";
import { HTTPService } from "../../providers/global/http.service";

@Injectable()
export class LogsProvider {

  constructor(private httpService: HTTPService) {
  }

  public sendLogs = (logs: Log[]): Observable<any> => {
    return this.httpService.sendLogs(logs);
  }
}
