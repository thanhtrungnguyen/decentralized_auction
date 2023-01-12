import express from 'express';
import { getAllNewsHandler, getNewsByIdHandler, createNewsHandler, updateNewsHandler, deleteNewsHandler } from '../controllers/NewsController';
import { validateResource } from '../middleware/validateResource';
import { NewsSchema } from '../validations/NewsSchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();
import multer from 'multer';
import { requireRole } from '../middleware/requireRole';
import { defaultConfig } from '../../config/constant-variables';

const upload = multer({ dest: 'uploads/' });

router.use(requireRole('admin'));
router.get('/news/:index/:status/:search', getAllNewsHandler);
router.get('/:newsId', getNewsByIdHandler);
router.post(
  '/create',
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1
    }
  ]),
  validateResource(NewsSchema.create),
  createNewsHandler
);
router.put(
  '/update/:newsId',
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1
    }
  ]),
  validateResource(NewsSchema.update),
  updateNewsHandler
);
router.delete('/delete/:newsId', deleteNewsHandler);

export default router;
