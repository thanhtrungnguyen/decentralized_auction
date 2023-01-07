import express from 'express';
import { defaultConfig } from '../../config/default';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controllers/AuthController';
import { checkPermission } from '../middleware/checkPermission';
import { requireUser } from '../middleware/requireUser';
import { validateResource } from '../middleware/validateResource';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.post('/', validateResource(UserSchema.login), createUserSessionHandler);
router.get('/', requireUser, getUserSessionHandler);
router.delete('/', requireUser, deleteSessionHandler);
// check authorization
router.get('/admin', requireUser, checkPermission(defaultConfig.role.admin), getUserSessionHandler);
router.get('/manager', requireUser, checkPermission(defaultConfig.role.manager), getUserSessionHandler);
router.get('/seller', requireUser, checkPermission(defaultConfig.role.seller), getUserSessionHandler);
router.get('/bidder', requireUser, checkPermission(defaultConfig.role.bidder), getUserSessionHandler);
export default router;
