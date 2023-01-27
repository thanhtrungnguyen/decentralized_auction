import Session, { ISessionDocument } from '../models/Session';
import { get, omit } from 'lodash';
import { signJwt, verifyJwt } from '../utils/jwt';
import { getUser } from './UserService';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { IUserDocument, privateFields } from '../models/User';
import { config } from '../../config/custom-environment-variables';
import { defaultConfig } from '../../config/constant-variables';
import logger from '../utils/logger';

const createSession = async ({ userId }: { userId: string }) => {
  try {
    return await Session.create({ user: userId });
  } catch (error) {
    logger.error(error);
  }
};

const findSessionById = async (id: string) => {
  try {
    return await Session.findById(id);
  } catch (error) {
    logger.error(error);
  }
};

const updateSession = async (filter: FilterQuery<ISessionDocument>, update: UpdateQuery<ISessionDocument>) => {
  try {
    return await Session.updateOne(filter, update);
  } catch (error) {
    logger.error(error);
  }
};

const signAccessToken = async (user: any) => {
  try {
    const payload = omit(user, privateFields);

    const accessToken = await signJwt(payload, defaultConfig.jwt.accessTokenPrivateKey, {
      expiresIn: defaultConfig.jwt.accessTokenTtl
    });

    return accessToken;
  } catch (error) {
    logger.error(error);
  }
};

const signRefreshToken = async ({ userId }: { userId: string }) => {
  try {
    const session = await createSession({ userId });
    const refreshToken = signJwt({ session: session?._id }, defaultConfig.jwt.refreshTokenPrivateKey, {
      expiresIn: defaultConfig.jwt.refreshTokenTtl
    });
    await updateSession({ _id: session?.id }, { refreshToken: refreshToken });
    return refreshToken;
  } catch (error) {
    logger.error(error);
  }
};

export { createSession, findSessionById, updateSession, signAccessToken, signRefreshToken };
