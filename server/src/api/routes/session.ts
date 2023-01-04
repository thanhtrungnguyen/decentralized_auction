import express from 'express';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controllers/SessionController';
const router = express.Router();

router.post('/', createUserSessionHandler);
router.get('/', getUserSessionHandler);
router.delete('/', deleteSessionHandler);

export default router;
