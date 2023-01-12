import express from 'express';
import {
  createInformationOperatorHandler,
  getAllInformationOperatorHandler,
  getInformationOperatorHandler
} from '../controllers/InformationOperatorController';

import { validateResource } from '../middleware/validateResource';
import { InformationOperatorSchema } from '../validations/InformationOperatorSchema';

import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.get('/getAll', getAllInformationOperatorHandler);
router.get('/:individualId', getInformationOperatorHandler);
router.post(
  '/create',
  validateResource(InformationOperatorSchema.create),
  validateResource(UserSchema.createBidder),
  createInformationOperatorHandler
);
// router.patch('/update/:individualId', updateIndividualHandler);
// router.delete('/delete/:individualId', deleteIndividualHandler);

export default router;
