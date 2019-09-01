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


app.patch('/users/:id', (request, response) => {
    const checkuser = users.find((userId) => userId.id === parseInt(request.params.id, 10));
    const userid = request.params.id;
    if (!checkuser) {
      return response.status(404).send({ status: 404, message: `${'Hey !! This user with id' + ' '}${userid} ` + 'does not exist' });
    }
    const update_body = {
      id: checkuser.id,
      category: request.body.category,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      address: request.body.address,
      bio: request.body.bio,
      occupation: request.body.occupation,
      expertise: request.body.expertise,
      password: request.body.password,
      confirm_password: request.body.confirm_password,
  
    };

      const allowed_category = "user";
      const Name_to_display = update_body.firstName;
      const Email_to_check = update_body.email;

     
    
      const insert = users.some((el) => el.email === Email_to_check );
      if (insert) {
        return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'has already exist' });
      }

      else if (userid!==checkuser.id) {
        return response.status(401).send({ status: 401, message: `Hey !! You can not Change This ' + '${userid} `});
      }

      else if (update_body.category!==allowed_category) {
        return response.status(400).send({ status: 400, message: `Hey !! allowed category is user` });
      }

      else if (!Name_to_display) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert firstname` });
      }else if (!update_body.lastName) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert lastname` });
      } else if (!update_body.email) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert email` });
      } else if (!update_body.expertise) {
        return response.status(400).send({ status: 400, message: `Hey !! select what expertise` });
      } else if (!update_body.password) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert password` });
      } 
    
        const target_user = users.indexOf(checkuser);
        users.splice(target_user, 1, update_body);
        response.status(200).send({ status: 200, message: `${'Hey !! User with id' + ' '}${userid} ` + 'has updated Successfully', data: newUser }); 

        
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


 