import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Individual, { IIndividual, IIndividualDocument } from '../models/Individual';
import logger from '../utils/logger';

const getAllIndividuals = async () => {
  try {
    return await Individual.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getIndividual = async (filter: FilterQuery<IIndividualDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Individual.findOne(filter, {}, options).populate('user');
  } catch (error) {
    logger.error(error);
  }
};

const createIndividual = async (individual: IIndividual) => {
  try {
    return await Individual.create(individual);
  } catch (error) {
    logger.error(error);
  }
};

const updateIndividual = async (filter: FilterQuery<IIndividualDocument>, update: UpdateQuery<IIndividualDocument>, options: QueryOptions) => {
  try {
    return await Individual.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

const deleteIndividual = async (filter: FilterQuery<IIndividual>) => {
  try {
    return await Individual.deleteOne(filter);
  } catch (error) {
    logger.error(error);
  }
};

export { getAllIndividuals, getIndividual, createIndividual, updateIndividual, deleteIndividual };
