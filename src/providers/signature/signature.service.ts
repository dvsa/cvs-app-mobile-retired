import { Injectable } from "@angular/core";
import { HTTPService } from "../global/http.service";
import { Observable } from "rxjs";
import { Events, NavController, ToastController } from "ionic-angular";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AuthService } from "../global/auth.service";
import { AppService } from "../global/app.service";
import { StorageService } from "../natives/storage.service";
import { PAGE_NAMES, APP_STRINGS, SIGNATURE_STATUS, STORAGE } from "../../app/app.enums";

@Injectable()
export class SignatureService {
  signatureString: string;

  constructor(private httpService: HTTPService,
              private appService: AppService,
              private events: Events,
              private toastCtrl: ToastController,
              private screenOrientation: ScreenOrientation,
              private storageService: StorageService,
              private authService: AuthService) {
  }

  saveSignature(): Observable<any> {
    return this.httpService.saveSignature(this.authService.testerDetails.testerId, this.signatureString.slice(22, this.signatureString.length - 1));
  }

  saveToStorage(): Promise<any> {
    return this.storageService.create(STORAGE.SIGNATURE, this.signatureString);
  }

  presentSuccessToast(): void {
    this.events.unsubscribe(SIGNATURE_STATUS.SAVED);
    this.events.unsubscribe(SIGNATURE_STATUS.ERROR);
    const TOAST = this.toastCtrl.create({
      message: APP_STRINGS.SIGN_TOAST_MSG,
      duration: 4000,
      position: 'top',
      cssClass: 'sign-toast-css'
    });
    TOAST.present();
  }

}
