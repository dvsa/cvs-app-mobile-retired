import { Injectable } from '@angular/core';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { VaultService } from '../vault/vault.service';
import { cordovaAzureConfig, webAzureConfig } from './auth-options';

@Injectable()
export class AuthenticationService extends IonicAuth {
  private vaultService: VaultService;

  private _changed: Subject<boolean>;
  get changed(): Observable<boolean> {
    return this._changed.asObservable();
  }

  constructor(platform: Platform, vaultService: VaultService) {
    const isCordovaApp = platform.is('cordova');
    const config = isCordovaApp ? cordovaAzureConfig : webAzureConfig;
    config.tokenStorageProvider = vaultService;

    super(config);

    this.vaultService = vaultService;
    this._changed = new Subject();
    vaultService.lockChanged.subscribe((locked) => this._changed.next(!locked));
  }

  async login(): Promise<void> {
    try {
      await this.vaultService.logout();
      await this.vaultService.setDesiredAuthMode();
      await super.login();

      this._changed.next(true);
    } catch (err) {
      const message: string = err.message;

      if (message !== undefined && message.startsWith('AADB2C90118')) {
        await super.login(/*optional reset link policy from Azure could be passed here*/);
      } else {
        throw new Error(err);
      }
    }
  }

  async getTokenDetails(): Promise<any> {
    const token = await this.getIdToken();

    if (!token) {
      return;
    }

    const decodedToken: any = jwt_decode(token);

    return {
      id: decodedToken.sub,
      token: token,
      email: decodedToken.roles[0],
      employeedId: decodedToken.employeeid
    };
    //create a model and make this into a type
  }
}
