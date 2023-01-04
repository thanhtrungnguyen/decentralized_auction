import express from 'express';
import {
  getAllRepresentativesHandler,
  getRepresentativeByIdHandler,
  createRepresentativeHandler,
  updateRepresentativeHandler,
  deleteRepresentativeHandler
} from '../controllers/RepresentativeController';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/representatives', getAllRepresentativesHandler);
router.get('/:representativeId', getRepresentativeByIdHandler);
router.post('/create', createRepresentativeHandler);
router.patch('/update/:representativeId', updateRepresentativeHandler);
router.delete('/delete/:representativeId', deleteRepresentativeHandler);

export default router;
