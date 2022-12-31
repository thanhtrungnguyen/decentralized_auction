import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Property, { IProperty, IPropertyDocument } from '../models/Property';
import logger from '../utils/logger';

const getAllProperties = async () => {
  try {
    return await Property.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getPropertyById = async (filter: FilterQuery<IPropertyDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Property.findOne(filter, {}, options);
  } catch (error) {
    logger.error(error);
  }
};

const createProperty = async (property: IProperty) => {
  try {
    return await Property.create(property);
  } catch (error) {
    logger.error(error);
  }
};

const updateProperty = async (filter: FilterQuery<IPropertyDocument>, update: UpdateQuery<IPropertyDocument>, options: QueryOptions) => {
  try {
    return await Property.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

const deleteProperty = async (filter: FilterQuery<IProperty>) => {
  try {
    return await Property.deleteOne(filter);
  } catch (error) {
    logger.error(error);
  }
};

export { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty };
