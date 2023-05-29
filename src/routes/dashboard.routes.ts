import { Router } from 'express';
import { productQuery } from '../http/controllers/Dashboard/DashboardController';

const router = Router();

router.get('/api/v1/dashboard/product', productQuery);

export default router;
