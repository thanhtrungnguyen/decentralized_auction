import Session, { ISessionDocument } from '../models/Session';
import { get, omit } from 'lodash';
import { signJwt, verifyJwt } from '../utils/jwt';
import { findUser } from './UserService';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { IUserDocument } from '../models/User';
import { config } from '../../config/custom-environment-variables';
import { defaultConfig } from '../../config/constant-variables';

const createSession = async (userId: string) => {
  const session = await Session.create({ user: userId });
  return session;
};

const findSessions = async (filter: FilterQuery<ISessionDocument>) => {
  return await Session.find(filter).lean().populate('user');
};

const updateSession = async (filter: FilterQuery<ISessionDocument>, update: UpdateQuery<ISessionDocument>) => {
  return await Session.updateOne(filter, update);
};

const reIssueAccessToken = async ({ refreshToken }: { refreshToken: any }) => {
  const { decoded } = verifyJwt(refreshToken, defaultConfig.jwt.refreshTokenPublicKey);
  if (!decoded || !get(decoded, 'session')) return false;

  const session = await Session.findById(get(decoded, 'session'));
  if (!session || !session.valid) return false;

  const user = findUser({ _id: session.user });
  if (!user) return false;

  const accessToken = signJwt({ ...user, session: session._id }, defaultConfig.jwt.accessTokenTtl);
  return accessToken;
};

export { createSession, findSessions, updateSession, reIssueAccessToken };
