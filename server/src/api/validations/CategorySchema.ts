import Joi from 'joi';
import { ICategory } from '../models/Category';

export const CategorySchema = {
  create: Joi.object<ICategory>({
    name: Joi.string().trim().required()
  }),
  update: Joi.object<ICategory>({
    name: Joi.string().trim().required(),
    status: Joi.boolean().required()
  })
};
