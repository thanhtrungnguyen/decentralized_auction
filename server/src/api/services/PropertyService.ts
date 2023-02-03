import { string } from 'joi';
import { FilterQuery, ObjectId, QueryOptions, UpdateQuery } from 'mongoose';
import { uploadFile } from '../utils/s3';
import Property, { IProperty, IPropertyDocument } from '../models/Property';
import logger from '../utils/logger';

const getAllProperties = async () => {
  try {
    return await Property.find({});
  } catch (error) {
    logger.error(error);
  }
};
const getPropertiesByUser = async (userId: any, index: any, status: any, search: any) => {
  const page_size = 8;
  try {
    var filter;
    var skip = parseInt(index);
    skip = skip == 1 ? 0 : (skip - 1) * page_size;
    status == 'null' && search == 'null'
      ? (filter = { user: userId })
      : status == 'null' && search != 'null'
      ? (filter = { name: { $regex: search, $options: 'i' }, user: userId })
      : status != 'null' && search == 'null'
      ? (filter = { status: status, user: userId })
      : (filter = { status: status, name: { $regex: search, $options: 'i' }, user: userId });
    var arr = await Property.find(filter).populate('category').skip(skip).limit(page_size).sort({ createdAt: -1 });
    var count = await Property.find(filter).count();
    return { listProperty: arr, count: count };
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
      property.mediaUrl = [img1, img2, img3, video];
    } else {
      return { success: false, message: 'Create property media fail!!!' };
    }

    await Property.create(property)
      .then((item) => {
        propertyItem = item;
      })
      .catch((error) => {
        logger.error(error);
        return { success: false, message: 'Create property fail!!!' };
      });

    return { success: true, message: 'Create property successfully!!', propertyItem: propertyItem };
  } catch (error) {
    logger.error(error);
    return { success: false, message: 'Missing file' };
  }
};

const updateProperty = async (
  filter: FilterQuery<IPropertyDocument>,
  update: UpdateQuery<IPropertyDocument>,
  options: QueryOptions,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  const propertymedia = await Property.findOne({ _id: filter._id });
  var mediaUrl: any;
  mediaUrl = propertymedia?.mediaUrl;
  if (files) {
    const file1 = files['propertyImage1'];
    const file2 = files['propertyImage2'];
    const file3 = files['propertyImage3'];
    const file4 = files['propertyVideo'];
    if (file1 != undefined) {
      var img1 = await (await uploadFile(file1[0])).data;
      mediaUrl[0] = img1;
    }
    if (file2 != undefined) {
      var img2 = await (await uploadFile(file2[0])).data;
      mediaUrl[1] = img2;
    }
    if (file3 != undefined) {
      var img3 = await (await uploadFile(file3[0])).data;
      mediaUrl[2] = img3;
    }
    if (file4 != undefined) {
      var video = await (await uploadFile(file4[0])).data;
      mediaUrl[3] = video;
    }
    update.mediaUrl = mediaUrl;
  }

  try {
    return await Property.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};
const updatePropertyStatus = async (filter: FilterQuery<IPropertyDocument>, update: UpdateQuery<IPropertyDocument>, options: QueryOptions) => {
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
// const findMediaByPropertyId = async (propertyId: ObjectId) => {
//   return await PropertyMedia.findOne({ property: propertyId });
// };

export { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty, getPropertiesByUser, updatePropertyStatus };
