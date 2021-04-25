import express from 'express';
import cors from 'cors';

import routes from './routes';
import swaggerUi from 'swagger-ui-express'


import swaggerJsDoc from 'swagger-jsdoc';

import * as swaggerDocument from './swagger.json';

const options ={definition: {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "LibQuality API",
    description: "LibQuality is an application whose main goal is to measure the quality of famous open source projects."
  }
}, apis: ['./routes.ts']}

const PORT = 3333;

const app = express();


const specs = swaggerJsDoc(options);


app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(routes);
app.use(cors());

app.listen(PORT);
