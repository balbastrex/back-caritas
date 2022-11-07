import { Router } from 'express';
import {
  BeneficiaryIndex,
  BeneficiaryShow,
  BeneficiaryUpdate,
} from '../http/controllers/Beneficiary/beneficiaryController';

const router = Router();

router.get('/api/v1/beneficiary', BeneficiaryIndex);
router.get('/api/v1/beneficiary/:id', BeneficiaryShow);
router.put('/api/v1/beneficiary/:id', BeneficiaryUpdate);

export default router;
