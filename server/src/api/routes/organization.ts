import express from 'express';
import { createSellerHandler } from '../controllers/OrganizationController';
import { validateResource } from '../middleware/validateResource';
import { IndividualSchema } from '../validations/IndividualSchema';
import { UserSchema } from '../validations/UserSchema';
const router = express.Router();
router.post('/create', validateResource(IndividualSchema.create), validateResource(UserSchema.createBidder), createSellerHandler);
export default router;
