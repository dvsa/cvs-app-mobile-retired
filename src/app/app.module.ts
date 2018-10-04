import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {SocialSharing} from '@ionic-native/social-sharing';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Camera} from '@ionic-native/camera';
import {CallNumber} from '@ionic-native/call-number';
import {RESTRICTED_CONFIG, RestrictedConfig} from '../../restricted.config';
import {MyApp} from './app.component';
import {CameraService} from '../services/camera.service';
import {AtfService} from '../services/atf.service';
import {VehicleService} from '../services/vehicle.service';
import {VehicleTestCategorySevice} from '../services/vehicle-test-category.service';
import {VehicleTestService} from '../services/vehicle-test.service';
import {DefectCategoryService} from '../services/defect.service';
import {HTTPService} from '../services/http.service';
import {PhoneService} from '../services/phone.service';
import {AuthService} from '../services/auth.service';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AtfService,
    VehicleService,
    VehicleTestCategorySevice,
    VehicleTestService,
    DefectCategoryService,
    HTTPService,
    AuthService,
    SocialSharing,
    InAppBrowser,
    Camera,
    CameraService,
    CallNumber,
    PhoneService,
    {provide: RESTRICTED_CONFIG, useValue: RestrictedConfig}
  ]
})
export class AppModule {
}
