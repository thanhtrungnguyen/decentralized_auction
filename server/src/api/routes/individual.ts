import express from 'express';
import {
  getAllIndividualsHandler,
  getIndividualByIdHandler,
  createIndividualHandler,
  updateIndividualHandler,
  deleteIndividualHandler
} from '../controllers/IndividualController';
import { validateResource } from '../middleware/validateResource';
import { IndividualSchema } from '../validations/IndividualSchema';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();

router.get('/individuals', getAllIndividualsHandler);
router.get('/:individualId', getIndividualByIdHandler);
router.post('/create', validateResource(IndividualSchema.create), validateResource(UserSchema.createBidder), createIndividualHandler);
router.patch('/update/:individualId', updateIndividualHandler);
router.delete('/delete/:individualId', deleteIndividualHandler);

export default router;
