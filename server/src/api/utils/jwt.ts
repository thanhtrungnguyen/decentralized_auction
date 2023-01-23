import jwt from 'jsonwebtoken';
import logger from './logger';

const signJwt = (object: object, key: string, options?: jwt.SignOptions | undefined) => {
  // const privateKey = Buffer.from(key, 'base64').toString('ascii');
  const privateKey = key;
  const token = jwt.sign(object, privateKey, {
    ...(options && options)
    //   algorithm: 'RS256'
  });
  return token;
};

const verifyJwt = <T>(token: string, key: string): T | null => {
  try {
    // const publicKey = Buffer.from(key, 'base64').toString('ascii');
    const publicKey = key;
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error: any) {
    console.log('token', token);
    logger.error(error);
    return null;
  }
};

export { signJwt, verifyJwt };
