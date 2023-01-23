import { NextFunction, Request, Response } from 'express';
import { defaultConfig } from '../../config/constant-variables';
import { createSession, findSessionById, signAccessToken, signRefreshToken, updateSession } from '../services/AuthService';
import { getUser, validatePassword } from '../services/UserService';
import { signJwt, verifyJwt } from '../utils/jwt';

const createUserSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  const accessToken = await signAccessToken(user);

  const refreshToken = await signRefreshToken({ userId: user._id });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    // domain: 'localhost',  // production will change
    path: '/',
    sameSite: 'strict',
    secure: false // development: false, // production: true
  });

  return res.status(201).send({ accessToken, user });
};

const refreshAccessTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).send({ message: 'Refresh Token not found' });
  }

  const decoded = verifyJwt<{ session: string }>(refreshToken, defaultConfig.jwt.refreshTokenPublicKey);
  if (!decoded) {
    return res.status(401).send('Could not refresh access token');
  }

  const session = await findSessionById(decoded.session);
  if (!session || !session.valid) {
    return res.status(401).send('Could not refresh access token');
  }
  const user = await getUser({ _id: session.user });

  if (!user) {
    return res.status(401).send('Could not refresh access token');
  }
  const accessToken = await signAccessToken(user);

  return res.status(200).send({ accessToken, user });
};

const getUserSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const user = res?.locals?.user;
  if (!user) {
    return res.status(404).json({ message: 'Session not found' });
  }
  return res.status(200).send({ user });
  // return await findSessions({ user: userId, valid: true })
  //   .then((session) => {
  //     res.status(200).send(session);
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });
};

const deleteSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const session = res?.locals?.user?.session;
  return await updateSession({ _id: session }, { valid: false })
    .then((session) => {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        // domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false
      });
      return res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export { createUserSessionHandler, getUserSessionHandler, deleteSessionHandler, refreshAccessTokenHandler };
