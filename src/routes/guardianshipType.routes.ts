import { Router } from 'express';
import { GuardianshipTypeIndex } from '../http/controllers/GuardianshipType/guardianshipTypeController';

const router = Router();

router.get('/api/v1/guardianshipType', GuardianshipTypeIndex);

export default router;
