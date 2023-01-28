import { config } from './custom-environment-variables';

export const allowedOrigins = [
  'http://20.205.108.122:3000/',
  'https://www.fasdgfsadfgfdgdf.com',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  config.client.address
];
