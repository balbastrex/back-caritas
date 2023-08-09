import { Router } from 'express';
import {
  BeneficiariesByAge,
  memoryPeriod,
  ParishWeekReport,
  WeekReport
} from '../http/controllers/Report/ReportController';

const router = Router();

router.post('/api/v1/report/memory-period', memoryPeriod);
router.get('/api/v1/report/beneficiaries-age-report', BeneficiariesByAge);
router.get('/api/v1/report/week', WeekReport);
router.get('/api/v1/report/parish-week', ParishWeekReport);

export default router;
