import { Router } from 'express';
import { ParishIndex } from '../http/controllers/Parish/parishController';

const router = Router();

router.get('/api/v1/parish', ParishIndex);
// router.get('/api/v1/market/:id', MarketShow);
// router.get('/api/v1/market/:id/parish', ParishesMarketIndex);
// router.get('/api/v1/market/:id/product', ProductsMarketIndex);
// router.put('/api/v1/market/:id', MarketUpdate);

export default router;
