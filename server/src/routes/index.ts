import { Router } from 'express';
import OrdersRouter from './Orders';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/orders', OrdersRouter);

// Export the base-router
export default router;
