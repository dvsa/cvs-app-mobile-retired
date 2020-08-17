import { Component, OnInit } from '@angular/core';
import { APP_STRINGS, LOCAL_STORAGE, SIGNATURE_STATUS } from '../../app/app.enums';
import { Events, Loading, LoadingController, ViewController } from 'ionic-angular';
import { SignatureService } from '../../providers/signature/signature.service';
import { AppService } from '../../providers/global/app.service';
import { AuthService } from '../../providers/global/auth.service';
import { Store } from '@ngrx/store';
import { Log, LogsModel } from '../../modules/logs/logs.model';
import * as logsActions from '../../modules/logs/logs.actions';

@Component({
  selector: 'signature-popover',
  templateUrl: 'signature-popover.html'
})
export class SignaturePopoverComponent implements OnInit {
  oid: string;

  title: string;
  msg: string;
  loading: Loading;

  constructor(
    public viewCtrl: ViewController,
    public events: Events,
    public appService: AppService,
    public loadingCtrl: LoadingController,
    public signatureService: SignatureService,
    private authService: AuthService,
    private store$: Store<LogsModel>
  ) {}

  ngOnInit(): void {
    this.title = APP_STRINGS.SIGN_CONF_TITLE;
    this.msg = APP_STRINGS.SIGN_CONF_MSG;
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
  }

  closePop() {
    this.viewCtrl.dismiss();
  }

  confirmPop() {
    this.oid = this.authService.getOid();
    this.loading.present().then(() => {
      this.viewCtrl.dismiss().then(() => {
        this.signatureService.saveSignature().subscribe(
          (response) => {
            const log: Log = {
              type: 'info',
              message: `${this.oid} - ${response.status} ${response.body.message} for API call to ${response.url}`,
              timestamp: Date.now()
            };
            this.store$.dispatch(new logsActions.SaveLog(log));
            this.signatureService.saveToStorage().then(() => {
              this.signatureService.presentSuccessToast();
              localStorage.setItem(LOCAL_STORAGE.SIGNATURE, 'true');
              this.appService.isSignatureRegistered = true;
              this.loading.dismissAll();
              this.events.publish(SIGNATURE_STATUS.SAVED_EVENT);
            });
          },
          (error) => {
            const log: Log = {
              type: 'error-signatureService.saveSignature-confirmPop in signature-popover.ts',
              message: `${this.oid} - ${error.status} ${error.message} for API call to ${error.url}`,
              timestamp: Date.now()
            };
            this.store$.dispatch(new logsActions.SaveLog(log));
            this.loading.dismissAll();
            this.events.publish(SIGNATURE_STATUS.ERROR);
          }
        );
      });
    });
  }
}
