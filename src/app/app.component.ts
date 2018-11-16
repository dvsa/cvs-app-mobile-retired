import { Component, Renderer2 } from '@angular/core';
import { Platform, AlertController, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { KEYS } from "../../config/config.enums";
import { AuthService } from "../providers/global/auth.service";
import { SyncService } from "../providers/global/sync.service";
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'ATFHomePage';
  loading = this.loadingCtrl.create({
    content: 'Loading...'
  })

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alertCtrl: AlertController, private syncService: SyncService, private authService: AuthService, public events: Events, public loadingCtrl: LoadingController, private mobileAccessibility: MobileAccessibility, private renderer: Renderer2) {
    platform.ready().then(() => {
      // statusBar.styleDefault();
      statusBar.overlaysWebView(true);
      statusBar.styleLightContent();
      splashScreen.hide();

      // Mobile accessibility
      if (platform.is('cordova')) {
        this.accessibilityFeatures();
      }

      // Resuming app from background Mobile Accessibility
      platform.resume.subscribe(() => {
        this.accessibilityFeatures();
      });

      // Load Google Maps Library
      let node = document.createElement('script');
      node.src = "https://maps.googleapis.com/maps/api/js?key=" + KEYS.GOOGLE_MAPS_KEY;
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);

      // Auth
      this.authService.authenticate().catch((error) => {
        let alert = this.alertCtrl.create({
          title: 'Authentication failed',
          subTitle: 'Please close the session and reopen the application.',
          buttons: ['OK']
        });
        alert.present();
      });

      if (!localStorage.getItem('initialSync')) {
        this.loading.present();
        this.events.subscribe('atfCallSync', () => {
          localStorage.setItem('initialSync', 'true');
          this.loading.dismiss();
        });
      }
      this.syncService.getAtfs();
    });
  }

  accessibilityFeatures() {
    this.mobileAccessibility.updateTextZoom();
    this.mobileAccessibility.isInvertColorsEnabled().then((result) => {
        result ? this.renderer.setStyle(document.body, 'filter', 'invert(100%)') : this.renderer.removeStyle(document.body, 'filter');
      });
    this.mobileAccessibility.isBoldTextEnabled().then(
      (result) => {
        result ? this.renderer.addClass(document.body, 'accessibility-bold-text') : this.renderer.removeClass(document.body, 'accessibility-bold-text');
      });
  }
}

