import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import logger from '../utils/logger';
import { IProperty } from '../models/Property';

export const ValidateResource = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      logger.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schema = {
  property: {
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
    })
  }
};
