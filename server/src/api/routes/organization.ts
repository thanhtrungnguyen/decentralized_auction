import express from 'express';
import {
  createHandler,
  getAllHandler,
  getByUserIdHandler,
  getSellerByIdHandler,
  getSellerHandler,
  updateBidderHandler,
  updateHandler
} from '../controllers/OrganizationController';
import { validateResource } from '../middleware/validateResource';
import { IndividualSchema } from '../validations/IndividualSchema';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();
import multer from 'multer';
import { OrganizationSchema } from '../validations/OrganizationSchema';
import { requireRole } from '../middleware/requireRole';
import { roles } from '../../config/roles';

const upload = multer({ dest: 'uploads/' });
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
  requireRole(roles.ADMIN, roles.BIDDER),
  validateResource(OrganizationSchema.create),
  validateResource(IndividualSchema.create),
  validateResource(UserSchema.createBidder),
  createHandler
);

router.use(requireRole(roles.SELLER));
router.patch(
  '/update/:id',
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
  requireRole(roles.ADMIN, roles.BIDDER),
  validateResource(OrganizationSchema.update),
  validateResource(IndividualSchema.create),
  updateHandler
);
router.patch(
  '/update/bidder/:id',
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
  // validateResource(OrganizationSchema.create),
  // validateResource(IndividualSchema.create),
  updateBidderHandler
);
router.get('/seller', requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER), getSellerHandler);
router.get('/getAll', requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER), getAllHandler);
router.get('/getById/:idIndividual', requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER), getSellerByIdHandler);
router.get('/getByUserId/:userId', requireRole(roles.BIDDER), getByUserIdHandler);

export default router;
