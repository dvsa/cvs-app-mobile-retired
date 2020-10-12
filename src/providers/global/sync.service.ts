import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { catchError, map, retryWhen } from 'rxjs/operators';
import { genericRetryStrategy } from '../utils/rxjs.utils';
import { TestStationReferenceDataModel } from '../../models/reference-data-models/test-station.model';
import { APP_STRINGS, APP_UPDATE, STORAGE } from '../../app/app.enums';
import { StorageService } from '../natives/storage.service';
import { AlertController, Events, LoadingController } from 'ionic-angular';
import { _throw } from 'rxjs/observable/throw';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CallNumber } from '@ionic-native/call-number';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config/app.config';
import { AppService } from './app.service';
import { Firebase } from '@ionic-native/firebase';
import { AuthService } from './auth.service';
import { AppVersion } from '@ionic-native/app-version';
import { AppVersionModel } from '../../models/latest-version.model';
import { LogsProvider } from '../../modules/logs/logs.service';

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
    private appVersion: AppVersion,
    private logProvider: LogsProvider
  ) {}

  public async startSync(): Promise<any[]> {
    this.checkForUpdate();

    if (!this.appService.getRefDataSync()) {
      this.loading.present();

      ['Atfs', 'Defects', 'TestTypes', 'Preparers'].forEach((elem) =>
        this.loadOrder.push(this.getDataFromMicroservice(elem))
      );

      return await this.getAllData(this.loadOrder);
    }

    return Promise.resolve([null, true]);
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

      this.logProvider.dispatchLog({
        type: `error - checkForUpdate in sync.service.ts`,
        message: `User ${this.authService.getOid()} - Cannot perform check if app update is required - ${JSON.stringify(
          error
        )}`,
        timestamp: Date.now()
      });
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

  private async getAllData(loadOrder: Observable<any>[]): Promise<any[]> {
    return Observable.forkJoin(loadOrder)
      .toPromise()
      .then((result: any[]) => {
        this.appService.setRefDataSync(true);
        this.loading.dismissAll();
        return [null, result.length === 4]; // ensure we have the exact and successful 4 apis call
      })
      .catch(() => [this.handleError()]);
  }

  getDataFromMicroservice(microservice): Observable<TestStationReferenceDataModel[]> {
    this.oid = this.authService.getOid();
    return this.httpService['get' + microservice]().pipe(
      map((data: any) => {
        this.storageService.update(STORAGE[microservice.toUpperCase()], data.body);
        return data.body;
      }),
      retryWhen(genericRetryStrategy()),
      catchError((error) => {
        this.logProvider.dispatchLog({
          type: `error-${microservice}-getDataFromMicroservice in sync.service.ts`,
          message: `${this.oid} - ${error.status} ${error.message} for API call to ${error.url ||
            microservice + 'microservice'}`,
          timestamp: Date.now()
        });

        this.firebase.logEvent('test_error', {
          content_type: 'error',
          item_id: `Error at ${microservice} microservice`
        });

        return _throw(error);
      })
    );
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
            this.getAllData(this.loadOrder);
          }
        }
      ]
    });

    alert.present();
    return _throw('Something bad happened; please try again later.');
  }
}
