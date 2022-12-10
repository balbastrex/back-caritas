import { Router } from 'express';
import {
  ProviderIndex,
  ProviderShow,
  ProviderStore,
  ProviderUpdate,
} from '../http/controllers/Provider/ProviderController';

const router = Router();

router.get('/api/v1/provider', ProviderIndex);
router.post('/api/v1/provider', ProviderStore);
router.get('/api/v1/provider/:id', ProviderShow);
router.put('/api/v1/provider/:id', ProviderUpdate);


export default router;
