import { Router } from 'express';
import { ProviderIndex } from '../http/controllers/Provider/ProviderController';
import { TurnByMarketId, TurnIndex, TurnShow, TurnStore, TurnUpdate } from '../http/controllers/Turn/TurnController';

const router = Router();

router.get('/api/v1/provider', ProviderIndex);


export default router;
