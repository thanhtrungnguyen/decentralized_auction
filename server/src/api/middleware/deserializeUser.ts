import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { defaultConfig } from '../../config/constant-variables';
import { reIssueAccessToken } from '../services/AuthService';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');
  if (!accessToken) {
    return next();
  }
  const refreshToken = get(req, 'headers.x-refresh');
  const { decoded, expired } = verifyJwt(accessToken, defaultConfig.jwt.accessTokenPublicKey);
  if (decoded) {
    res.locals.user = decoded;
  }

  // if (expired && refreshToken) {
  //   const newAccessToken = await reIssueAccessToken({ refreshToken });

  //   if (newAccessToken) {
  //     res.setHeader('x-access-token', newAccessToken);
  //   }

  //   const { decoded } = verifyJwt(newAccessToken as string, defaultConfig.jwt.accessTokenPublicKey);

  //   res.locals.user = decoded;
  //   res.end();
  // }
  return next();
};

export default deserializeUser;
