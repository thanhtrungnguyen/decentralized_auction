import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const requireRole = (requireRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res?.locals?.user;
      if (!user || user.role !== requireRole) {
        return res.sendStatus(403);
      }
      next();
    } catch (error) {
      logger.error(error);
      return res.status(422).json({ error });
    }
  };
};
