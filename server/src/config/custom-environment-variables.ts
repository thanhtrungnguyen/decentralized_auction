import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || 'DAP';
const CLUSTER_NAME = process.env.CLUSTER_NAME || 'cluster0.42nd0b2.mongodb.net';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${CLUSTER_NAME}/${MONGO_DATABASE_NAME}`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;
const CLIENT_ADDRESS = process.env.CLIENT ? process.env.CLIENT : 'http://localhost:3000';

const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const MAIL_MAILER = 'smtp';
const MAIL_HOST = 'smtp.gmail.com';
const MAIL_PORT = 587;

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION || '';
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || '';
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '';

const PROJECT_ID = process.env.PROJECT_ID || '';
const KEY_ID = process.env.KEY_ID || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const SERVICE_ACCOUNT_EMAIL = process.env.SERVICE_ACCOUNT_EMAIL || '';
const CLIENT_ID = process.env.CLIENT_ID || '';

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || '';

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    database: MONGO_DATABASE_NAME,
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  },
  client: {
    address: CLIENT_ADDRESS
  },
  smtp: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false
  },
  credential: {
    type: 'service_account',
    project_id: PROJECT_ID,
    private_key_id: KEY_ID,
    private_key: `-----BEGIN PRIVATE KEY-----\n${PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`,
    client_email: SERVICE_ACCOUNT_EMAIL,
    client_id: CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${SERVICE_ACCOUNT_EMAIL}`
  },
  blockchain: {
    privateKey: WALLET_PRIVATE_KEY,
    rpcUrl: GOERLI_RPC_URL
  }
};
