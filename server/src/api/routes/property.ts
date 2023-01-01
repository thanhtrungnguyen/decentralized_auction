import express from 'express';
import {
  getAllPropertiesHandler,
  getPropertyByIdHandler,
  createPropertyHandler,
  updatePropertyHandler,
  deletePropertyHandler
} from '../controllers/PropertyController';
import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/properties', getAllPropertiesHandler);
router.get('/:propertyId', getPropertyByIdHandler);
router.post('/create', ValidateResource(Schema.property.create), createPropertyHandler);
router.patch('/update/:propertyId', updatePropertyHandler);
router.delete('/delete/:propertyId', deletePropertyHandler);

export default router;
