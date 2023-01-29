import express from 'express';
import {
  getAllNewsHandler,
  getNewsByIdHandler,
  createNewsHandler,
  updateNewsHandler,
  deleteNewsHandler,
  changeStatusNewsHandler
} from '../controllers/NewsController';
import { validateResource } from '../middleware/validateResource';
import { NewsSchema } from '../validations/NewsSchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();
import multer from 'multer';
import { requireRole } from '../middleware/requireRole';
import { defaultConfig } from '../../config/constant-variables';
import { roles } from '../../config/roles';

const upload = multer({ dest: 'uploads/' });
router.get('/news/:index/:status/:search', getAllNewsHandler);
router.get('/:newsId', getNewsByIdHandler);
router.use(requireRole(roles.ADMIN));
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
router.patch(
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
router.put('/changeStatus/:newsId', changeStatusNewsHandler);
router.delete('/delete/:newsId', deleteNewsHandler);

export default router;
