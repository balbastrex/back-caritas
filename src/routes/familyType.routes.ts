import { Router } from 'express';
import { FamilyTypeIndex } from '../http/controllers/FamilyType/familyTypeController';

const router = Router();

router.get('/api/v1/familyType', FamilyTypeIndex);

export default router;
