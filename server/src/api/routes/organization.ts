import express from 'express';
import { createSellerHandler, getAllHandler, getSellerByIdHandler, getSellerHandler } from '../controllers/OrganizationController';
import { validateResource } from '../middleware/validateResource';
import { IndividualSchema } from '../validations/IndividualSchema';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();
import multer from 'multer';
import { OrganizationSchema } from '../validations/OrganizationSchema';

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
  validateResource(OrganizationSchema.create),
  validateResource(IndividualSchema.create),
  validateResource(UserSchema.createBidder),
  createSellerHandler
);
router.get('/seller', getSellerHandler);
router.get('/getAll', getAllHandler);
router.get('/getById/:idIndividual', getSellerByIdHandler);
export default router;
