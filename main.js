import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import authapp from './server/api/routes/Router';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const affix = '/api/v1';
app.get(affix,(request,response)=>{
    return response.status(200).send({status: 200, message:"Hey !! You are Welcome to API version 1 of Free-Menotrs Now The Server Connetion is Live "});
});
app.use(affix, authapp);
app.use((problem_to_fix,request,response,next)=>{
    return response.status(500).json({
        status:500,
        message:`Hy!! Something wrong like those below is occured on server.... `,
        error : problem_to_fix
    });
});

    
module.exports =app;