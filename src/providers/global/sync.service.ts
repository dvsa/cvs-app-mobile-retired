import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { catchError, map, retryWhen } from 'rxjs/operators';
import { genericRetryStrategy } from '../utils/rxjs.utils';
import { TestStationReferenceDataModel } from '../../models/reference-data-models/test-station.model';
import { APP, APP_STRINGS, APP_UPDATE, STORAGE } from '../../app/app.enums';
import { StorageService } from '../natives/storage.service';
import { AlertController, Events, LoadingController } from 'ionic-angular';
import { _throw } from 'rxjs/observable/throw';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CallNumber } from '@ionic-native/call-number';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { AppConfig } from '../../../config/app.config';
import { AppService } from './app.service';
import { Firebase } from '@ionic-native/firebase';
import { Log, LogsModel } from '../../modules/logs/logs.model';
import * as logsActions from '../../modules/logs/logs.actions';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppVersion } from '@ionic-native/app-version';
import { AppVersionModel } from '../../models/latest-version.model';

declare let cordova: any;

@Injectable()
export class SyncService {
  initSyncDone: boolean;
  loading = this.loadingCtrl.create({
    content: 'Loading...'
  });
  loadOrder: Observable<any>[] = [];
  oid: string;

  constructor(
    public events: Events,
    public loadingCtrl: LoadingController,
    public appService: AppService,
    private httpService: HTTPService,
    private storageService: StorageService,
    private alertCtrl: AlertController,
    private openNativeSettings: OpenNativeSettings,
    private callNumber: CallNumber,
    private firebase: Firebase,
    public authService: AuthService,
    private store$: Store<LogsModel>,
    private appVersion: AppVersion
  ) {}
  startSync(): void {
    this.checkForUpdate();

    if (!this.appService.isInitSyncDone) {
      this.loading.present();
      this.events.subscribe('initSyncDone', () => {
        localStorage.setItem(APP.INIT_SYNC, 'true');
        this.loading.dismissAll();
      });
    }

    const microservicesListArray: Array<string> = ['Atfs', 'Defects', 'TestTypes', 'Preparers'];
    microservicesListArray.forEach((elem) => {
      this.loadOrder.push(this.getDataFromMicroservice(elem));
    });
    this.getAllData();
  }

  public async checkForUpdate() {
    let promises = [];
    promises.push(this.appVersion.getVersionNumber());
    promises.push(this.httpService.getApplicationVersion());
    promises.push(this.storageService.read(STORAGE.VISIT));

    try {
      let results = await Promise.all(promises);
      const currentAppVersion = results[0];
      const latestAppVersionModel: AppVersionModel = results[1].body['mobile-app'];
      const visit = results[2];
      if (
        latestAppVersionModel.version_checking === 'true' &&
        currentAppVersion !== latestAppVersionModel.version &&
        !visit
      ) {
        this.createUpdatePopup().present();
      }
    } catch (error) {
      console.log('Cannot perform check if app update is required');
    }
  }

  private createUpdatePopup() {
    return this.alertCtrl.create({
      title: APP_UPDATE.TITLE,
      message: APP_UPDATE.MESSAGE,
      buttons: [
        {
          text: APP_UPDATE.BUTTON,
          handler: () => {
            cordova.plugins.exit();
          }
        }
      ],
      enableBackdropDismiss: false
    });
  }

  getAllData(): any {
    return Observable.forkJoin(this.loadOrder).subscribe((data) => {
      this.handleData(data);
    });
  }

  getDataFromMicroservice(microservice): Observable<TestStationReferenceDataModel[]> {
    this.oid = this.authService.getOid();
    return this.httpService['get' + microservice]().pipe(
      map((data: any) => {
        const log: Log = {
          type: 'info',
          message: `${this.oid} - ${data.status} ${data.statusText} for API call to ${data.url}`,
          timestamp: Date.now()
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
        this.storageService.update(STORAGE[microservice.toUpperCase()], data.body);
        return data.body;
      }),
      retryWhen(genericRetryStrategy()),
      catchError((error) => {
        const log: Log = {
          type: 'error',
          message: `${this.oid} - ${error.status} ${error.message} for API call to ${error.url ||
            microservice + 'microservice'}`,
          timestamp: Date.now()
        };
        this.store$.dispatch(new logsActions.SaveLog(log));
        this.firebase.logEvent('test_error', {
          content_type: 'error',
          item_id: `Error at ${microservice} microservice`
        });
        return of(undefined);
      })
    );
  }

  handleData(array: any[]): void {
    array.forEach((elem, index) => {
      if (elem) {
        this.loadOrder[index] = null;
      }
    });
    this.loadOrder = this.loadOrder.filter((elem) => {
      if (elem) return elem;
    });
    if (this.loadOrder.length == 0) {
      this.events.publish(APP.INIT_SYNC, true);
    } else {
      if (!this.initSyncDone) {
        this.handleError();
      }
    }
  }

  handleError(): Observable<any> {
    let alert = this.alertCtrl.create({
      title: 'Unable to load data',
      enableBackdropDismiss: false,
      message: 'Make sure you are connected to the internet and try again',
      buttons: [
        {
          text: APP_STRINGS.SETTINGS_BTN,
          handler: () => {
            this.openNativeSettings.open('settings');
            this.handleError();
          }
        },
        {
          text: 'Call Technical Support',
          handler: () => {
            this.callNumber.callNumber(AppConfig.KEY_PHONE_NUMBER, true).then(
              (data) => console.log(data),
              (err) => console.log(err)
            );
            return false;
          }
        },
        {
          text: 'Try again',
          handler: () => {
            this.getAllData();
          }
        }
      ]
    });
    alert.present();
    return _throw('Something bad happened; please try again later.');
  }
}
