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
const getListCategory = async (index: any, status: any, search: any) => {
  var filter;
  const page_size = 8;
  try {
    var skip = parseInt(index);
    skip = skip == 1 ? 0 : (skip - 1) * page_size;
    status == 'null' && search == 'null'
      ? (filter = {})
      : status == 'null' && search != 'null'
      ? (filter = { name: { $regex: search, $options: 'i' } })
      : status != 'null' && search == 'null'
      ? (filter = { status: status })
      : (filter = { status: status, name: { $regex: search, $options: 'i' } });
    var arr = await Category.find(filter).sort({ createdAt: -1 }).skip(skip).limit(page_size);
    var count = await Category.find(filter);
    return { listCategory: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};

const getCategory = async (filter: FilterQuery<ICategoryDocument>, options: QueryOptions = { lean: true }) => {
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

export { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory, getListCategory };
