import express from 'express';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controllers/SessionController';
import { requireUser } from '../middleware/requireUser';
import { validateResource } from '../middleware/validateResource';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.post('/', validateResource(UserSchema.login), createUserSessionHandler);
router.get('/', requireUser, getUserSessionHandler);
router.delete('/', requireUser, deleteSessionHandler);

export default router;
