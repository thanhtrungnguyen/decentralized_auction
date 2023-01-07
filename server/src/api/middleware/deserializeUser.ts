import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { config } from 'process';
import { defaultConfig } from '../../config/default';
import { reIssueAccessToken } from '../services/AuthService';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken, defaultConfig.jwt.accessTokenPublicKey);

  if (decoded) {
    res.locals.user = decoded;
    console.log('res.locals.user', res.locals.user);
  }

  return next();
};

export default deserializeUser;
