import {Injectable} from "@angular/core";
import {HTTPService} from "./http.service";
import {retryWhen} from "rxjs/operators";
import {genericRetryStrategy} from "../utils/rxjs.utils";
import {AtfModel} from "../../models/atf.model";
import {STORAGE} from "../../app/app.enums";
import {StorageService} from "../natives/storage.service";
import {AlertController, Events} from "ionic-angular";
import {KEYS} from "../../../config/config.enums";
import {_throw} from "rxjs/observable/throw";
import {OpenNativeSettings} from "@ionic-native/open-native-settings";
import {CallNumber} from "@ionic-native/call-number";

@Injectable()
export class SyncService {

  constructor(private httpService: HTTPService, private storageService: StorageService, public events: Events, private alertCtrl: AlertController, private openNativeSettings: OpenNativeSettings, private callNumber: CallNumber) {
  }

  getAtfs(): void {
    this.httpService.getAtfs()
      .pipe(
        retryWhen(genericRetryStrategy()),
      )
      .subscribe(
        (data: AtfModel[]) => {
          this.events.publish('atfCallSync', true);
          this.storageService.update(STORAGE.ATFS, data)
        },
        () => {
          if (!localStorage.getItem('initialSync')) {
            this.handleError()
          }
        }
      )
  }

  private handleError() {
    let alert = this.alertCtrl.create({
        title: 'Unable to load data',
        enableBackdropDismiss: false,
        message: 'Make sure you are connected to the internet and try again',
        buttons: [
          {
            text: 'Settings',
            handler: () => {
              this.openNativeSettings.open('settings');
              this.handleError();
            }
          },
          {
            text: 'Call Technical Support',
            handler: () => {
              this.callNumber.callNumber(KEYS.PHONE_NUMBER, true)
              return false
            }
          },
          {
            text: 'Try again',
            handler: () => {
              this.getAtfs();
            }
          }
        ]
      }
    );
    alert.present();
    return _throw(
      'Something bad happened; please try again later.'
    );
  };
}
