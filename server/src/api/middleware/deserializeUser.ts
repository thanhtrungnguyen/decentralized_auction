import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { defaultConfig } from '../../config/constant-variables';
import { reIssueAccessToken } from '../services/AuthService';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'cookies.accessToken') || (req.headers?.authorization || '').replace(/^Bearer\s/, '');
  if (!accessToken || accessToken === 'null') {
    return next();
  }

  const refreshToken = get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh');
  const { decoded, expired } = verifyJwt(accessToken, defaultConfig.jwt.accessTokenPublicKey);
  if (decoded) {
    res.locals.user = decoded;
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);

      res.cookie('accessToken', newAccessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false
      });
    }

    const { decoded } = verifyJwt(newAccessToken as string, defaultConfig.jwt.accessTokenPublicKey);

    res.locals.user = decoded;
    return next();
  }
  return next();
};

export default deserializeUser;
