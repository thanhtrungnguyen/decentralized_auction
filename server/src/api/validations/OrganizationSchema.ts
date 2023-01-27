import Joi from 'joi';
import { IOrganization } from '../models/Organization';

export const OrganizationSchema = {
  create: Joi.object<IOrganization>({
    name: Joi.string().trim().required(),
    taxCode: Joi.string().trim().required(),
    taxCodeGrantedDate: Joi.string().trim().required(),
    taxCodeGrantedPlace: Joi.string().trim().required(),
    addressOrganization: Joi.string().trim().required()
  }).unknown()
};
