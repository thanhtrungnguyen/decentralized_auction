import express from 'express';
import { getAllNewsHandler, getNewsByIdHandler, createNewsHandler, updateNewsHandler, deleteNewsHandler } from '../controllers/NewsController';
import { validateResource } from '../middleware/validateResource';
import { NewsSchema } from '../validations/NewsSchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/news', getAllNewsHandler);
router.get('/:newsId', getNewsByIdHandler);
router.post('/create', validateResource(NewsSchema.create), createNewsHandler);
router.patch('/update/:newsId', validateResource(NewsSchema.update), updateNewsHandler);
router.delete('/delete/:newsId', deleteNewsHandler);

export default router;
