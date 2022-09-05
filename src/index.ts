import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import { createConnections } from 'typeorm';
import Login from './http/controllers/Auth/login';
import verifyToken from './http/middleware/VerifyToken';

import userRoutes from './routes/user.routes';
import marketRoutes from './routes/market.routes';

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

app.use(userRoutes);
app.use(marketRoutes);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
