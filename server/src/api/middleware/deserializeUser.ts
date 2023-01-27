import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { defaultConfig } from '../../config/constant-variables';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers?.authorization || '').replace(/^Bearer\s/, '');
  if (!accessToken || accessToken === 'null') {
    return next();
  }

  const decoded = verifyJwt(accessToken, defaultConfig.jwt.accessTokenPublicKey);
  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
};

export default deserializeUser;
