import Joi from 'joi';
import { IProperty } from '../models/Property';

const floatingPointPattern = new RegExp('[+]?([0-9]*[.])?[0-9]+');

export const PropertySchema = {
  create: Joi.object<IProperty>({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    //status: Joi.string().trim().required(),
    depositAmount: Joi.string().trim().regex(floatingPointPattern).required(),
    priceStep: Joi.string().trim().regex(floatingPointPattern).required(),
    startBid: Joi.string().trim().regex(floatingPointPattern).required(),
    placeViewProperty: Joi.string().trim().required(),
    startViewPropertyTime: Joi.string().trim().required(),
    endViewPropertyTime: Joi.string().trim().required()
  }).unknown()
};
