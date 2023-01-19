import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const requireRole = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!res?.locals?.user) return res.sendStatus(401);
      const isRequireRole = allowedRoles.map((role) => {
        if (role === res?.locals?.user?.role) return true;
      });
      if (!isRequireRole) return res.sendStatus(403);
      next();
    } catch (error) {
      logger.error(error);
      return res.status(422).json({ error });
    }
  };
};
