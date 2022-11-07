import { Router } from 'express';
import { EducationTypeIndex } from '../http/controllers/EducationType/EducationTypeController';

const router = Router();

router.get('/api/v1/educationType', EducationTypeIndex);

export default router;
