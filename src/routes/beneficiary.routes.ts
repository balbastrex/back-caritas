import { Router } from 'express';
import {
  BeneficiaryByTurn,
  BeneficiaryIndex,
  BeneficiaryIndexIdName,
  BeneficiaryShow,
  BeneficiaryStore,
  BeneficiaryUpdate,
  IndexBeneficiaryNotes,
} from '../http/controllers/Beneficiary/beneficiaryController';

const router = Router();

router.get('/api/v1/beneficiary', BeneficiaryIndex);
router.post('/api/v1/beneficiary', BeneficiaryStore);
router.get('/api/v1/beneficiary-selector', BeneficiaryIndexIdName);
router.get('/api/v1/beneficiary-turn/:id', BeneficiaryByTurn);
router.get('/api/v1/beneficiary/:id', BeneficiaryShow);
router.put('/api/v1/beneficiary/:id', BeneficiaryUpdate);
router.get('/api/v1/beneficiary/:id/notes', IndexBeneficiaryNotes);

export default router;
