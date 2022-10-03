import { Router } from 'express';
import {
  MarketIndex,
  MarketShow, MarketUpdate, ParishesMarketIndex, ProductsMarketIndex,
} from '../http/controllers/Market/marketController';

const router = Router();

router.get('/api/v1/market', MarketIndex);
router.get('/api/v1/market/:id', MarketShow);
router.put('/api/v1/market/:id', MarketUpdate);
router.get('/api/v1/market/:id/parish', ParishesMarketIndex);
router.get('/api/v1/market/:id/product', ProductsMarketIndex);

export default router;
