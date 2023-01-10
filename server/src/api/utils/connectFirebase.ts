import firebase, { ServiceAccount } from 'firebase-admin';
import { config } from '../../config/custom-environment-variables';

firebase.initializeApp({
  credential: firebase.credential.cert(<ServiceAccount>config.credential)
});

const database = firebase.firestore();
database.settings({ ignoreUndefinedProperties: true });

export { database };
