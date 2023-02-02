import Joi from 'joi';
import { IIndividual } from '../models/Individual';
const namePattern = new RegExp('[a-zA-Z]{1,50}');

export const IndividualSchema = {
  create: Joi.object<IIndividual>({
    firstName: Joi.string().trim().regex(namePattern).required(),
    lastName: Joi.string().trim().regex(namePattern).required(),
    phone: Joi.string()
      .trim()
      .required()
      .pattern(/^[0]\d{9}$/),
    email: Joi.string()
      .trim()
      .required()
      .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    cityId: Joi.string().trim().required(),
    province: Joi.string().trim(),
    district: Joi.string().trim().required(),
    districtId: Joi.string().trim().required(),
    wards: Joi.string().trim().required(),
    wardsId: Joi.string().trim().required(),
    address: Joi.string()
      .trim()
      .required()
      .pattern(/^\s*([^\s]\s*){0,300}$/),
    cardNumber: Joi.string().trim().required(),
    cardGrantedDate: Joi.date().required(),
    cardGrantedPlace: Joi.string()
      .trim()
      .required()
      .pattern(/^\s*([^\s]\s*){0,100}$/)
    // frontSideImage: Joi.string().trim(),
    // backSideImage: Joi.string().trim()
  }).unknown()
};
