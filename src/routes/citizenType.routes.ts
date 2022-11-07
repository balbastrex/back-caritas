import { Router } from 'express';
import { CitizenTypeIndex } from '../http/controllers/CitizenType/citizenTypeController';
import { CountryIndex } from '../http/controllers/Country/countryController';
import { FamilyTypeIndex } from '../http/controllers/FamilyType/familyTypeController';

const router = Router();

router.get('/api/v1/citizenType', CitizenTypeIndex);

export default router;
