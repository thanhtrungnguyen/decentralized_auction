import Joi from 'joi';
import { IInformationOperator } from '../models/InformationOperator';

export const InformationOperatorSchema = {
  create: Joi.object<IInformationOperator>({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    gender: Joi.string().trim().required(),
    address: Joi.string().trim().required()
  }).unknown(),
  update: Joi.object<IInformationOperator>({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    gender: Joi.string().trim().required(),
    address: Joi.string().trim().required()
  }).unknown()
};
