import { Router } from 'express';
import { CivilStateTypeIndex } from '../http/controllers/CivilStateType/civilStateTypeController';

const router = Router();

router.get('/api/v1/civilStateType', CivilStateTypeIndex);

export default router;
