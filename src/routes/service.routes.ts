import { Router } from 'express';
import {
  ServiceCreate,
  ServiceDelete,
  ServiceIndex,
  ServiceUpdate,
} from '../http/controllers/Calendar/ServiceController';

const router = Router();

router.get('/api/v1/service', ServiceIndex);
router.put('/api/v1/service/:id', ServiceUpdate);
router.post('/api/v1/service', ServiceCreate);
router.delete('/api/v1/service/:id', ServiceDelete);

export default router;
