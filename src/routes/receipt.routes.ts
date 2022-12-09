import { Router } from 'express';
import {
  OrderIndex,
  OrderShow,
  OrderStore,
  OrderUpdate,
  OrderUpdateStatus,
} from '../http/controllers/Order/OrderController';
import { ReceiptIndex, ReceiptShow, ReceiptStore, ReceiptUpdate } from '../http/controllers/Receipt/ReceiptController';

const router = Router();

router.get('/api/v1/receipt', ReceiptIndex);
router.get('/api/v1/receipt/:id', ReceiptShow);
router.post('/api/v1/receipt', ReceiptStore);
router.put('/api/v1/receipt/:id', ReceiptUpdate);

export default router;
