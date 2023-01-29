import Joi from 'joi';
import { IOrganization } from '../models/Organization';

export const OrganizationSchema = {
  create: Joi.object<IOrganization>({
    name: Joi.string()
      .trim()
      .pattern(/^\s*([^\s]\s*){0,100}$/)
      .required(),
    taxCode: Joi.string()
      .trim()
      .pattern(/\d{10}/)
      .required(),
    taxCodeGrantedDate: Joi.date().required(),
    taxCodeGrantedPlace: Joi.string()
      .trim()
      .pattern(/^\s*([^\s]\s*){0,100}$/)
      .required(),
    addressOrganization: Joi.string()
      .trim()
      .pattern(/^\s*([^\s]\s*){0,100}$/)
      .required()
  }).unknown(),
  update: Joi.object<IOrganization>({
    name: Joi.string()
      .trim()
      .pattern(/^\s*([^\s]\s*){0,100}$/)
      .required(),
    taxCode: Joi.string()
      .trim()
      .pattern(/\d{10}/)
      .required(),
    taxCodeGrantedDate: Joi.date().required(),
    taxCodeGrantedPlace: Joi.string()
      .trim()
      .pattern(/^\s*([^\s]\s*){0,100}$/)
      .required(),
    addressOrganization: Joi.string()
      .trim()
      .pattern(/^\s*([^\s]\s*){0,100}$/)
      .required()
  }).unknown()
};
