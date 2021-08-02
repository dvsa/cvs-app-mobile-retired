import { Injectable } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import * as Sentry from 'sentry-cordova';

import { VaultService } from '../providers/auth';
import { VisitService } from '../providers/visit/visit.service';

@Injectable()
export class SentryIonicErrorHandler extends IonicErrorHandler {
  constructor(private vaultService: VaultService, private visitService: VisitService) {
    super();
  }

  async handleError(error: any) {
    super.handleError(error);

    const appUser = await this.vaultService.getTesterObsfuscatedId();
    const atf = this.visitService.getCurrentATF();
    const vin = this.visitService.getCurrentVIN();

    try {
      Sentry.withScope((scope) => {
        scope.setTag('app-user', appUser);
        scope.setTag('test-station', atf);
        scope.setTag('vehicle-vin', vin);
        Sentry.captureException(error.originalError || error);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
