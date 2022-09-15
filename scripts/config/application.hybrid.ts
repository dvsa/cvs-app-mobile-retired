const { argv } = require('yargs');

const {
  ENVIRONMENT,
  BUCKET,
  END_ENV,
  BASE_URL,
  AZURE_CLIENT_ID,
  AZURE_TENANT_ID,
  AUTH_REDIRECT_URL,
  APP_KEY_PHONE_NUMBER,
  SENTRY_DSN,
  UNAUTH_LOGS_API_KEY,
  URL_LATEST_VERSION,
  GOOGLE_ANALYTICS_ID,
  HTTPS
} = process.env;

const isProduction = ENVIRONMENT === 'production';
const NEW_URL = ENVIRONMENT.includes('vta') ? `${HTTPS}${END_ENV}-${BASE_URL}/${END_ENV}` : `${HTTPS}${BASE_URL}/${END_ENV}`;

export const hybridConfig = `export default {
  "IS_PRODUCTION": "${isProduction}",
  "app": {
    "CLIENT_ID": "${AZURE_CLIENT_ID}",
    "TENANT_ID": "${AZURE_TENANT_ID}",
    "STAFF_ID_KEY": "extn.StaffId",
    "KEY_PHONE_NUMBER": "${APP_KEY_PHONE_NUMBER}",
    "AUTH_REDIRECT_URL": "${AUTH_REDIRECT_URL}",
    "UNAUTH_LOGS_API_KEY": "${UNAUTH_LOGS_API_KEY}",
    "BACKEND_URL_SIGNATURE": "${NEW_URL}/${BUCKET}/${END_ENV}%2F",
    "BACKEND_URL": "${NEW_URL}",
    "URL_LATEST_VERSION": "${URL_LATEST_VERSION}"
  },
  "sentry": {
    "SENTRY_ENV": "${END_ENV}",
    "SENTRY_DSN": "${SENTRY_DSN}",
  },
  "ga": {
    "GOOGLE_ANALYTICS_ID": "${GOOGLE_ANALYTICS_ID}"
  }
}`;
