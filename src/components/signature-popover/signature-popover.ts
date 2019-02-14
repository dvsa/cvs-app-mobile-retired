import { Component, OnInit } from '@angular/core';
import { APP_STRINGS, SIGNATURE_STATUS } from "../../app/app.enums";
import { Events, LoadingController, ViewController } from "ionic-angular";
import { SignatureService } from "../../providers/signature/signature.service";

@Component({
  selector: 'signature-popover',
  templateUrl: 'signature-popover.html'
})
export class SignaturePopoverComponent implements OnInit {

  title: string;
  msg: string;
  loading = this.loadingCtrl.create({
    content: 'Loading...'
  });

  constructor(public viewCtrl: ViewController,
              public events: Events,
              public loadingCtrl: LoadingController,
              public signatureService: SignatureService) {
  }

  ngOnInit(): void {
    this.title = APP_STRINGS.SIGN_CONF_TITLE;
    this.msg = APP_STRINGS.SIGN_CONF_MSG;
  }

  closePop() {
    this.viewCtrl.dismiss();
  }

  confirmPop() {
    this.loading.present();
    this.viewCtrl.dismiss().then(
      () => {
        this.signatureService.saveSignature().subscribe(
          () => {
            this.signatureService.saveToStorage().then(() => {
              this.loading.dismissAll();
              this.events.publish(SIGNATURE_STATUS.SAVED);
            });
          },
          () => {
            this.loading.dismissAll();
            this.events.publish(SIGNATURE_STATUS.ERROR);
          });
      });
  }
}
