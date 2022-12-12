import { Router } from 'express';
import {
  ParishesMarketSelector,
  UserIndex,
  UserRolesIndex, UserShow,
  UserStore,
  UserUpdate,
} from '../http/controllers/User/userController';

const router = Router();

router.get('/api/v1/user', UserIndex);
router.get('/api/v1/role', UserRolesIndex);
router.get('/api/v1/user/parish', ParishesMarketSelector);
router.post('/api/v1/user', UserStore);
router.put('/api/v1/user/:id', UserUpdate);
router.get('/api/v1/user/:id', UserShow);

export default router;
