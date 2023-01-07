const SALT_WORK_FACTOR = 10;

const ACCESS_TOKEN_TTL = '15m';

const REFRESH_TOKEN_TTL = '1y';

const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY || '';
const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY || '';
const REFRESH_PRIVATE_KEY = process.env.REFRESH_PRIVATE_KEY || '';
const REFRESH_PUBLIC_KEY = process.env.REFRESH_PUBLIC_KEY || '';

export const defaultConfig = {
  jwt: {
    saltWorkFactor: SALT_WORK_FACTOR,
    accessTokenTtl: ACCESS_TOKEN_TTL,
    refreshTokenTtl: REFRESH_TOKEN_TTL,
    accessTokenPrivateKey: ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: REFRESH_PRIVATE_KEY,
    refreshTokenPublicKey: REFRESH_PUBLIC_KEY
  },
  role: {
    admin: 'admin',
    manager: 'manager',
    seller: 'seller',
    bidder: 'bidder'
  }
};
