import express from 'express';

import sessionRoutes from './session';
import propertyRoutes from './property';
import auctionRoutes from './auction';
import categoryRoutes from './category';
import newsRoutes from './news';
import userRoutes from './user';
import individualRoutes from './individual';
import representativeRoutes from './representative';

const router = express.Router();

router.use('/session', sessionRoutes);
router.use('/property', propertyRoutes);
router.use('/auction', auctionRoutes);
router.use('/category', categoryRoutes);
router.use('/news', newsRoutes);
router.use('/user', userRoutes);
router.use('/individual', individualRoutes);
router.use('/representative', representativeRoutes);

export default router;
