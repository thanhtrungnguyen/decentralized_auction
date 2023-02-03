import Joi from 'joi';
import { IUser } from '../models/User';

export const UserSchema = {
  create: Joi.object<object>({
    username: Joi.string().trim().required(),
    password: Joi.string().min(3).max(15).required().label('Password'),
    passwordConfirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
    role: Joi.string().trim().required(),
    type: Joi.string().trim().required()
  }).unknown(),
  updateStatus: Joi.object<IUser>({
    status: Joi.boolean()
  }).unknown(),
  createBidder: Joi.object<IUser>({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
  }).unknown(),
  login: Joi.object<IUser>({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
  }),

  forgotPassword: Joi.object<object>({
    username: Joi.string().trim().required()
  }),
  changePassword: Joi.object<object>({
    oldPassword: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(3).max(15).required().label('Password'),
    passwordConfirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' })
  })
};
