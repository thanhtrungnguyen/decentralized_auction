import Joi from 'joi';
import { IProperty } from '../models/Property';

export const PropertySchema = {
  create: Joi.object<IProperty>({
    name: Joi.string().trim().required()
    // description: string;
    // status: string;
    // depositAmount: number;
    // priceStep: number;
    // startBid: number;
    // placeViewProperty: string;
    // startViewPropertyTime: Date;
    // endViewPropertyTime: Date;
    // idUser: string;
  }).unknown()
};
