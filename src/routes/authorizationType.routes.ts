import { Router } from 'express';
import { AuthorizationTypeIndex } from '../http/controllers/AuthorizationType/authorizationTypeController';

const router = Router();

router.get('/api/v1/authorizationType', AuthorizationTypeIndex);

export default router;
