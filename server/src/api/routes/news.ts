import express from 'express';
import { getAllNewsHandler, getNewsByIdHandler, createNewsHandler, updateNewsHandler, deleteNewsHandler } from '../controllers/NewsController';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/news', getAllNewsHandler);
router.get('/:newsId', getNewsByIdHandler);
router.post('/create', createNewsHandler);
router.patch('/update/:newsId', updateNewsHandler);
router.delete('/delete/:newsId', deleteNewsHandler);

export default router;
