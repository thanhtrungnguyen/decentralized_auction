import express from 'express';
import { roles } from '../../config/roles';
import {
  getAllRepresentativesHandler,
  getRepresentativeByIdHandler,
  createRepresentativeHandler,
  updateRepresentativeHandler,
  deleteRepresentativeHandler
} from '../controllers/RepresentativeController';
import { requireRole } from '../middleware/requireRole';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/representatives', requireRole(roles.ADMIN), getAllRepresentativesHandler);
router.get('/:representativeId', requireRole(roles.ADMIN), getRepresentativeByIdHandler);
router.post('/create', createRepresentativeHandler);
router.patch('/update/:representativeId', requireRole(roles.ADMIN, roles.BIDDER, roles.SELLER), updateRepresentativeHandler);
router.delete('/delete/:representativeId', requireRole(roles.ADMIN), deleteRepresentativeHandler);

export default router;
