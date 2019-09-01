import check_tooken from '../../../check_token';
const config = require('../../../config');
import bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');
const filesystem = require('fs');
import express from 'express';
const app = express.Router();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


var mentors = require('./mentors');
const users = [

    {
        id: 1,
        category: 'admin',
        firstName: 'joshua',
        lastName: 'Minani',
        email: 'k.joshua855@gmail.com',
        address: 'Nairobi/kenya',
        bio: 'Youtuber ',
        occupation: 'employee',
        expertise: 'I.T',
        password: 'qwerty',
        confirm_password: 'qwerty',
      },
      {
      id: 2,
      category: 'user',
      firstName: 'samuel',
      lastName: 'kayigamba',
      email: 'k.samuel@gmai.com',
      address: 'Kigali/Rwanda',
      bio: 'standup comedy',
      occupation: 'learner',
      expertise: 'mechanical',
      password: 'qwerty',
      confirm_password: 'qwerty',
    }
  ];




//#############################################################################        Working Properly

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
        response.status(201).send({ status: 201, message: `${'Hey !! ' + ' '}${Name_to_display} ` + ' you  successfully created account', data: newUser }); 

        
    
    });


//#############################################################################        Working properly

app.post(`/auth/signin`, function(request, response) {

        var token = jwt.sign({id:users.id},config.secret,{expiresIn:86400});

        const signuser = {
            
            category: request.body.category,
            email: request.body.email,
            password: request.body.password,
            token:token, 
            
        
          };

          const user_welcome_data_to_display={
            category: request.body.category,
            email: request.body.email,
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
            return response.status(401).send({ status: 401, message: `${'Hey !! This Category of' + ' '}${allowed_category} ` + 'does not belong to your account' });
          }else if (!checkinsertedemail) {
            return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'does not exist' });
          }else if (!checkinsertedpassword) {
            return response.status(401).send({ status: 401, message: `Hey !! This password is incorrect` });
          }
          
            console.log(signuser);
            response.status(200).send({status: 200, message: `${'Hey !!' + ' '}${Name_to_display} ` + ' You are logged in successfully ', data:user_welcome_data_to_display }); 
    
    
        });




//#############################################################################       Working Properly

app.get(`/users`, /*check_tooken , */ (request,response)=>{

            return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving all users", data:users});
        
        });
        

       

//#############################################################################        Bags Here
 
app.get(`/user/:userId`, /*check_tooken , */ (request,response)=>{
        
            return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving  user", data:users});
        
        });
    



//#############################################################################     some   Bags Here


app.patch('/users/:id', /*check_tooken , */ (request, response) => {
    const checkuser = users.find((userId) => userId.id === parseInt(request.params.id, 10));
    const userid = request.params.id;

    if (!checkuser) {
      return response.status(404).send({ status: 404, message: `${'Hey !! This user with id' + ' '}${userid} ` + 'does not exist' });
    }

    const update_body = {
      id: mentors.length + 1,
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

      const Name_to_display = update_body.firstName;
      const Email_to_check = update_body.email;

   
      const insert_email = mentors.some((el) => el.email === Email_to_check );
      
      if (!checkuser.id) {
        return response.status(401).send({ status: 401, message: `Hey !! You can't update this id ${request.params.id} `});
        
      }if (!update_body.category) {
        return response.status(400).send({ status: 400, message: `Hey !! insert category` });
      }else if (!Name_to_display) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert firstname` });
      }else if (!update_body.lastName) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert lastname` });
      }else if (!update_body.email) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert email` });
      }else if (insert_email) {
        return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'has already exist' });
      }else if (!update_body.expertise) {
        return response.status(400).send({ status: 400, message: `Hey !! choose what expertise` });
      } else if (!update_body.password) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert password` });
      } 



    // users.push(update_body);
    const target_user = mentors.indexOf(checkuser);
    mentors.splice(target_user, 1, update_body);
    return response.status(204).send({ status: 204, message: `${'Hey !! User with id' + ' '}${userid} ` + 'has updated Successfully', data: update_body });
  });
  



    
module.exports =app;
