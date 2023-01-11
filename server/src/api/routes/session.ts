import express from 'express';
import { defaultConfig } from '../../config/constant-variables';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controllers/AuthController';
import { requireRole } from '../middleware/requireRole';
import { requireUser } from '../middleware/requireUser';
import { validateResource } from '../middleware/validateResource';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.post('/', validateResource(UserSchema.login), createUserSessionHandler);
router.use(requireUser);
router.get('/', getUserSessionHandler);
router.delete('/', deleteSessionHandler);
// check authorization
router.get('/admin', requireRole(defaultConfig.role.admin), getUserSessionHandler);
router.get('/manager', requireRole(defaultConfig.role.manager), getUserSessionHandler);
router.get('/seller', requireRole(defaultConfig.role.seller), getUserSessionHandler);
router.get('/bidder', requireRole(defaultConfig.role.bidder), getUserSessionHandler);
export default router;
