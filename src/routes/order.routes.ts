import { Router } from 'express';
import { OrderIndex } from '../http/controllers/Order/OrderController';

const router = Router();

router.get('/api/v1/order', OrderIndex);

export default router;
