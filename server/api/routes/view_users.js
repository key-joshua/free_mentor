import check_tooken from '../../../check_token';
const config = require('../../../config');
import bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const filesystem = require('fs');
import express from 'express';
const app = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const data = filesystem.readFileSync('database.json');
const users = JSON.parse(data);



app.get(`/users`, /*check_tooken , */ (request,response)=>{

    return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving all users ***", data:users});

});



    
module.exports =app;
