import express from 'express';
const app =express();


const affix = '/api/v1';

const signupsRoute = require('./server/api/routes/singup');
const usersigninsRoute = require('./server/api/routes/singin');
const view_usersRoute = require('./server/api/routes/view_users');
const update_usersRoute = require('./server/api/routes/update_users');

const usersRoute = require('./server/api/routes/users');
const mentorsigninsRoute = require('./server/api/routes/mentors');
const mentorshipsessionRoute = require('./server/api/routes/sessions');



app.get(`${affix}`,(request,response)=>{

    return response.status(200).send({status: 200, message:"Hey !! You are Welcome to API version 1 of Free-Menotrs Now The Server Connetion is Live "});

});

app.use(`${affix}`, /*view_usersRoute,signupsRoute,signinsRoute,update_usersRoute, */ usersRoute, mentorsigninsRoute, mentorshipsessionRoute);

    
module.exports =app;