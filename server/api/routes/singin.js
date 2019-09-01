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


app.post(`/auth/signin`, function(request, response) {

    var hidepassword = bcrypt.hashSync(request.body.password, 8);
    var token = jwt.sign({id:users.id},config.secret,{expiresIn:86400});

    const signuser = {
        
        category: request.body.category,
        email: request.body.email,
        password: request.body.password,
        token:token, 
        
    
      };

     
      const Name_to_display = users.firstName;
      const allowed_category = signuser.category
      const Email_to_check = signuser.email;
      const password_to_check = signuser.password;

     if (!signuser.category) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert Category` });
      } else if (!signuser.email) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert Email` });
      } else if (!signuser.password) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert password` });
      } 
    
      
      const checkinsertedcategory = users.some((el) => el.category === allowed_category );
      const checkinsertedemail = users.some((el) => el.email === Email_to_check );
      const checkinsertedpassword = users.some((el) => el.password === password_to_check );


     if (!checkinsertedcategory) {
        return response.status(401).send({ status: 401, message: `${'Hey !! This Category of' + ' '}${allowed_category} ` + 'does not belomg to your account' });
      }

      else if (!checkinsertedemail) {
        return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'does not exist' });
      }

      else if (!checkinsertedpassword) {
        return response.status(401).send({ status: 401, message: `Hey !! This password is incorrect` });
      }
      
        console.log(signuser);
        response.status(200).send({status: 200, message: `${'Hey !!' + ' '}${Name_to_display} ` + ' You are logged in successfully ', data:signuser }); 


    });


    
module.exports =app;
