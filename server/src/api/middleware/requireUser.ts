import { NextFunction, Request, Response } from 'express';

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res?.locals?.user;
  if (!user) {
    return res.status(403).send({ message: 'Forbidden' });
  }
  next();
};
