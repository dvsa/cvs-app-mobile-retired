import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, Events, IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { VisitService } from "../../providers/visit/visit.service";
import { APP_STRINGS, SIGNATURE_STATUS } from "../../app/app.enums";
import { SignaturePopoverComponent } from "../../components/signature-popover/signature-popover";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { SignatureService } from "../../providers/signature/signature.service";

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
              public navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private visitService: VisitService,
              public popoverCtrl: PopoverController,
              public events: Events,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              private openNativeSettings: OpenNativeSettings,
              private signatureService: SignatureService) {
    this.navRef = this.navParams.get('navController');
    this.events.subscribe(SIGNATURE_STATUS.SAVED,
      () => {
        this.presentToast();
        this.signatureService.goToRootPage(this.navRef);
      });
    this.events.subscribe(SIGNATURE_STATUS.ERROR,
      () => {
        this.showConfirm();
      })
  }

  ngOnInit(): void {
    if (this.visitService.isCordova) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
    this.dividerText = APP_STRINGS.SIGNATURE_DIVIDER;
    this.underSignText = APP_STRINGS.SIGNATURE_TEXT;
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
  }

  drawComplete() {
    this.signatureService.signatureString = this.signaturePad.toDataURL('image/png');
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
    this.presentToast();
  }

  showConfirm() {
    const confirmSave = this.alertCtrl.create({
      title: APP_STRINGS.SIGN_UNABLE_LOAD_DATA,
      message: '',
      buttons: [
        {
          text: APP_STRINGS.SETTINGS_BTN,
          handler: () => {
            if (this.visitService.isCordova) this.openNativeSettings.open('settings');
          }
        },
        {
          text: APP_STRINGS.CALL_SUPP_BTN,
          handler: () => {
            console.log('technical support clicked');
          }
        },
        {
          text: APP_STRINGS.TRY_AGAIN_BTN,
          handler: () => {
            this.signatureService.saveSignature().subscribe(
              () => {
                this.presentToast();
                this.events.unsubscribe(SIGNATURE_STATUS.ERROR);
                this.signatureService.goToRootPage(this.navCtrl);
              },
              () => {
                this.showConfirm();
              });
          }
        }
      ]
    });
    confirmSave.present();
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(SignaturePopoverComponent, {}, {cssClass: 'signature-popover'});
    if (!this.signaturePad.isEmpty()) {
      popover.present();
    } else {
      const EMPTY_SIGNATURE = this.alertCtrl.create({
        title: APP_STRINGS.SIGN_NOT_ENTERED,
        subTitle: APP_STRINGS.SIGN_ENTER,
        buttons: [APP_STRINGS.OK]
      });
      EMPTY_SIGNATURE.present();
    }
  }

  presentToast() {
    this.events.unsubscribe(SIGNATURE_STATUS.SAVED);
    this.events.unsubscribe(SIGNATURE_STATUS.ERROR);
    const toast = this.toastCtrl.create({
      message: APP_STRINGS.SIGN_TOAST_MSG,
      duration: 4000,
      position: 'top',
      cssClass: 'sign-toast-css'
    });
    toast.present();
  }
}
