import { Injectable } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import * as Sentry from 'sentry-cordova';

import { VaultService } from '../providers/auth';

@Injectable()
export class SentryIonicErrorHandler extends IonicErrorHandler {
  constructor(private vaultService: VaultService) {
    super();
  }

  async handleError(error: any) {
    super.handleError(error);

    const appUser = await this.vaultService.getTesterObsfuscatedId();

    try {
      Sentry.withScope((scope) => {
        scope.setTag('app-user', appUser);
        Sentry.captureException(error.originalError || error);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
