import { Router } from 'express';
import {
  BeneficiariesParishIndex,
  ParishIndex,
  ParishShow, ParishStore,
  ParishUpdate,
} from '../http/controllers/Parish/parishController';

const router = Router();

router.get('/api/v1/parish', ParishIndex);
router.post('/api/v1/parish', ParishStore);
router.get('/api/v1/parish/:id', ParishShow);
router.get('/api/v1/parish/:id/beneficiary', BeneficiariesParishIndex);
router.put('/api/v1/parish/:id', ParishUpdate);

export default router;
