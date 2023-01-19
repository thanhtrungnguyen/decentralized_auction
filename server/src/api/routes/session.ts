import express from 'express';
import { roles } from '../../config/roles';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controllers/AuthController';
import { requireRole } from '../middleware/requireRole';
import { validateResource } from '../middleware/validateResource';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.post('/', validateResource(UserSchema.login), createUserSessionHandler);
router.get('/', getUserSessionHandler);
router.delete('/', deleteSessionHandler);
// check authorization
router.get('/admin', requireRole(roles.ADMIN), getUserSessionHandler);
router.get('/manager', requireRole(roles.MANAGER, roles.MANAGER), getUserSessionHandler);
router.get('/seller', requireRole(roles.SELLER), getUserSessionHandler);
router.get('/bidder', requireRole(roles.BIDDER), getUserSessionHandler);
export default router;
