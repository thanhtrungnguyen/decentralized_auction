import express from 'express';
import propertyRoutes from './property';
import auctionRoutes from './auction';
import categoryRoutes from './category';
import newsRoutes from './news';
import userRoutes from './user';

const router = express.Router();

router.use('/property', propertyRoutes);
router.use('/auction', auctionRoutes);
router.use('/category', categoryRoutes);
router.use('/news', newsRoutes);
router.use('/user', userRoutes);

export default router;
