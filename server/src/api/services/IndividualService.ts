import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Individual, { IIndividual, IIndividualDocument } from '../models/Individual';
import logger from '../utils/logger';

const getAllIndividuals = async () => {
  try {
    let list = await Individual.find({}).populate('user');
    return list;
  } catch (error) {
    logger.error(error);
  }
};
const getIndividualsByRole = async (role: String, index: any, status: any) => {
  try {
    var skip = parseInt(index);
    skip = skip == 1 ? 0 : (skip - 1) * 8 + 1;
    var filterUser, filter;
    status == 'null' ? (filterUser = { role: role }) : (filterUser = { role: role, status: status });
    var arr = await Individual.find({})
      .populate({
        path: 'user',
        match: filterUser
      })
      .skip(skip)
      .limit(8)
      .exec();
    arr = arr.filter((element) => element.user !== null);

    var count = await Individual.find({})
      .populate({
        path: 'user',
        match: filterUser
      })
      .exec();
    count = count.filter((element) => element.user !== null);

    return { listUser: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};

const getIndividual = async (filter: FilterQuery<IIndividualDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Individual.findOne(filter, {}, options);
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

export { getAllIndividuals, getIndividual, createIndividual, updateIndividual, deleteIndividual, getIndividualsByRole };
