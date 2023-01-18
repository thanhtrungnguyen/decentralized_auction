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
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
router.get('/individuals', getAllIndividualsHandler);
router.get('/getById/:individualId', getIndividualByIdHandler);
router.post(
  '/create',
  upload.fields([
    {
      name: 'frontSideImage',
      maxCount: 1
    },
    {
      name: 'backSideImage',
      maxCount: 1
    }
  ]),
  validateResource(IndividualSchema.create),
  validateResource(UserSchema.createBidder),
  createIndividualHandler
);
router.patch('/update/:individualId', updateIndividualHandler);
router.delete('/delete/:individualId', deleteIndividualHandler);

export default router;
