import Joi from 'joi';
import { INews } from '../models/News';

export const NewsSchema = {
  create: Joi.object<INews>({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required()
    // avatar: Joi.string().trim()
  }),
  update: Joi.object<INews>({
    title: Joi.string().trim().required(),
    // avatar: Joi.string().trim(),
    content: Joi.string().trim().required(),
    status: Joi.string().trim()
  })
};
