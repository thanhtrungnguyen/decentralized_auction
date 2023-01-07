import { NextFunction, Request, Response } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  console.log('requireUser', user);
  if (!user) {
    return res.sendStatus(403);
  }
  return next();
};

export { requireUser };
