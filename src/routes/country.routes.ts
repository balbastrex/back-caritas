import { Router } from 'express';
import { CountryIndex } from '../http/controllers/Country/countryController';

const router = Router();

router.get('/api/v1/country', CountryIndex);

export default router;
