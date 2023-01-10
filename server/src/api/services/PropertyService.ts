import { FilterQuery, ObjectId, QueryOptions, UpdateQuery } from 'mongoose';
import { uploadFile } from '../../s3';
import Property, { IProperty, IPropertyDocument } from '../models/Property';
import PropertyMedia from '../models/PropertyMedia';
import logger from '../utils/logger';

const getAllProperties = async () => {
  try {
    return await Property.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getProperty = async (filter: FilterQuery<IPropertyDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Property.findOne(filter, {}, options).populate('category');
  } catch (error) {
    logger.error(error);
  }
};

const createProperty = async (property: IProperty, files: { [fieldname: string]: Express.Multer.File[] }) => {
  var propertyId, propertyItem, img1, img2, img3, video;
  try {
    const file1 = files['propertyImage1'][0];
    const file2 = files['propertyImage2'][0];
    const file3 = files['propertyImage3'][0];
    const file4 = files['propertyVideo'][0];
    if (file1 && file2 && file3 && file4) {
      img1 = await (await uploadFile(file1)).data;
      img2 = await (await uploadFile(file2)).data;
      img3 = await (await uploadFile(file3)).data;
      video = await (await uploadFile(file4)).data;
      property.status = 'Created';
    }

    await Property.create(property)
      .then((item) => {
        propertyId = item._id;
        propertyItem = item;
      })
      .catch((error) => {
        logger.error(error);
        return { success: false, message: 'Create property fail!!!' };
      });

    await PropertyMedia.create({
      property: propertyId,
      mediaUrl: [img1, img2, img3, video]
    }).catch((error) => {
      logger.error(error);
      return { success: false, message: 'Create property media fail!!!' };
    });

    return { success: true, message: 'create property sucessfully!!', propertyItem: propertyItem };
  } catch (error) {
    logger.error(error);
    return { success: false, message: 'Missing file' };
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
const findMediaByPropertyId = async (propertyId: ObjectId) => {
  return await PropertyMedia.findOne({ property: propertyId });
};

export { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty, findMediaByPropertyId };
