import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authapp from './server/api/routes/Router';
import documentation from './swagger.json';


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const basePath = '/api/v1';
const documentationsUrl = 'https://free-mentors-app.herokuapp.com/api/v1/documentation/';


app.use(basePath, authapp);

app.use(`${basePath}/documentation`, swaggerUi.serve, swaggerUi.setup(documentation));

app.get('**', (request, response) => response.status(200).send({
  status: 200,
  message : 'Hey !! You are Welcome to API version 1 of Free-Menotrs Now The Server Connetion is Live, go with this link below it all about how to use it',
  documentation : `For the documentaion visit this link ${documentationsUrl}`,
}));

app.listen(process.env.PORT || 2000,function(){
    console.log('server is running on port 2000');
  });
  export default app;