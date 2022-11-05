import { Router } from 'express';
import { TurnShow } from '../http/controllers/Turn/TurnController';

const router = Router();

router.get('/api/v1/parish/:id/turn', TurnShow);

export default router;
