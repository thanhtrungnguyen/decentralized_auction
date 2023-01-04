import { NextFunction, Request, Response } from 'express';
import { reIssueAccessToken } from '../services/SessionService';
import { signJwt, verifyJwt } from '../utils/jwt';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }
    const result = verifyJwt(newAccessToken as string);
    res.locals.user = result.decoded;
    return next();
  }
  return next();
};

export default deserializeUser;
