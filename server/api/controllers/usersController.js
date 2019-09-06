import usersDB from '../models/usersDB';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';





//#############################################################################        Working Properly
const userController = {
signup: (request, response)=> {

  dotenv.config(); 
  const giventoken = jwt.sign({ category:usersDB.category,id:usersDB.id, email:usersDB.email,},process.env.SECRET_KEY,{expiresIn:86400});

    const newUser = {
        id: usersDB.length + 1,
        category: 'user',
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        address: request.body.address,
        bio: request.body.bio,
        occupation: request.body.occupation,
        expertise: request.body.expertise,
        password: request.body.password,
        confirm_password: request.body.confirm_password

      };

      const user_welcome_data_to_display={
        token:giventoken,
        message: `Hey !!  you are successfully created account`,
     };

      const allowed_category = 'user';
      const Name_to_display = newUser.firstName;
      const Email_to_check = newUser.email;

     
    
      const insert = usersDB.some((el) => el.email === Email_to_check );
      if (insert) {
        return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'has already exist' });
      }else if (newUser.category!==allowed_category) {
        return response.status(400).send({ status: 400, message: `Hey !! allowed category is user` });
      }else if (!Name_to_display) {
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
    
      usersDB.push(newUser);
      response.status(201).send({ status: 201, message: `${'Hey !! ' + ' '}${Name_to_display} ` + ' you  successfully created account', data: user_welcome_data_to_display }); 

        
    
    },
//#############################################################################        Working properly

signin: (request, response)=> {

  dotenv.config(); 
  const giventoken = jwt.sign({ category:usersDB.category,id:usersDB.id, email:usersDB.email,},process.env.SECRET_KEY,{expiresIn:86400});
   
  const signuser = {
      
      category: request.body.category,
      email: request.body.email,
      password: request.body.password,
      
  
    };

    const user_welcome_data_to_display={
      token:giventoken, 
   };

   
    const Name_to_display = usersDB.firstName;
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
  
    
    const checkinsertedcategory = usersDB.some((el) => el.category === allowed_category );
    const checkinsertedemail = usersDB.some((el) => el.email === Email_to_check );
    const checkinsertedpassword =usersDB.some((el) => el.password === password_to_check );


   if (!checkinsertedcategory) {
      return response.status(401).send({ status: 401, message: `${'Hey !! This Category of' + ' '}${allowed_category} ` + 'does not belong to your account' });
    }else if (!checkinsertedemail) {
      return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'does not exist' });
    }else if (!checkinsertedpassword) {
      return response.status(401).send({ status: 401, message: `Hey !! This password is incorrect` });
    }
    
      response.status(200).send({status: 200, message: `Hey !! You are logged in successfully `, data:user_welcome_data_to_display }); 


  },

view_users: (request,response)=>{

    return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving all users", data:usersDB});

},
//#############################################################################     some   Bags Here

change_user: (request, response) => {
  const checkuser = usersDB.find((userId) => userId.id === parseInt(request.params.id, 10));
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
},


View_all_mentor: (request,response)=>{
  const sort_mentors = usersDB.filter(({category})=> category === "mentor");

  if (sort_mentors) {
const data_to_display=[];
    for (var x=0; x<sort_mentors.length; x++ ){
    
        data_to_display.push( {
          id: sort_mentors[x].id,
          category: sort_mentors[x].category,
          firstName:sort_mentors[x].firstName,
          lastName:sort_mentors[x].lastName,
          email: sort_mentors[x].email, 
          address:sort_mentors[x].address,
          bio: sort_mentors[x].bio, 
          occupation: sort_mentors[x].occupation,
          expertise: sort_mentors[x].expertise,
        }
          );         
    }
    return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving all mentors ***", data:data_to_display});

  }

},

View_mentor: (request,response)=>{ 
  const checkuser = usersDB.find((mentor) => mentor.id === parseInt(request.params.mentorId, 10));
  const mentorid = parseInt(request.params.mentorId, 10);

  if (!checkuser) {
    return response.status(404).send({ status: 404, message: `${'Hey !! This user with id' + ' '}${mentorid} ` + 'does not exist' });
  }

  else{
    const sort_mentors = usersDB.filter(({category, id})=> category === "mentor" && id === mentorid);

    if (sort_mentors.length != 0) {
  const data_to_display=[];
      for (var x=0; x<sort_mentors.length; x++ ){
      
          data_to_display.push( {
            id: sort_mentors[x].id,
            category: sort_mentors[x].category,
            firstName:sort_mentors[x].firstName,
            lastName:sort_mentors[x].lastName,
            email: sort_mentors[x].email, 
            address:sort_mentors[x].address,
            bio: sort_mentors[x].bio, 
            occupation: sort_mentors[x].occupation,
            expertise: sort_mentors[x].expertise,
          }
            );         
      }
      return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving mentor ***", data:data_to_display});
  
    }else{
      return response.status(400).send({status: 400, message:"Hey !! User not founf"});
    }

    
  
    
  }
      
  

}


  }
    
  module.exports =userController;
  module.exports.usersDB =usersDB;