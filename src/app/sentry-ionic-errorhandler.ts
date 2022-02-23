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
    const testerName = this.visitService.getCurrentTesterName();
    const atfName = this.visitService.getCurrentATF();
    const atfPNumber = this.visitService.getCurrentATFPNumber();
    const vin = this.visitService.getCurrentVIN();
    const testTypeId = this.visitService.getCurrentTestTypeID();

    try {
      Sentry.withScope((scope) => {
        scope.setTag('app-user', appUser);
        scope.setTag('tester-name', testerName);
        scope.setTag('test-station', atfName);
        scope.setTag('aft-p-number', atfPNumber);
        scope.setTag('vehicle-vin', vin);
        scope.setTag('test-type-id', testTypeId);
        Sentry.captureException(error.originalError || error);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
