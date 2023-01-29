import Joi from 'joi';
import { IAuctionRegistration } from '../models/AuctionRegistration';

export const AuctionRegistrationSchema = {
  create: Joi.object<IAuctionRegistration>({
    walletAddress: Joi.string().trim().required()
  })
};
