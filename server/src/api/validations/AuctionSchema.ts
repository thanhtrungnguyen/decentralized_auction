import Joi from 'joi';
import { IAuction } from '../models/Auction';

export const AuctionSchema = {
  create: Joi.object<IAuction>({
    name: Joi.string().trim().required(),
    startRegistrationTime: Joi.string().trim().required(),
    endRegistrationTime: Joi.string().trim().required(),
    startAuctionTime: Joi.string().trim().required(),
    endAuctionTime: Joi.string().trim().required(),
    duePaymentTime: Joi.string().trim().required(),
    registrationFee: Joi.string().trim().required(),
    status: Joi.string().trim().required(),
    property: Joi.string().trim().required()
  }),
  update: Joi.object<IAuction>({
    name: Joi.string().trim().required(),
    startRegistrationTime: Joi.string().trim().required(),
    endRegistrationTime: Joi.string().trim().required(),
    startAuctionTime: Joi.string().trim().required(),
    endAuctionTime: Joi.string().trim().required(),
    duePaymentTime: Joi.string().trim().required(),
    registrationFee: Joi.string().trim().required(),
    status: Joi.string().trim().required(),
    property: Joi.string().trim().required()
  })
};
