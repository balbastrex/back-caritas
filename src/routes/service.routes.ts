import { Router } from 'express';
import { ServiceIndex } from '../http/controllers/Calendar/ServiceController';

const router = Router();

router.get('/api/v1/service', ServiceIndex);


export default router;
