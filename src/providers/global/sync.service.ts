import { Injectable } from "@angular/core";
import { HTTPService } from "./http.service";
import { catchError, map, retryWhen } from "rxjs/operators";
import { genericRetryStrategy } from "../utils/rxjs.utils";
import { TestStationReferenceDataModel } from "../../models/reference-data-models/test-station.model";
import { APP, APP_STRINGS, STORAGE } from "../../app/app.enums";
import { StorageService } from "../natives/storage.service";
import { AlertController, Events, LoadingController } from "ionic-angular";
import { _throw } from "rxjs/observable/throw";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { CallNumber } from "@ionic-native/call-number";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { AppConfig } from "../../../config/app.config";
import { AppService } from "./app.service";

@Injectable()
export class SyncService {
  initSyncDone: boolean;
  loading = this.loadingCtrl.create({
    content: 'Loading...'
  });
  loadOrder: Observable<any>[] = [];

  constructor(public events: Events,
              public loadingCtrl: LoadingController,
              public appService: AppService,
              private httpService: HTTPService,
              private storageService: StorageService,
              private alertCtrl: AlertController,
              private openNativeSettings: OpenNativeSettings,
              private callNumber: CallNumber) {
  }

  startSync(): void {
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


  getAllData(): any {
    return Observable.forkJoin(this.loadOrder).subscribe(
      (data) => {
        this.handleData(data);
      }
    )
  }

  getDataFromMicroservice(microservice): Observable<TestStationReferenceDataModel[]> {
    return this.httpService['get' + microservice]()
      .pipe(
        map((data) => {
          this.storageService.update(STORAGE[microservice.toUpperCase()], data);
          return data;
        }),
        retryWhen(genericRetryStrategy()),
        catchError(() => of(undefined))
      )
  }

  handleData(array: any[]): void {
    array.forEach(
      (elem, index) => {
        if (elem) {
          this.loadOrder[index] = null;
        }
      }
    );
    this.loadOrder = this.loadOrder.filter(
      (elem) => {
        if (elem) return elem;
      }
    );
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
                data => console.log(data),
                err => console.log(err)
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
      }
    );
    alert.present();
    return _throw(
      'Something bad happened; please try again later.'
    );
  }
}

