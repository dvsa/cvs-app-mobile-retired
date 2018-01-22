import { Component, Inject } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RESTRICTED_CONFIG, RestrictedConfig } from '../../restricted.config';
import { AuthService } from '../services/auth.service';

import { ATFHomePage } from '../pages/atf/atfHome/atfHome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ATFHomePage;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, @Inject(RESTRICTED_CONFIG) private restrictedConfig, private authService: AuthService, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Load Google Maps Library
      let node = document.createElement('script');
      node.src = "https://maps.googleapis.com/maps/api/js?key=" + restrictedConfig.keys.googleMaps;
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
        })
        alert.present();
      });  
    });
  }
}

