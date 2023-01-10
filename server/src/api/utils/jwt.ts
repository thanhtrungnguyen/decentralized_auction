import jwt from 'jsonwebtoken';
import logger from './logger';

const signJwt = (object: object, key: string, options?: jwt.SignOptions | undefined) => {
  // const privateKey = Buffer.from(key, 'base64').toString('ascii');
  const privateKey = key;
  return jwt.sign(object, privateKey, {
    ...(options && options)
    //   algorithm: 'RS256'
  });
};

const verifyJwt = (token: string, key: string) => {
  try {
    // const publicKey = Buffer.from(key, 'base64').toString('ascii');
    const publicKey = key;
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
