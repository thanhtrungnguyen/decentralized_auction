import express from 'express';
import { roles } from '../../config/roles';
import {
  createInformationOperatorHandler,
  getAllInformationOperatorHandler,
  getInformationOperatorByUserIdHandler,
  getInformationOperatorHandler,
  updateInformationOperatorHandler
} from '../controllers/InformationOperatorController';
import { requireRole } from '../middleware/requireRole';

import { validateResource } from '../middleware/validateResource';
import { InformationOperatorSchema } from '../validations/InformationOperatorSchema';

import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.get('/getAll', requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER), getAllInformationOperatorHandler);
router.get('/:individualId', requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER), getInformationOperatorHandler);
router.get('/getByUserId/:id', requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER), getInformationOperatorByUserIdHandler);
router.post(
  '/create',
  requireRole(roles.ADMIN),
  validateResource(InformationOperatorSchema.create),
  validateResource(UserSchema.create),
  createInformationOperatorHandler
);
router.patch(
  '/update/:id',
  validateResource(InformationOperatorSchema.update),
  requireRole(roles.ADMIN, roles.MANAGER),
  // validateResource(UserSchema.createBidder),
  updateInformationOperatorHandler
);
// router.delete('/delete/:individualId', deleteIndividualHandler);

export default router;
