import { Injectable } from "@angular/core";
import { HTTPService } from "../global/http.service";
import { Observable } from "rxjs";
import { NavController } from "ionic-angular";
import { VisitService } from "../visit/visit.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AuthService } from "../global/auth.service";
import { STORAGE } from "../../app/app.enums";
import { StorageService } from "../natives/storage.service";

@Injectable()
export class SignatureService {
  signatureString: string;

  constructor(private httpService: HTTPService,
              private visitService: VisitService,
              private screenOrientation: ScreenOrientation,
              private authService: AuthService,
              private storageService: StorageService) {
  }

  saveSignature(): Observable<any> {
    return this.httpService.saveSignature(this.authService.testerDetails.testerId, this.signatureString.slice(22, this.signatureString.length - 1));
  }

  goToRootPage(navCtrl: NavController): void {
    navCtrl.setRoot('TestStationHomePage').then(() => {
      navCtrl.pop().then(
        () => {
          if (this.visitService.isCordova) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
        }
      );
    });
  }

  saveToStorage(): Promise<any> {
    return this.storageService.create(STORAGE.SIGNATURE_IMAGE, this.signatureString);
  }
}
