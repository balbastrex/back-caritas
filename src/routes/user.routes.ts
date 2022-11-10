import { Router } from 'express';
import { UserIndex } from '../http/controllers/User/userController';

const router = Router();

router.get('/api/v1/user', UserIndex);

export default router;
