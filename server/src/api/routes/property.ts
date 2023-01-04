import express from 'express';
import {
  getAllPropertiesHandler,
  getPropertyByIdHandler,
  createPropertyHandler,
  updatePropertyHandler,
  deletePropertyHandler
} from '../controllers/PropertyController';
import { validateResource } from '../middleware/validateResource';
import { PropertySchema } from '../validations/PropertySchema';
const router = express.Router();

router.get('/properties', getAllPropertiesHandler);
router.get('/:propertyId', getPropertyByIdHandler);
router.post('/create', validateResource(PropertySchema.create), createPropertyHandler);
router.patch('/update/:propertyId', updatePropertyHandler);
router.delete('/delete/:propertyId', deletePropertyHandler);

export default router;
