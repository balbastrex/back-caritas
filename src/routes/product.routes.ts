import { Router } from 'express';
import { ProductCreate, ProductIndex, ProductShow, ProductUpdate } from '../http/controllers/Product/ProductController';

const router = Router();

router.get('/api/v1/product', ProductIndex);
router.get('/api/v1/product/:id', ProductShow);
router.put('/api/v1/product/:id', ProductUpdate);
router.post('/api/v1/product', ProductCreate);

export default router;
