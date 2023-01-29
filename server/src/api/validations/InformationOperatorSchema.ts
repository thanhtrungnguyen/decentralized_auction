import Joi from 'joi';
import { IInformationOperator } from '../models/InformationOperator';

export const InformationOperatorSchema = {
  create: Joi.object<IInformationOperator>({
    firstName: Joi.string()
      .trim()
      .pattern(/[a-zA-Z\s]{1,50}/)
      .required(),
    lastName: Joi.string()
      .trim()
      .pattern(/[a-zA-Z\s]{1,50}/)
      .required(),
    phone: Joi.string()
      .trim()
      .pattern(/(0[3|5|7|8|9])+([0-9]{8})\b/)
      .required(),
    email: Joi.string().trim().email().required(),
    gender: Joi.string().trim().valid('Male', 'Female', 'Other').required(),
    address: Joi.string()
      .trim()
      .pattern(/^\s*([^\s]\s*){0,300}$/)
      .required()
  }).unknown(),
  update: Joi.object<IInformationOperator>({
    firstName: Joi.string()
      .trim()
      .pattern(/[a-zA-Z\s]{1,50}/)
      .required(),
    lastName: Joi.string()
      .trim()
      .pattern(/[a-zA-Z\s]{1,50}/)
      .required(),
    phone: Joi.string()
      .trim()
      .pattern(/(0[3|5|7|8|9])+([0-9]{8})\b/)
      .required(),
    email: Joi.string().trim().email().required(),
    gender: Joi.string().trim().valid('Male', 'Female', 'Other').required(),
    address: Joi.string()
      .trim()
      .pattern(/^\s*([^\s]\s*){0,300}$/)
      .required()
  }).unknown()
};
