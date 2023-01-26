import express from 'express';
import {
  createInformationOperatorHandler,
  getAllInformationOperatorHandler,
  getInformationOperatorByUserIdHandler,
  getInformationOperatorHandler,
  updateInformationOperatorHandler
} from '../controllers/InformationOperatorController';

import { validateResource } from '../middleware/validateResource';
import { InformationOperatorSchema } from '../validations/InformationOperatorSchema';

import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.get('/getAll', getAllInformationOperatorHandler);
router.get('/:individualId', getInformationOperatorHandler);
router.get('/getByUserId/:id', getInformationOperatorByUserIdHandler);
router.post(
  '/create',
  validateResource(InformationOperatorSchema.create),
  validateResource(UserSchema.createBidder),
  createInformationOperatorHandler
);
router.patch(
  '/update/:id',
  validateResource(InformationOperatorSchema.update),
  // validateResource(UserSchema.createBidder),
  updateInformationOperatorHandler
);
// router.delete('/delete/:individualId', deleteIndividualHandler);

export default router;
