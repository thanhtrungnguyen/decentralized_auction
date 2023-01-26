import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Individual from '../models/Individual';
import Organization, { IOrganization, IOrganizationDocument } from '../models/Organization';
import logger from '../utils/logger';

const getAllOrganizations = async () => {
  try {
    let listSeller;
    await Organization.find({})
      .populate({
        path: 'individual',
        populate: {
          path: 'user'
        }
      })
      .then((result) => {
        listSeller = result.filter((element) => element.individual.user !== null);
      });
    return listSeller;
  } catch (error) {
    logger.error(error);
  }
};
const getAllSellers = async () => {
  try {
    let listSeller;
    await Organization.find({})
      .populate({
        path: 'individual',
        populate: {
          path: 'user',
          match: {
            role: 'seller'
          }
        }
      })
      .then((result) => {
        listSeller = result.filter((element) => element.individual.user !== null);
      });
    return listSeller;
  } catch (error) {
    logger.error(error);
  }
};

const getOrganization = async (filter: FilterQuery<IOrganizationDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Organization.findOne(filter, {}, options).populate({ path: 'individual' });
  } catch (error) {
    logger.error(error);
  }
};
const getOrganizationByUserId = async (userId: string) => {
  try {
    const idIndividual = await Individual.findOne({ user: userId });
    const data = await Organization.findOne({ individual: idIndividual }).populate('individual');
    return data;
  } catch (error) {
    logger.error(error);
  }
};

const createOrganization = async (organization: IOrganization) => {
  try {
    return await Organization.create(organization);
  } catch (error) {
    logger.error(error);
  }
};

const updateOrganization = async (filter: FilterQuery<IOrganizationDocument>, update: UpdateQuery<IOrganizationDocument>, options: QueryOptions) => {
  try {
    return await Organization.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

const deleteOrganization = async (filter: FilterQuery<IOrganization>) => {
  try {
    return await Organization.deleteOne(filter);
  } catch (error) {
    logger.error(error);
  }
};

export { getAllOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization, getAllSellers, getOrganizationByUserId };
