import { NextFunction, Request, Response } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user == null) {
    return res.sendStatus(403);
  }
  next();
};

// const authRole = (role: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (req.locals.user.role !== role) {
//       res.status(401).json({ message: 'Access denied' });
//     }
//     next();
//   };
// };

export { requireUser };
