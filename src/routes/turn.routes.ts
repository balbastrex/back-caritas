import { Router } from 'express';
import { TurnByMarketId, TurnIndex, TurnShow, TurnStore, TurnUpdate } from '../http/controllers/Turn/TurnController';

const router = Router();

router.get('/api/v1/turn', TurnIndex);
router.get('/api/v1/turn/market', TurnByMarketId);
router.get('/api/v1/turn/:id', TurnShow);
router.put('/api/v1/turn/:id', TurnUpdate);
router.post('/api/v1/turn', TurnStore);


export default router;
