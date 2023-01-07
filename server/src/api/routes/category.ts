import express from 'express';
import {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler
} from '../controllers/CategoryController';
import { validateResource } from '../middleware/validateResource';
import { CategorySchema } from '../validations/CategorySchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/categories', getAllCategoriesHandler);
router.get('/:categoryId', getCategoryByIdHandler);
router.post('/create', validateResource(CategorySchema.create), createCategoryHandler);
router.patch('/update/:categoryId', validateResource(CategorySchema.update), updateCategoryHandler);
router.delete('/delete/:categoryId', deleteCategoryHandler);

export default router;