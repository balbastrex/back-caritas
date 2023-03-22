import { Router } from 'express';
import {
  BeneficiaryOrderHistoryIndex, OrderDelete,
  OrderHistoryIndex,
  OrderIndex,
  OrderShow, OrdersReport,
  OrderStore,
  OrderUpdate,
  OrderUpdateStatus,
} from '../http/controllers/Order/OrderController';

const router = Router();

router.get('/api/v1/order', OrderIndex);
router.post('/api/v1/order', OrderStore);
router.get('/api/v1/order/:id', OrderShow);
router.put('/api/v1/order/:id', OrderUpdate);
router.delete('/api/v1/order/:id', OrderDelete);
router.put('/api/v1/order/:orderId/status/:status', OrderUpdateStatus);
router.get('/api/v1/order-history', OrderHistoryIndex);
router.get('/api/v1/order-history/:beneficiaryId', BeneficiaryOrderHistoryIndex);
router.post('/api/v1/order-report', OrdersReport);

export default router;
