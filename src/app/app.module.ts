import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from './app.component';
import { HTTPService } from '../providers/global/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from '../providers/natives/storage.service';
import { AuthService } from '../providers/global/auth.service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { SyncService } from '../providers/global/sync.service';
import { PreparerService } from '../providers/preparer/preparer.service';
import { VisitService } from '../providers/visit/visit.service';
import { StateReformingService } from '../providers/global/state-reforming.service';
import { CommonFunctionsService } from '../providers/utils/common-functions';
import { Keyboard } from '@ionic-native/keyboard';
import { MSAdal } from '@ionic-native/ms-adal';
import { AuthInterceptor } from '../providers/interceptors/auth.interceptor';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SignaturePopoverComponent } from '../components/signature-popover/signature-popover';
import { SignatureService } from '../providers/signature/signature.service';
import { AppService } from '../providers/global/app.service';
import { ActivityService } from '../providers/activity/activity.service';
import { Firebase } from '@ionic-native/firebase';
import { LogsModule } from '../modules/logs/logs.module';
import { DataStoreProvider } from '../modules/logs/data-store.service';
import { Network } from '@ionic-native/network';
import { NetworkStateProvider } from '../modules/logs/network-state.service';
import { LogsProvider } from '../modules/logs/logs.service';
import { SecureStorage } from '@ionic-native/secure-storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FirebaseLogsService } from '../providers/firebase-logs/firebase-logs.service';
import { AppVersion } from '@ionic-native/app-version';
import { SentryIonicErrorHandler } from './sentry-ionic-errorhandler';

const IONIC_PROVIDERS = [
  StatusBar,
  SplashScreen,
  // { provide: ErrorHandler, useClass: IonicErrorHandler }
  { provide: ErrorHandler, useClass: SentryIonicErrorHandler }
];

const CUSTOM_PROVIDERS = [
  AppService,
  SyncService,
  HTTPService,
  StorageService,
  AuthService,
  PreparerService,
  VisitService,
  ActivityService,
  StateReformingService,
  CommonFunctionsService,
  SignatureService,
  FirebaseLogsService
];

const IONIC_NATIVE_PROVIDERS = [
  SocialSharing,
  InAppBrowser,
  Camera,
  CallNumber,
  OpenNativeSettings,
  WheelSelector,
  MobileAccessibility,
  AppVersion,
  Keyboard,
  MSAdal,
  ScreenOrientation,
  Firebase,
  DataStoreProvider,
  Network,
  NetworkStateProvider,
  LogsProvider,
  SecureStorage
];

@NgModule({
  declarations: [MyApp, SignaturePopoverComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { statusbarPadding: true, swipeBackEnabled: false }),
    IonicStorageModule.forRoot({
      driverOrder: ['sqlite', 'websql', 'indexeddb']
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SignaturePadModule,
    LogsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, SignaturePopoverComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ...IONIC_PROVIDERS,
    ...CUSTOM_PROVIDERS,
    ...IONIC_NATIVE_PROVIDERS
  ]
})
export class AppModule {}
