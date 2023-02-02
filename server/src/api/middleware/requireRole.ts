import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const requireRole = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    var isRequireRole = false;
    try {
      if (!res?.locals?.user) return res.sendStatus(403);
      allowedRoles.map((role) => {
        if (role === res?.locals?.user?.role) isRequireRole = true;
      });
      if (!isRequireRole) return res.sendStatus(403);
      else next();
    } catch (error) {
      logger.error(error);
      return res.status(422).json({ error });
    }
  };
};
