import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Organization, { IOrganization, IOrganizationDocument } from '../models/Organization';
import logger from '../utils/logger';

const getAllOrganizations = async () => {
  try {
    return await Organization.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getOrganizationById = async (filter: FilterQuery<IOrganizationDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Organization.findOne(filter, {}, options);
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

export { getAllOrganizations, getOrganizationById, createOrganization, updateOrganization, deleteOrganization };
