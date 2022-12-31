import express from 'express';
import propertyRoutes from './property';

const router = express.Router();

router.use('/property', propertyRoutes);

export default router;
