import { IonicAuthOptions } from '@ionic-enterprise/auth';
import { default as AppConfig } from '../../../../config/application.hybrid';

export const webAzureConfig: IonicAuthOptions = {
  authConfig: 'azure',
  platform: 'web',
  clientID: `${AppConfig.app.CLIENT_ID}`,
  discoveryUrl: `https://login.microsoftonline.com/${AppConfig.app.TENANT_ID}/v2.0/.well-known/openid-configuration?appid=${AppConfig.app.CLIENT_ID}`,
  redirectUri: 'http://localhost:8100/signature-pad',
  // redirectUri: 'http://localhost:8100/#/signature-pad',
  // redirectUri: 'http://localhost:8100',
  scope: 'openid offline_access profile email',
  logoutUrl: 'http://localhost:8100/',
  logLevel: 'DEBUG',
  iosWebView: 'private'
  // implicitLogin: 'CURRENT'
};

export const cordovaAzureConfig: IonicAuthOptions = {
  authConfig: 'azure',
  platform: 'cordova',
  clientID: `${AppConfig.app.CLIENT_ID}`,
  discoveryUrl: `https://login.microsoftonline.com/${AppConfig.app.TENANT_ID}/v2.0/.well-known/openid-configuration?appid=${AppConfig.app.CLIENT_ID}`,
  // redirectUri: `${AppConfig.app.MSAL_REDIRECT_URL}`,
  redirectUri: 'http://localhost:8100/',

  scope: 'openid offline_access profile email',
  // logoutUrl: `${AppConfig.app.MSAL_REDIRECT_URL}`
  logoutUrl: 'http://localhost:8100/'
};