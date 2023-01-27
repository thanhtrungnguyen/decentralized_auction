import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Representative, { IRepresentative, IRepresentativeDocument } from '../models/Representative';
import logger from '../utils/logger';

const getAllRepresentatives = async () => {
  try {
    return await Representative.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getRepresentative = async (filter: FilterQuery<IRepresentativeDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Representative.findOne(filter, {}, options);
  } catch (error) {
    logger.error(error);
  }
};

const createRepresentative = async (representative: IRepresentative) => {
  try {
    return await Representative.create(representative);
  } catch (error) {
    logger.error(error);
  }
};

const updateRepresentative = async (
  filter: FilterQuery<IRepresentativeDocument>,
  update: UpdateQuery<IRepresentativeDocument>,
  options: QueryOptions
) => {
  try {
    return await Representative.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

const deleteRepresentative = async (filter: FilterQuery<IRepresentative>) => {
  try {
    return await Representative.deleteOne(filter);
  } catch (error) {
    logger.error(error);
  }
};

export { getAllRepresentatives, getRepresentative, createRepresentative, updateRepresentative, deleteRepresentative };
