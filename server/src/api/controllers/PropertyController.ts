import { Request, Response, NextFunction } from 'express';
import { boolean } from 'joi';
import { getCategory } from '../services/CategoryService';
import { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty, getPropertiesByUser } from '../services/PropertyService';
import { getUser } from '../services/UserService';

export const getAllPropertiesHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllProperties()
    .then((properties) => {
      res.status(200).json({ properties });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPropertiesByUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  var index = req.params.index;
  var status = req.params.status;
  var search = req.params.search;
  var userId = res.locals.user._id;
  return await getPropertiesByUser(userId, index, status, search)
    .then((properties) => {
      res.status(200).json({ properties });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPropertyByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const propertyId = req.params.propertyId;
  return await getProperty({ _id: propertyId })
    .then(async (property) => {
      res.status(200).json({ property });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createPropertyHandler = async (req: Request, res: Response, next: NextFunction) => {
  const property = req.body;
  const userId = res.locals.user._id;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const user = await getUser({ _id: userId });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const category = await getCategory({ _id: req.body.category });
  if (!category) return res.status(404).json({ message: 'Category not found' });

  const dataProperty = await createProperty({ ...property, user: userId, category: category._id }, files);

  if (dataProperty.success == false) {
    res.status(500).json(dataProperty);
  } else {
    res.status(201).json(dataProperty);
  }
};

export const updatePropertyHandler = async (req: Request, res: Response, next: NextFunction) => {
  const propertyId = req.params.propertyId;
  const update = req.body;
  const property = await getProperty({ _id: propertyId });
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!property) {
    return res.status(404).json({ message: "Property isn't found" });
  }
  var checkUpdate = false;
  if (
    update.category == property.category._id &&
    update.name == property.name &&
    update.description == property.description &&
    update.depositAmount == property.depositAmount &&
    update.priceStep == property.priceStep &&
    update.startBid == property.startBid &&
    update.placeViewProperty == property.placeViewProperty
  ) {
    var dateST = new Date(update.startViewPropertyTime);
    var dateCheckST = new Date(property.startViewPropertyTime);
    var dateEN = new Date(update.endViewPropertyTime);
    var dateCheckEN = new Date(property.endViewPropertyTime);
    if (dateST.getTime() === dateCheckST.getTime() && dateEN.getTime() === dateCheckEN.getTime()) {
      const file1 = files['propertyImage1'];
      const file2 = files['propertyImage2'];
      const file3 = files['propertyImage3'];
      const file4 = files['propertyVideo'];
      if (file1 == undefined && file2 == undefined && file3 == undefined && file4 == undefined) {
        return res.status(409).json({ message: 'Property remains unchanged, you need to modify it' });
      }
    }
  }
  return await updateProperty({ _id: propertyId }, update, { new: true }, files)
    .then((property) => {
      res.status(201).json({ property });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePropertyHandler = async (req: Request, res: Response, next: NextFunction) => {
  const propertyId = req.params.propertyId;
  const property = await getProperty({ _id: propertyId });
  if (!property) {
    return res.status(404).json({ message: "Property isn't found" });
  }
  return await deleteProperty({ _id: propertyId })
    .then((property) => {
      res.status(201).json({ property, message: 'Deleted property' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
