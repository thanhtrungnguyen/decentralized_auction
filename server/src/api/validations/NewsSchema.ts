import Joi from 'joi';
import { INews } from '../models/News';

export const NewsSchema = {
  create: Joi.object<INews>({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required()
  }),
  update: Joi.object<INews>({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    status: Joi.string().trim().required()
  })
};
