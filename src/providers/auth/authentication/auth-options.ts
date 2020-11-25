import { IonicAuthOptions } from '@ionic-enterprise/auth';
import { default as AppConfig } from '../../../../config/application.hybrid';

export const webAzureConfig: IonicAuthOptions = {
  authConfig: 'azure',
  platform: 'web',
  clientID: `${AppConfig.app.CLIENT_ID}`,
  discoveryUrl: `https://login.microsoftonline.com/${AppConfig.app.TENANT_ID}/v2.0/.well-known/openid-configuration?appid=${AppConfig.app.CLIENT_ID}`,
  redirectUri: 'http://localhost:8100',
  scope: 'openid offline_access profile email',
  logoutUrl: 'http://localhost:8100',
  logLevel: 'DEBUG',
  iosWebView: 'private',
  webAuthFlow: 'PKCE'
};

export const cordovaAzureConfig: IonicAuthOptions = {
  authConfig: 'azure',
  platform: 'cordova',
  clientID: `${AppConfig.app.CLIENT_ID}`,
  discoveryUrl: `https://login.microsoftonline.com/${AppConfig.app.TENANT_ID}/v2.0/.well-known/openid-configuration?appid=${AppConfig.app.CLIENT_ID}`,
  redirectUri: `${AppConfig.app.AUTH_REDIRECT_URL}://callback`,
  scope: 'openid offline_access profile email',
  logoutUrl: `${AppConfig.app.AUTH_REDIRECT_URL}://callback?logout=true`,
  iosWebView: 'private',
  webAuthFlow: 'PKCE'
};
