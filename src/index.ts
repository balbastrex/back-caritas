import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import { createConnections } from 'typeorm';
import Login from './http/controllers/Auth/login';
import beneficiaryGeneralPolicy from './http/middleware/policies/BeneficiaryPolicies/BeneficiaryGeneralPolicy';
import beneficiaryParamPolicies from './http/middleware/policies/BeneficiaryPolicies/BeneficiaryParamPolicies';
import marketGeneralPolicy from './http/middleware/policies/MarketPolicies/MarketGeneralPolicy';
import marketParamPolicies from './http/middleware/policies/MarketPolicies/MarketParamPolicies';
import parishGeneralPolicy from './http/middleware/policies/ParishPolicies/ParishGeneralPolicy';
import parishParamPolicies from './http/middleware/policies/ParishPolicies/ParishParamPolicies';
import productGeneralPolicy from './http/middleware/policies/ProductPolicies/ProductGeneralPolicy';
import serviceGeneralPolicy from './http/middleware/policies/ServicePolicies/ServiceGeneralPolicy';
import serviceParamPolicies from './http/middleware/policies/ServicePolicies/ServiceParamPolicies';
import turnGeneralPolicy from './http/middleware/policies/TurnPolicies/TurnGeneralPolicy';
import turnParamPolicies from './http/middleware/policies/TurnPolicies/TurnParamPolicies';
import verifyToken from './http/middleware/VerifyToken';

import userRoutes from './routes/user.routes';
import marketRoutes from './routes/market.routes';
import parishRoutes from './routes/parish.routes';
import beneficiaryRoutes from './routes/beneficiary.routes';
import countryRoutes from './routes/country.routes';
import familyTypeRoutes from './routes/familyType.routes';
import citizenTypeRoutes from './routes/citizenType.routes';
import civilStateTypeRoutes from './routes/civilStateType.routes';
import employmentTypeRoutes from './routes/employmentType.routes';
import guardianshipTypeRoutes from './routes/guardianshipType.routes';
import educationTypeRoutes from './routes/educationType.routes';
import authorizationTypeRoutes from './routes/authorizationType.routes';
import turnRoutes from './routes/turn.routes';
import productRoutes from './routes/product.routes';
import serviceRoutes from './routes/service.routes';
import orderRoutes from './routes/order.routes';

dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

createConnections().then(connection => {
  console.log('Connection ready ->', connection[0].name);


}).catch(error => {
  console.log('Connection error -> ', error);
});

app.post('/api/v1/login', Login);

app.use('/api/v1/', verifyToken);

app.use('/api/v1/market', marketGeneralPolicy);
app.use('/api/v1/market/:id', marketParamPolicies);

app.use('/api/v1/parish', parishGeneralPolicy);
app.use('/api/v1/parish/:id', parishParamPolicies);

app.use('/api/v1/beneficiary', beneficiaryGeneralPolicy);
app.use('/api/v1/beneficiary/:id', beneficiaryParamPolicies);

app.use('/api/v1/product', productGeneralPolicy);

app.use('/api/v1/turn', turnGeneralPolicy);
app.use('/api/v1/turn/:id', turnParamPolicies);

app.use('/api/v1/service', serviceGeneralPolicy);
app.use('/api/v1/service/:id', serviceParamPolicies);

app.use(userRoutes);
app.use(marketRoutes);
app.use(parishRoutes);
app.use(parishRoutes);
app.use(beneficiaryRoutes);
app.use(countryRoutes);
app.use(familyTypeRoutes);
app.use(citizenTypeRoutes);
app.use(civilStateTypeRoutes);
app.use(employmentTypeRoutes);
app.use(guardianshipTypeRoutes);
app.use(educationTypeRoutes);
app.use(authorizationTypeRoutes);
app.use(turnRoutes);
app.use(productRoutes);
app.use(serviceRoutes);
app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
