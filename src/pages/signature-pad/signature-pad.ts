import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, Events, IonicPage, NavController, PopoverController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { APP_STRINGS, LOCAL_STORAGE, SIGNATURE_STATUS } from "../../app/app.enums";
import { SignaturePopoverComponent } from "../../components/signature-popover/signature-popover";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { SignatureService } from "../../providers/signature/signature.service";
import { AppService } from "../../providers/global/app.service";
import { CallNumber } from "@ionic-native/call-number";
import { AppConfig } from "../../../config/app.config";
import { Firebase } from '@ionic-native/firebase';

@IonicPage()
@Component({
  selector: 'page-signature-pad',
  templateUrl: 'signature-pad.html',
})
export class SignaturePadPage implements OnInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  underSignText: string;
  dividerText: string;
  navRef: NavController;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 701,
    'canvasHeight': 239
  };

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public events: Events,
              public alertCtrl: AlertController,
              public appService: AppService,
              private screenOrientation: ScreenOrientation,
              private openNativeSettings: OpenNativeSettings,
              private signatureService: SignatureService,
              private firebase: Firebase,
              private callNumber: CallNumber) {
    this.events.subscribe(SIGNATURE_STATUS.ERROR,
      () => {
        this.showConfirm();
      })
  }

  ngOnInit(): void {
    this.dividerText = APP_STRINGS.SIGNATURE_DIVIDER;
    this.underSignText = APP_STRINGS.SIGNATURE_TEXT;
  }

  ionViewWillEnter() {
    if (this.appService.isCordova) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
  }

  ionViewWillLeave() {
    if (this.appService.isCordova) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
  }

  drawComplete() {
    this.signatureService.signatureString = this.signaturePad.toDataURL('image/png');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  showConfirm() {
    const CONFIRM_ALERT = this.alertCtrl.create({
      title: APP_STRINGS.SIGN_UNABLE_LOAD_DATA,
      message: '',
      buttons: [
        {
          text: APP_STRINGS.SETTINGS_BTN,
          handler: () => {
            if (this.appService.isCordova) this.openNativeSettings.open('settings');
          }
        }, {
          text: APP_STRINGS.CALL_SUPP_BTN,
          handler: () => {
            this.callNumber.callNumber(AppConfig.KEY_PHONE_NUMBER, true);
          }
        }, {
          text: APP_STRINGS.TRY_AGAIN_BTN,
          handler: () => {
            this.signatureService.saveSignature().subscribe(
              () => {
                this.signatureService.presentSuccessToast();
                localStorage.setItem(LOCAL_STORAGE.SIGNATURE, 'true');
                this.appService.isSignatureRegistered = true;
                this.events.unsubscribe(SIGNATURE_STATUS.ERROR);
                this.events.publish(SIGNATURE_STATUS.SAVED_EVENT);
              },
              () => {
                this.firebase.logEvent('test_error', {content_type: 'error', item_id: "Saving signature failed"});
                this.showConfirm();
              }
            );
          }
        }
      ]
    });
    CONFIRM_ALERT.present();
  }

  presentPopover() {
    const POPOVER = this.popoverCtrl.create(SignaturePopoverComponent, {}, {cssClass: 'signature-popover'});
    if (!this.signaturePad.isEmpty()) {
      POPOVER.present();
    } else {
      const EMPTY_SIGNATURE = this.alertCtrl.create({
        title: APP_STRINGS.SIGN_NOT_ENTERED,
        subTitle: APP_STRINGS.SIGN_ENTER,
        buttons: [APP_STRINGS.OK]
      });
      EMPTY_SIGNATURE.present();
    }
  }
}
