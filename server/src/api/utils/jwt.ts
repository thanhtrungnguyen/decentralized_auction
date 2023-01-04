import jwt from 'jsonwebtoken';
import { defaultConfig } from '../../config/default';
import logger from './logger';

const signJwt = (payload: object, expiresIn: string | number) => {
  const privateKey = Buffer.from(defaultConfig.jwt.privateKey, 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, { expiresIn });
};

const verifyJwt = (token: string) => {
  try {
    const publicKey = Buffer.from(defaultConfig.jwt.publicKey, 'base64').toString('ascii');
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (error: any) {
    logger.error(error);
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    };
  }
};

export { signJwt, verifyJwt };
