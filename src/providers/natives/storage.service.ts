import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject, Observable } from 'rxjs';
import { LogsModel, Log } from '../../modules/logs/logs.model';
import { Store } from '@ngrx/store';
import { AuthService } from '../global/auth.service';
import { LOG_TYPES } from '../../app/app.enums';
import * as logsActions from '../../modules/logs/logs.actions';

@Injectable()
export class StorageService {
  private storageSub = new Subject<any>();

  constructor(
    private storage: Storage,
    private store$: Store<LogsModel>,
    private authService: AuthService
  ) {}

  create(key: string, dataArray: any | any[]): Promise<any> {
    return this.storage.set(key, dataArray);
  }

  read(key: string): Promise<any> {
    return this.storage.get(key).then((data: any) => {
      // TOOD: Remove logging after the white screen bug is resolved
      // CVSB: 17584
      const log: Log = {
        type: LOG_TYPES.INFO,
        message: `User ${this.authService.getOid()} read storage key ${key}`,
        timestamp: Date.now()
      };
      this.store$.dispatch(new logsActions.SaveLog(log));
      console.log('data')
      console.log(JSON.stringify(data), '\n')
      // @ts-ignore
      window._data = data
      // debugger;
      return data;
    });
  }

  update(key, value): Promise<any> {
    return this.storage.remove(key).then((data: any) => {
      
      return setTimeout(() => {
        return this.storage.set(key, value).then((data: any) => {
          console.log('****************************************************\n')
          console.log(`key ${key}: \n`)
          console.log(`value ${JSON.stringify(value)}: \n`)
          console.log('****************************************************')
          console.log('****************************************************\n')
          console.log('****************************************************\n')
          // TOOD: Remove logging after the white screen bug is resolved
          // CVSB: 17584
          const log: Log = {
            type: LOG_TYPES.INFO,
            message: `User ${this.authService.getOid()} write storage key ${key}`,
            timestamp: Date.now()
          };
          this.store$.dispatch(new logsActions.SaveLog(log));
  
          // return data;
          return [];
        });
      }, 6000)

      // return this.storage.set(key, value).then((data: any) => {
      //   // TOOD: Remove logging after the white screen bug is resolved
      //   // CVSB: 17584
      //   const log: Log = {
      //     type: LOG_TYPES.INFO,
      //     message: `User ${this.authService.getOid()} write storage key ${key}`,
      //     timestamp: Date.now()
      //   };
      //   this.store$.dispatch(new logsActions.SaveLog(log));

      //   return data;
      // });



    });
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next();
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next();
  }

  delete(key: string): Promise<any> {
    return this.storage.remove(key).then((data) => {
      return data;
    });
  }

  clearStorage(): Promise<any> {
    return this.storage.clear().then((data) => {
      return data;
    });
  }
}
