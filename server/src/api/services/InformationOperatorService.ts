import { FilterQuery, QueryOptions } from 'mongoose';
import InformationOperator, { IInformationOperator, IInformationOperatorDocument } from '../models/InformationOperator';
import logger from '../utils/logger';

const getAllInformationOperator = async () => {
  try {
    let list = await InformationOperator.find({}).populate('user');
    return list;
  } catch (error) {
    logger.error(error);
  }
};

const getInformationOperator = async (filter: FilterQuery<IInformationOperatorDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await InformationOperator.findOne(filter, {}, options);
  } catch (error) {
    logger.error(error);
  }
};

const createInformationOperator = async (informationOperation: IInformationOperator) => {
  try {
    return await InformationOperator.create(informationOperation);
  } catch (error) {
    logger.error(error);
  }
};
export { getAllInformationOperator, getInformationOperator, createInformationOperator };
