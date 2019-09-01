import check_tooken from '../../../check_token';
const config = require('../../../config');
import bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');
const filesystem = require('fs');
import express from 'express';
const app = express.Router();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


var mentors = [

    {
        id: 1,
        category: 'mentor',
        firstName: 'james',
        lastName: 'morinka',
        email: 'k.morinka1000@gmail.com',
        address: 'Nairobi/kenya',
        bio: 'Youtuber ',
        occupation: 'employee',
        expertise: 'I.T',
        password: 'qwerty',
        confirm_password: 'qwerty',
      },
      {
      id: 2,
      category: 'mentor',
      firstName: 'teddy',
      lastName: 'shirinko',
      email: 'k.shirinko@gmai.com',
      address: 'Kigali/Rwanda',
      bio: 'love to care',
      occupation: 'nursing',
      expertise: 'medical',
      password: 'qwerty',
      confirm_password: 'qwerty',
    }
  ];




//#############################################################################        Working Properly

    app.post(`/mentor/signmentor`, function(request, response) {

        var token = jwt.sign({id:mentors.id},config.secret,{expiresIn:86400});

        const signmentor = {
            
            category: request.body.category,
            email: request.body.email,
            password: request.body.password,
            token:token, 
            
        
          };

        const mentor_welcome_data_to_display={
            category: request.body.category,
            email: request.body.email,
            token:token, 
         };
    
         
          const Name_to_display = mentors.firstName;
          const allowed_category = signmentor.category;
          const Email_to_check = signmentor.email;
          const password_to_check = signmentor.password;
    
         if (!signmentor.category) {
            return response.status(400).send({ status: 400, message: `Hey !! Insert Category` });
          } else if (!signmentor.email) {
            return response.status(400).send({ status: 400, message: `Hey !! Insert Email` });
          } else if (!signmentor.password) {
            return response.status(400).send({ status: 400, message: `Hey !! Insert password` });
          } 
        
          
          const checkinsertedcategory = mentors.some((el) => el.category === allowed_category );
          const checkinsertedemail = mentors.some((el) => el.email === Email_to_check );
          const checkinsertedpassword = mentors.some((el) => el.password === password_to_check );


         if (!checkinsertedcategory) {
            return response.status(401).send({ status: 401, message: `${'Hey !! This Category of' + ' '}${allowed_category} ` + 'does not belong to your account' });
          }else if (!checkinsertedemail) {
            return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'does not exist' });
          }else if (!checkinsertedpassword) {
            return response.status(401).send({ status: 401, message: `Hey !! This password is incorrect` });
          }
          
            console.log(signmentor);
            response.status(200).send({status: 200, message: `Hey !! ${allowed_category}  ${Name_to_display}  You are logged in successfully`, data:mentor_welcome_data_to_display }); 
    
         });







//#############################################################################        Working Properly

app.get(`/mentors`, /*check_tooken , */ (request,response)=>{

            return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving all mentors ***", data:mentors});
        
        });







//#############################################################################        Bags Here

app.get(`/mentors/:mentorId`, /*check_tooken , */ (request,response)=>{
    mentorId = request.params.mentorId;
        
    return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving  user", data:mentors});

});


    
module.exports =app;
module.exports.mentors = mentors;