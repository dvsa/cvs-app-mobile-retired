import { Observable } from "rxjs";
import { NavController } from "ionic-angular";
import { of } from "rxjs/observable/of";
import { _throw } from "rxjs/observable/throw";

export class SignatureServiceMock {
  signatureString: string;
  result = {
    noError: true,
    error: false
  };

  constructor() {
  }

  saveSignature(isError: boolean): Observable<any> {
    if (isError) return _throw(this.result.error);
    return of(this.result.noError);
  }

  goToRootPage(navCtrl: NavController): void {
    return
  }

  saveToStorage(isError: boolean): Promise<any> {
    if (isError) return Promise.reject();
    return Promise.resolve();
  }
}
