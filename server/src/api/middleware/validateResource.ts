import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import logger from '../utils/logger';
import { IProperty } from '../models/Property';

export const validateResource = (schema: ObjectSchema) => {
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
