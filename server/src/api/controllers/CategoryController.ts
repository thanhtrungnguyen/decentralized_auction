import { Request, Response, NextFunction } from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../services/CategoryService';

export const getAllCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllCategories()
    .then((categories) => {
      res.status(200).json({ categories });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getCategoryByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const categoryId = req.params.categoryId;
  return await getCategoryById({ categoryId })
    .then((category) => {
      res.status(200).json({ category });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  const category = req.body;
  return await createCategory(category)
    .then((category) => {
      res.status(201).json({ category });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updateCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  const categoryId = req.params.categoryId;
  const update = req.body;
  const category = await getCategoryById({ categoryId });
  if (!category) {
    return res.status(404).json({ message: "Category isn't found" });
  }
  return await updateCategory({ categoryId }, update, { new: true })
    .then((category) => {
      res.status(201).json({ category });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  const categoryId = req.params.categoryId;
  const category = await getCategoryById({ categoryId });
  if (!category) {
    return res.status(404).json({ message: "Category isn't found" });
  }
  return await deleteCategory({ categoryId })
    .then((category) => {
      res.status(201).json({ category, message: 'Deleted category' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
