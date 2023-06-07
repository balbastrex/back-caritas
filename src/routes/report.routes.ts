import { Router } from 'express';
import { memoryPeriod } from '../http/controllers/Report/ReportController';

const router = Router();

router.get('/api/v1/report/memory-period', memoryPeriod);

export default router;
