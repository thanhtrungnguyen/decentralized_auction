import Joi from 'joi';
import { reject } from 'lodash';
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
  }),
  reject: Joi.object<IAuction>({
    message: Joi.string().trim().required(),
    status: Joi.string().trim().required(),
    property: Joi.string().trim().required()
  }),
  approve: Joi.object<IAuction>({
    name: Joi.string().trim().required(),
    property: Joi.string().trim().required(),
    startRegistrationTime: Joi.date()
      .ruleset.greater(Date.now())
      .rule({ message: 'startRegistrationTime must be greater than Date.now()' })
      .required(),
    endRegistrationTime: Joi.date()
      .ruleset.greater(Joi.ref('startRegistrationTime'))
      .rule({ message: 'endRegistrationTime must be greater than startRegistrationTime' })
      .required(),
    startAuctionTime: Joi.date()
      .ruleset.greater(Joi.ref('endRegistrationTime'))
      .rule({ message: 'startAuctionTime must be greater than endRegistrationTime' })
      .required(),
    endAuctionTime: Joi.date()
      .ruleset.greater(Joi.ref('startAuctionTime'))
      .rule({ message: 'endAuctionTime must be greater than startAuctionTime' })
      .required(),
    duePaymentTime: Joi.date()
      .ruleset.greater(Joi.ref('endAuctionTime'))
      .rule({ message: 'duePaymentTime must be greater than endAuctionTime' })
      .required(),
    registrationFee: Joi.string().trim().required()
  })
};
