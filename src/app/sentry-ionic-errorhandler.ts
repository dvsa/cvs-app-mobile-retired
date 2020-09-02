import { IonicErrorHandler } from 'ionic-angular';
import * as Sentry from 'sentry-cordova';

export class SentryIonicErrorHandler extends IonicErrorHandler {
  handleError(error) {
    super.handleError(error);

    try {
      Sentry.withScope((scope) => {
        scope.setTag(
          'app-user',
          JSON.parse(localStorage.getItem('tester-details')).testerObfuscatedOid
        );
        Sentry.captureException(error.originalError || error);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
