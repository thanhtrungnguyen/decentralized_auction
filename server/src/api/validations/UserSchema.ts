import Joi from 'joi';
import { IUser } from '../models/User';

export const UserSchema = {
  create: Joi.object<IUser>({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    //     status: Joi.string().trim().required()
    role: Joi.string().trim().required()
  }).unknown(),
  createBidder: Joi.object<IUser>({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
  }).unknown(),
  login: Joi.object<IUser>({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
  })
};
