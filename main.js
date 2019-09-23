import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authapp from './server/api/routes/Router';
import documentation from './swagger.json';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const basePath = '/api/v1';
const redirection = 'now you can get starting with app by signup via /api/v1/signup/ or signin via /api/v1/signin/';

app.use(basePath, authapp);

app.use(`${basePath}/documentation`, swaggerUi.serve, swaggerUi.setup(documentation));

app.get('**', (request, response) => response.status(200).send({
  status: 200,
  message: 'Hey !! You are Welcome to API version 1 of Free-Menotrs Now The Server Connetion is Live',
  redirection,
}));





module.exports = app;
