import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Category, { ICategory, ICategoryDocument } from '../models/Category';
import logger from '../utils/logger';

const getAllCategories = async () => {
  try {
    return await Category.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getCategoryById = async (filter: FilterQuery<ICategoryDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Category.findOne(filter, {}, options);
  } catch (error) {
    logger.error(error);
  }
};

const createCategory = async (category: ICategory) => {
  try {
    return await Category.create(category);
  } catch (error) {
    logger.error(error);
  }
};

const updateCategory = async (filter: FilterQuery<ICategoryDocument>, update: UpdateQuery<ICategoryDocument>, options: QueryOptions) => {
  try {
    return await Category.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

const deleteCategory = async (filter: FilterQuery<ICategory>) => {
  try {
    return await Category.deleteOne(filter);
  } catch (error) {
    logger.error(error);
  }
};

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
