import { Component, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RESTRICTED_CONFIG, RestrictedConfig } from '../../restricted.config';

import { ATFHomePage } from '../pages/atf/atfHome/atfHome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ATFHomePage;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, @Inject(RESTRICTED_CONFIG) private restrictedConfig) {
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
    });
  }
}

