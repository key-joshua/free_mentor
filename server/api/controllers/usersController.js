import users_DB from '../models/usersDB';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const userController = {
  
signup: (request, response)=> {

    const created_at = new Date(); 
    const newUser = {
        id: users_DB.length + 1,
        category: 'mentee',
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        address: request.body.address,
        bio: request.body.bio,
        occupation: request.body.occupation,
        expertise: request.body.expertise,
        password: request.body.password,
        confirm_password: request.body.confirm_password,
        session_created: `on ${created_at}`,

      };

      dotenv.config();
      
      const choose_email_as_detail_to_store = newUser.email;
      const choose_id_as_detail_to_store = users_DB.length + 1;
      const choose_category_as_detail_to_store = newUser.category;
      const choose_firstName_as_detail_to_store = newUser.firstName;
      const giventoken = jwt.sign({choose_id_as_detail_to_store,choose_category_as_detail_to_store,choose_firstName_as_detail_to_store,choose_email_as_detail_to_store},process.env.SECRET_KEY,{expiresIn : '24000h'});
 

      const user_welcome_data_to_display={
        token:giventoken,
        message: `Successfully created account`,
     };


     
    
      const insert = users_DB.some((el) => el.email === choose_email_as_detail_to_store );
      if (insert) {
        return response.status(401).json({ status: 401, message: `${'Hey !! This Email' + ' '}${choose_email_as_detail_to_store} ` + 'has already exist' });
      }else if (!choose_firstName_as_detail_to_store) {
        return response.status(400).json({ status: 400, message: `Hey !! Insert firstname` });
      }else if (!newUser.lastName) {
        return response.status(400).json({ status: 400, message: `Hey !! Insert lastname` });
      } else if (!newUser.email) {
        return response.status(400).json({ status: 400, message: `Hey !! Insert email` });
      } else if (!newUser.expertise) {
        return response.status(400).json({ status: 400, message: `Hey !! select what expertise` });
      } else if (!newUser.password) {
        return response.status(400).json({ status: 400, message: `Hey !! Insert password` });
      } else if (newUser.password != newUser.confirm_password) {
        return response.status(400).json({ status: 400, message: `Hey !! Insert same password to confirm password` });
      } 
    
      users_DB.push(newUser);
      response.status(201).json({ status: 201, message: `${'Hey ' + ' '}${choose_firstName_as_detail_to_store} !!` + ' you  successfully created account', data: user_welcome_data_to_display }); 

        
    
  },

signin: (request, response)=> {

    const receive_user_data_from_body = {
      email: request.body.email,
      password: request.body.password,  
      };
  
    const take_user_email = receive_user_data_from_body.email;
    const take_user_password = receive_user_data_from_body.password;

     if (!take_user_email) {
        return response.status(400).json({ status: 400, message: `Hey !! Insert Email` });
      } 

      else if (!take_user_password) {
        return response.status(400).json({ status: 400, message: `Hey !! Insert password` });
      }

      const check_to_signin_user = users_DB.filter(({email, password})=> email === take_user_email && password === take_user_password);
    
  
      if (check_to_signin_user.length != 0) {
        
        for (var index=0; index < check_to_signin_user.length; index++ )
        {

          dotenv.config();
          const choose_id_as_detail_to_store = check_to_signin_user[index].id;
          const choose_email_as_detail_to_store = check_to_signin_user[index].email;
          const choose_category_as_detail_to_store = check_to_signin_user[index].category;
          const choose_firstName_as_detail_to_store = check_to_signin_user[index].firstName;
          const giventoken = jwt.sign({choose_id_as_detail_to_store,choose_category_as_detail_to_store,choose_firstName_as_detail_to_store,choose_email_as_detail_to_store},process.env.SECRET_KEY,{expiresIn:'24000000h'});
          
          const user_welcome_data_to_display=
          {
            token:giventoken,   
          }

          response.status(200).json({
            status: 200, 
            message: `Hey ${check_to_signin_user[index].category} ${check_to_signin_user[index].firstName}!! You are logged in successfully `, 
            data:user_welcome_data_to_display
          });
        }
        
        }

      else{
        return response.status(400).json({status: 400, message:"Hey !! Wrong account details check your email  and  password "});

      }
    
    
  
      
        
  },

  view_all_users: (request, response) => {
    // if (users_DB.length === 0) { return response.status(200).send({ status: 200, message:' Hey !! there is no users found in DataBase ' }); }
    return response.status(200).send({ status: 200, message: ' Hey !! Hope you are retrieving all users ', data: users_DB });
  },

  View_all_mentee: (request, response) => {
    const sort_mentee = users_DB.filter(({ category }) => category === 'mentee' );

  if (sort_mentee) {
const data_to_display=[];
    for (var x=0; x<sort_mentee.length; x++ ){
    
        data_to_display.push( {
          id: sort_mentee[x].id,
          category: sort_mentee[x].category,
          firstName:sort_mentee[x].firstName,
          lastName:sort_mentee[x].lastName,
          email: sort_mentee[x].email, 
          address:sort_mentee[x].address,
          bio: sort_mentee[x].bio, 
          occupation: sort_mentee[x].occupation,
          expertise: sort_mentee[x].expertise,
          account_created : sort_mentee[x].account_created,
          account_edited : sort_mentee[x].account_edited,
        });         
    }
    return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving all mentee ***", data:data_to_display});
  }
},

View_mentee: (request,response)=>{ 
  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const find_mentee_by_id = users_DB.find((mentee) => mentee.id === parseInt(request.params.menteeId, 10));
  const menteeid = parseInt(request.params.menteeId, 10);

    if (!find_mentee_by_id) {
      return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This mentee with id ${menteeid} does not exist` });
    
    }
  

  else {
    const keyword = `mentee`;
    const sort_mentee = users_DB.filter(({category, id})=> category === keyword && id === menteeid);
    
    if (sort_mentee.length != 0) {
      const x = 0;
      const data_to_display = {
            id: sort_mentee[x].id,
            category: sort_mentee[x].category,
            firstName:sort_mentee[x].firstName,
            lastName:sort_mentee[x].lastName,
            email: sort_mentee[x].email, 
            address:sort_mentee[x].address,
            bio: sort_mentee[x].bio, 
            occupation: sort_mentee[x].occupation,
            expertise: sort_mentee[x].expertise,
            account_created : sort_mentee[x].account_created,
            account_edited : sort_mentee[x].account_edited,}
        
      return response.status(200).send({status: 200, message:`Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving ${sort_mentee[x].category} ${sort_mentee[x].firstName} *** `, data:data_to_display});
  
    }
    else{
      return response.status(404).send({status: 404, message:` Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This ${keyword} with id ${menteeid} does not found in DataBase`});
    }
  }
},

  View_all_mentor: (request, response) => {
    const sort_mentors = users_DB.filter(({ category }) => category === 'mentor');

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
          account_created : sort_mentors[x].account_created,
          account_edited : sort_mentors[x].account_edited,
        });         
    }
    return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving all mentors ***", data:data_to_display});
    }
  },

View_mentor: (request,response)=>{ 

  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const find_mentor_by_id = users_DB.find((mentor) => mentor.id === parseInt(request.params.mentorId, 10));
  const mentorid = parseInt(request.params.mentorId, 10);

    if (!find_mentor_by_id) {
      return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This mentor with id ${mentorid} does not exist` });
    
    }
  

  else {
    const keyword = `mentor`;
    const sort_mentors = users_DB.filter(({category, id})=> category === keyword && id === mentorid);
    
    if (sort_mentors.length != 0) {
      const x = 0;
      const data_to_display = {
            id: sort_mentors[x].id,
            category: sort_mentors[x].category,
            firstName:sort_mentors[x].firstName,
            lastName:sort_mentors[x].lastName,
            email: sort_mentors[x].email, 
            address:sort_mentors[x].address,
            bio: sort_mentors[x].bio, 
            occupation: sort_mentors[x].occupation,
            expertise: sort_mentors[x].expertise,
            account_created : sort_mentors[x].account_created,
            account_edited : sort_mentors[x].account_edited,}
        
      return response.status(200).send({status: 200, message:`Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving ${sort_mentors[x].category} ${sort_mentors[x].firstName} *** `, data:data_to_display});
  
    }
    else{
      return response.status(400).send({status: 400, message:` Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This ${keyword} with id ${mentorid} does not found in DataBase`});
    }
  }
},

