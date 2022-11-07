import { Router } from 'express';
import { EmploymentTypeIndex } from '../http/controllers/EmploymentType/EmploymentTypeController';

const router = Router();

router.get('/api/v1/employmentType', EmploymentTypeIndex);

export default router;
