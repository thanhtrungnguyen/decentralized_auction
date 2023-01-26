import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { uploadFile } from '../../s3';
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

const getIndividual = async (filter: FilterQuery<IIndividualDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Individual.findOne(filter, {}, options);
  } catch (error) {
    logger.error(error);
  }
};

const createIndividual = async (individual: IIndividual, files: { [fieldName: string]: Express.Multer.File[] }) => {
  var img1, img2;
  try {
    const file1 = files['frontSideImage'][0];
    const file2 = files['backSideImage'][0];
    if (file1 && file2) {
      img1 = await (await uploadFile(file1)).data;
      img2 = await (await uploadFile(file2)).data;
      individual.frontSideImage = img1;
      individual.backSideImage = img2;
    } else {
      return { success: false, message: 'Upload avatar fail!!!' };
    }
    return await Individual.create(individual);
  } catch (error) {
    logger.error(error);
  }
};

function isEmptyObject(obj: Object) {
  return JSON.stringify(obj) === '{}';
}
const updateIndividual = async (
  filter: FilterQuery<IIndividualDocument>,
  update: UpdateQuery<IIndividualDocument>,
  options: QueryOptions,
  files: { [fieldName: string]: Express.Multer.File[] }
) => {
  try {
    var img1, img2;
    if (files) {
      const file1 = files['frontSideImage'];
      const file2 = files['backSideImage'];
      if (file1) {
        img1 = await (await uploadFile(file1[0])).data;
        update.frontSideImage = img1;
        if (!img1) {
          return { success: false, message: 'Upload frontSideImage fail!!!' };
        }
      }
      if (file2) {
        img2 = await (await uploadFile(file2[0])).data;
        update.backSideImage = img2;
        if (!img1) {
          return { success: false, message: 'Upload backSideImage fail!!!' };
        }
      }
    }
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
