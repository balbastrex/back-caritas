import { Router } from 'express';
import {
  ParishOrdersReport,
  ReceiptIndex,
  ReceiptShow,
  ReceiptStore,
  ReceiptUpdate,
} from '../http/controllers/Receipt/ReceiptController';

const router = Router();

router.get('/api/v1/receipt', ReceiptIndex);
router.get('/api/v1/receipt/:id', ReceiptShow);
router.post('/api/v1/receipt', ReceiptStore);
router.put('/api/v1/receipt/:id', ReceiptUpdate);
router.post('/api/v1/receipt/parish-report', ParishOrdersReport);

export default router;
