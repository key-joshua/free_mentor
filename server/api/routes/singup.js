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



app.post(`/auth/signup`, function(request, response) {
    
    var token = jwt.sign({id:users.id},config.secret,{expiresIn:86400});
    const newUser = {
        id: users.length + 1,
        category: 'user',
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        address: request.body.address,
        bio: request.body.bio,
        occupation: request.body.occupation,
        expertise: request.body.expertise,
        password: request.body.password,
        confirm_password: request.body.confirm_password,
        token:token, 
        message: `Hey !!  ${request.body.firstName} your account has created successfully`,

      };

      const allowed_category = "user";
      const Name_to_display = newUser.firstName;
      const Email_to_check = newUser.email;

     
    
      const insert = users.some((el) => el.email === Email_to_check );
      if (insert) {
        return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'has already exist' });
      }

      else if (newUser.category!==allowed_category) {
        return response.status(400).send({ status: 400, message: `Hey !! allowed category is user` });
      }

      else if (!Name_to_display) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert firstname` });
      }else if (!newUser.lastName) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert lastname` });
      } else if (!newUser.email) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert email` });
      } else if (!newUser.expertise) {
        return response.status(400).send({ status: 400, message: `Hey !! select what expertise` });
      } else if (!newUser.password) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert password` });
      } 
    
        users.push(newUser);
        console.log(users);
        response.status(201).send({ status: 201, message: `${'Hey !! this  User' + ' '}${Name_to_display} ` + ' has created successfully', data: newUser }); 

        
        var changeddata = JSON.stringify(users, null, 2);
        filesystem.writeFile('database.json',changeddata,(error)=>{
            if (error) {
                console.log(error); 
            }
    
            else{
                console.log("User created successfully and Now data is recorded to the Data Structure");
            }
        });
    });


    
module.exports =app;
