import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || 'DAP';
const CLUSTER_NAME = process.env.CLUSTER_NAME || 'cluster0.42nd0b2.mongodb.net';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${CLUSTER_NAME}/${MONGO_DATABASE_NAME}`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    database: MONGO_DATABASE_NAME,
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
};
