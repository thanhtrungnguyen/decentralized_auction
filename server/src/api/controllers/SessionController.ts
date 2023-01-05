import { NextFunction, Request, Response } from 'express';
import { defaultConfig } from '../../config/default';
import { createSession, findSessions, updateSession } from '../services/SessionService';
import { validatePassword } from '../services/UserService';
import { signJwt } from '../utils/jwt';

const createUserSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  const session = await createSession(user._id);

  const accessToken = await signJwt({ ...user, session: session._id }, defaultConfig.jwt.accessTokenTtl);

  const refreshToken = await await signJwt({ ...user, session: session._id }, defaultConfig.jwt.refreshTokenTtl);

  return res.send({ accessToken, refreshToken });
};

const getUserSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log(res.locals);
  const userId = res.locals.user._id;
  return await findSessions({ user: userId, valid: true })
    .then((session) => {
      res.send(session);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const deleteSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const session = res.locals.user.session;
  return await updateSession({ _id: session }, { valid: false })
    .then((session) => {
      res.status(201).send({
        accessToken: null,
        refreshToken: null
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export { createUserSessionHandler, getUserSessionHandler, deleteSessionHandler };
