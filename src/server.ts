import cors from 'cors';
import express from 'express';
import cron from 'node-cron';

import CronService from './app/services/CronService';
import routes from './routes';

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

cron.schedule('0 1 * * *', CronService.saveIssues,
  {
    scheduled: true,
    timezone: "America/Sao_Paulo"
  });

app.listen(PORT);
