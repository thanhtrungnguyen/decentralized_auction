import contractAddress from '../api/constants/contractAddress.json';
import contractAbi from '../api/constants/contractAbi.json';

const SALT_WORK_FACTOR = 10;

const ACCESS_TOKEN_TTL = '1y';

const REFRESH_TOKEN_TTL = '1y';

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY || '';
const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY || '';
const REFRESH_PRIVATE_KEY = process.env.REFRESH_PRIVATE_KEY || '';
const REFRESH_PUBLIC_KEY = process.env.REFRESH_PUBLIC_KEY || '';

const CHAIN_ID = '5';
const CONTRACT_ABI = contractAbi;
const CONTRACT_ADDRESS = contractAddress[CHAIN_ID][contractAddress[CHAIN_ID].length - 1];

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
  contract: {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI
  },
  role: {
    admin: 'admin',
    manager: 'manager',
    seller: 'seller',
    bidder: 'bidder'
  }
};
