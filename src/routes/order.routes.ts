import { Router } from 'express';
import {
  BeneficiaryOrderHistoryIndex, OrderCloseCartReport, OrderDelete,
  OrderHistoryIndex,
  OrderIndex,
  OrderShow, OrdersReport,
  OrderStore,
  OrderUpdate,
  OrderUpdateStatus,
  ProductsReport,
} from '../http/controllers/Order/OrderController';

const router = Router();

router.get('/api/v1/order', OrderIndex);
router.get('/api/v1/order/close-cart', OrderCloseCartReport);
router.post('/api/v1/order', OrderStore);
router.get('/api/v1/order/:id', OrderShow);
router.put('/api/v1/order/:id', OrderUpdate);
router.delete('/api/v1/order/:id', OrderDelete);
router.put('/api/v1/order/:orderId/status/:status', OrderUpdateStatus);
router.get('/api/v1/order-history', OrderHistoryIndex);
router.get('/api/v1/order-history/:beneficiaryId', BeneficiaryOrderHistoryIndex);
router.post('/api/v1/order-report', OrdersReport);
router.post('/api/v1/product-report', ProductsReport);

export default router;
