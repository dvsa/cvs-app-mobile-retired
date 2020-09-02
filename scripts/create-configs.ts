import { log } from 'debug';
import { existsSync, writeFileSync } from 'fs-extra';

import { sentryFile } from './index';

if (existsSync('config/application.json')) {
  log('\n===========================================');
  log('Using application.json to supply environment config variable');
} else {
  log('\n===========================================');
  log('File application.json not available. Please check');
  process.exit(99);
}

const createFile = (path: string, data: any): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      resolve(writeFileSync(path, data));
    } catch (e) {
      reject(e);
    }
  });

(async () => {
  try {
    await Promise.all([createFile('sentry.properties', sentryFile)]);
    log('===========================================');
    log('Files written to path!');
    log('==============================================\n');
  } catch (e) {
    console.error(e);
    log(JSON.stringify(e));
  }
})();
