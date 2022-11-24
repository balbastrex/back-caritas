import { Router } from 'express';
import {
  OrderIndex,
  OrderShow,
  OrderStore,
  OrderUpdate,
  OrderUpdateStatus,
} from '../http/controllers/Order/OrderController';

const router = Router();

router.get('/api/v1/order', OrderIndex);
router.post('/api/v1/order', OrderStore);
router.get('/api/v1/order/:id', OrderShow);
router.put('/api/v1/order/:id', OrderUpdate);
router.put('/api/v1/order/:orderId/status/:status', OrderUpdateStatus);

export default router;
