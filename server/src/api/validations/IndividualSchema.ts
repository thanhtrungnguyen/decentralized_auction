import Joi from 'joi';
import { IIndividual } from '../models/Individual';

export const IndividualSchema = {
  create: Joi.object<IIndividual>({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    dateOfBirth: Joi.string().trim().required(),
    province: Joi.string().trim().required(),
    district: Joi.string().trim().required(),
    wards: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    cardNumber: Joi.string().trim().required(),
    cardGrantedDate: Joi.string().trim().required(),
    cardGrantedPlace: Joi.string().trim().required(),
    frontSideImage: Joi.string().trim().required(),
    backSideImage: Joi.string().trim().required()
  }).unknown()
};
