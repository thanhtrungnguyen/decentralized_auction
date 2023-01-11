import firebase, { ServiceAccount } from 'firebase-admin';
import { config } from '../../config/custom-environment-variables';
import logger from './logger';

firebase.initializeApp({
  credential: firebase.credential.cert(<ServiceAccount>config.credential)
});

const database = firebase.firestore();
database.settings({ ignoreUndefinedProperties: true });
logger.info('Connected to Firebase');

export { database };
