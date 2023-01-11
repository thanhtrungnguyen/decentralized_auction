import Joi from 'joi';
import { IAuctionRegistration } from '../models/AuctionRegistration';

export const AuctionRegistrationSchema = {
  create: Joi.object<IAuctionRegistration>({
    user: Joi.string().trim().required(),
    auction: Joi.string().trim().required(),
    walletAddress: Joi.string().trim().required()
  })
};