import express from 'express';
import {
  getAllIndividualsHandler,
  getIndividualByIdHandler,
  createIndividualHandler,
  updateIndividualHandler,
  deleteIndividualHandler,
  getIndividualByUserIdHandler
} from '../controllers/IndividualController';
import { validateResource } from '../middleware/validateResource';
import { IndividualSchema } from '../validations/IndividualSchema';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();
import multer from 'multer';
import { requireRole } from '../middleware/requireRole';
import { roles } from '../../config/roles';

const upload = multer({ dest: 'uploads/' });
router.get('/individuals', requireRole(roles.ADMIN, roles.MANAGER), getAllIndividualsHandler);
router.get('/getById/:individualId', requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER), getIndividualByIdHandler);
router.get('/getByUserId/:userId', getIndividualByUserIdHandler);
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
router.patch(
  '/update/:individualId',
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
  requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER),
  updateIndividualHandler
);
router.delete('/delete/:individualId', requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER), deleteIndividualHandler);

export default router;
