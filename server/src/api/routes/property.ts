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
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/properties', getAllPropertiesHandler);
router.get('/:propertyId', getPropertyByIdHandler);
router.post(
  '/create',
  upload.fields([
    {
      name: 'propertyImage1',
      maxCount: 1
    },
    {
      name: 'propertyImage2',
      maxCount: 1
    },
    {
      name: 'propertyImage3',
      maxCount: 1
    },
    {
      name: 'propertyVideo',
      maxCount: 1
    }
  ]),
  validateResource(PropertySchema.create),

  createPropertyHandler
);
router.patch('/update/:propertyId', updatePropertyHandler);
router.delete('/delete/:propertyId', deletePropertyHandler);

export default router;
