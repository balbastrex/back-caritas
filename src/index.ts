import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import { createConnections } from 'typeorm';

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

app.post('/api/v1/login', () => console.log('test endpoint'));

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
