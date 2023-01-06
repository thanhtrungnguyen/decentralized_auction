import express from 'express';
import {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler
} from '../controllers/CategoryController';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/categories', getAllCategoriesHandler);
router.get('/:categoryId', getCategoryByIdHandler);
router.post('/create', createCategoryHandler);
router.patch('/update/:categoryId', updateCategoryHandler);
router.delete('/delete/:categoryId', deleteCategoryHandler);

export default router;
