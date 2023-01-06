import { Request, Response, NextFunction } from 'express';
import { getCategoryById } from '../services/CategoryService';
import { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../services/PropertyService';
import { findUser } from '../services/UserService';

export const getAllPropertiesHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllProperties()
    .then((properties) => {
      res.status(200).json({ properties });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPropertyByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const propertyId = req.params.propertyId;
  return await getPropertyById({ propertyId })
    .then((property) => {
      res.status(200).json({ property });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createPropertyHandler = async (req: Request, res: Response, next: NextFunction) => {
  const property = req.body;
  const category = await getCategoryById({ _id: req.body.category });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  const user = await findUser({ _id: req.body.user });
  if (!user) return res.status(404).json({ message: 'User not found' });

  return await createProperty({ ...property, user: user._id, category: category._id })
    .then((property) => {
      res.status(201).json({ property });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updatePropertyHandler = async (req: Request, res: Response, next: NextFunction) => {
  const propertyId = req.params.propertyId;
  const update = req.body;
  const property = await getPropertyById({ propertyId });
  if (!property) {
    return res.status(404).json({ message: "Property isn't found" });
  }
  return await updateProperty({ propertyId }, update, { new: true })
    .then((property) => {
      res.status(201).json({ property });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePropertyHandler = async (req: Request, res: Response, next: NextFunction) => {
  const propertyId = req.params.propertyId;
  const property = await getPropertyById({ propertyId });
  if (!property) {
    return res.status(404).json({ message: "Property isn't found" });
  }
  return await deleteProperty({ propertyId })
    .then((property) => {
      res.status(201).json({ property, message: 'Deleted property' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
