require('dotenv').config();

// @ts-ignore
declare var require: any;
declare var process: any;

const chalk = require('chalk');
const fs = require('fs').promises;
const { argv } = require('yargs');

const {
  API_NON_PROD,
  MSAL_RESOURCE_URL_NON_PROD,
  IONIC_APP_ID,
  IONIC_KEY_ID,
  APP_KEY_PHONE_NUMBER,
  IONIC_ORG_ID,
  IONIC_PRODUCT_KEY
} = process.env;

const { environment, appName } = argv;

const isLocal = environment === 'local';
const isProduction = environment === 'production';

if(!isLocal) throw new Error(`
  ${chalk.bold.red(`Environment variable missing`)}\n
  Please use this script when developing locally only!
  You can set ${chalk.red('--environment')} flag to ${chalk.red(`'local'`)} when using development mode.\n
  e.g. ${chalk.hex('#DEADED')('--environment=local')} in your npm config script.\n\n
  `
);

const createFile = (path, data) =>
  new Promise((resolve, reject) => {
    try {
      resolve(fs.writeFile(path, data, 'utf-8'));  
      } catch(e) {
        reject(e)
      }
    }
  )

const npmrcFile = `
audit-level = high
audit = false
@ionic-enterprise:registry=https://registry.ionicframework.com/
//registry.ionicframework.com/:_authToken=${IONIC_PRODUCT_KEY}
`;

const applicationJsonFile = `
{
  "IS_PRODUCTION": "${isProduction}",
  "STAFF_ID_KEY": "extn.StaffId",
  "KEY_PHONE_NUMBER": "${APP_KEY_PHONE_NUMBER}",
  "MSAL_CLIENT_ID": "${MSAL_RESOURCE_URL_NON_PROD}",
  "MSAL_AUTHORITY": "https://login.windows.net/common",
  "MSAL_HOST": "K84TL26V3P.uk.gov.dvsa.cvsmobile",
  "MSAL_REDIRECT_URL": "https://uk.gov.dvsa.cvsmobile",
  "MSAL_RESOURCE_URL": "${MSAL_RESOURCE_URL_NON_PROD}",
  "UNAUTH_LOGS_API_KEY": "",
  "BACKEND_URL_SIGNATURE": "${API_NON_PROD}cvs-signature-nonprod/develop%2F",
  "BACKEND_URL_TEST_STATIONS":"${API_NON_PROD}test-stations",
  "BACKEND_URL_DEFECTS": "${API_NON_PROD}defects",
  "BACKEND_URL_PREPARERS": "${API_NON_PROD}preparers",
  "BACKEND_URL_TESTTYPES": "${API_NON_PROD}test-types",
  "BACKEND_URL_TECHRECORDS": "${API_NON_PROD}vehicles",
  "BACKEND_URL_TEST_RESULTS": "${API_NON_PROD}test-results",
  "BACKEND_URL_LOGS": "${API_NON_PROD}logs",
  "BACKEND_URL_VISIT": "${API_NON_PROD}activities",
  "BACKEND_URL_UNAUTH_LOGS": "http://localhost:3000/unauth-logs",
  "URL_LATEST_VERSION": ""
}
`;

const ionicConfigJsonFile = `
{
  "name": "${appName}",
  "integrations": {
    "cordova": {},
    "enterprise": {
      "keyId": ${IONIC_KEY_ID},
      "productKey": "${IONIC_PRODUCT_KEY}",
      "appId": "${IONIC_APP_ID}",
      "orgId": "${IONIC_ORG_ID}",
      "registries": [
        "@ionic-enterprise;https://registry.ionicframework.com/"
      ]
    }
  },
  "type": "ionic-angular"
}
`;

(async () => {
  try {
    await createFile('.npmrc', npmrcFile);
    await createFile('config/application.json', applicationJsonFile);
    await createFile('ionic.config.json', ionicConfigJsonFile);
    console.log(
      chalk.green(`
        ****************************
        *  Files written to path!  *
        ****************************
      `)
    );
  } catch (e) {
    console.error(e)
  }
})()