View_all_admin: (request,response)=>{
  const sort_admin = users_DB.filter(({category})=> category === "admin");

  if (sort_admin) {
const data_to_display=[];
    for (var x=0; x<sort_admin.length; x++ ){
    
        data_to_display.push( {
          id: sort_admin[x].id,
          category: sort_admin[x].category,
          firstName:sort_admin[x].firstName,
          lastName:sort_admin[x].lastName,
          email: sort_admin[x].email, 
          address:sort_admin[x].address,
          bio: sort_admin[x].bio, 
          occupation: sort_admin[x].occupation,
          expertise: sort_admin[x].expertise,
          account_created : sort_admin[x].account_created,
          account_edited : sort_admin[x].account_edited,
        });         
    }
    return response.status(200).send({status: 200, message:"Hey !! Hope you are retrieving all admin ***", data:data_to_display});
  }
},

View_admin: (request,response)=>{ 

  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const find_admin_by_id = users_DB.find((admin) => admin.id === parseInt(request.params.adminId, 10));
  const adminid = parseInt(request.params.adminId, 10);

    if (!find_admin_by_id) {
      return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This admin with id ${adminid} does not exist` });
    
    }
  

  else {
    const keyword = `admin`;
    const sort_admin = users_DB.filter(({category, id})=> category === keyword && id === adminid);
    
    if (sort_admin.length != 0) {
      const x = 0;
      const data_to_display = {
        id: sort_admin[x].id, 
        category: sort_admin[x].category,
        firstName:sort_admin[x].firstName, 
        lastName:sort_admin[x].lastName, 
        email: sort_admin[x].email,
        address:sort_admin[x].address,
        bio: sort_admin[x].bio, 
        occupation: sort_admin[x].occupation,
        expertise: sort_admin[x].expertise,
        account_created : sort_admin[x].account_created,
        account_edited : sort_admin[x].account_edited,}
        
      return response.status(200).send({status: 200, message:`Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving ${sort_admin[x].category} ${sort_admin[x].firstName} *** `, data:data_to_display});
  
    }
    else{
      return response.status(400).send({status: 400, message:` Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This ${keyword} with id ${adminid} does not found in DataBase`});
    }
  }
},

}
    
  module.exports = userController;