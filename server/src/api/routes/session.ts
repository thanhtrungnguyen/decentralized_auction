import express from 'express';
import { defaultConfig } from '../../config/constant-variables';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controllers/AuthController';
import { requireRole } from '../middleware/requireRole';
import { requireUser } from '../middleware/requireUser';
import { validateResource } from '../middleware/validateResource';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.post('/', validateResource(UserSchema.login), createUserSessionHandler);
router.get('/', requireUser, getUserSessionHandler);
router.delete('/', requireUser, deleteSessionHandler);
// check authorization
router.get('/admin', requireUser, requireRole(defaultConfig.role.admin), getUserSessionHandler);
router.get('/manager', requireUser, requireRole(defaultConfig.role.manager), getUserSessionHandler);
router.get('/seller', requireUser, requireRole(defaultConfig.role.seller), getUserSessionHandler);
router.get('/bidder', requireUser, requireRole(defaultConfig.role.bidder), getUserSessionHandler);
export default router;
