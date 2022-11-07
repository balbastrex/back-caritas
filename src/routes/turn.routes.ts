import { Router } from 'express';
import { TurnShow } from '../http/controllers/Turn/TurnController';

const router = Router();

router.get('/api/v1/turn', TurnShow);

export default router;
