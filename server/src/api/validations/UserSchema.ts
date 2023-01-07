import Joi from 'joi';
import { IUser } from '../models/User';

export const UserSchema = {
  create: Joi.object<object>({
    email: Joi.string().trim().required().email(),
    password: Joi.string().min(3).max(15).required().label('Password'),
    passwordConfirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
    role: Joi.string().trim().required()
  }).unknown(),
  updateStatus: Joi.object<IUser>({
    status: Joi.boolean().required()
  }).unknown(),
  createBidder: Joi.object<IUser>({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required()
  }).unknown(),
  login: Joi.object<IUser>({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required()
  }),
  forgotPassword: Joi.object<IUser>({
    email: Joi.string().trim().required().email()
  }),
  changePassword: Joi.object<object>({
    password: Joi.string().min(3).max(15).required().label('Password'),
    passwordConfirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' })
  })
};
