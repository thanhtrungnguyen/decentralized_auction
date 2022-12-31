import express from 'express';
import {
  getAllPropertiesHandler,
  getPropertyByIdHandler,
  createPropertyHandler,
  updatePropertyHandler,
  deletePropertyHandler
} from '../controllers/PropertyController';
const router = express.Router();

router.get('/properties', getAllPropertiesHandler);
router.get('/:propertyId', getPropertyByIdHandler);
router.post('/create', createPropertyHandler);
router.put('/update/:propertyId', updatePropertyHandler);
router.delete('/delete/:propertyId', deletePropertyHandler);

export default router;
