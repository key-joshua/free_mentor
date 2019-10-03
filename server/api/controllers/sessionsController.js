import sessionDB from '../models/sessionsDB';
import users_DB from '../models/usersDB';
import jwt from 'jsonwebtoken';

const sessionController = {

create_session : (request, response)=> {
  
  
  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  
  
  const mentorId = request.body.mentorId;
  const find_mentor_by_id = users_DB.find((mentor) => mentor.id === mentorId && mentor.category ==='mentor' );

  if (!find_mentor_by_id) {
   
    return response.status(404).send({ status: 404, message: `Hey!! This Mentor with id ${mentorId} You are Trying to make session with, does not exist in DataBase` });
  }

  else{
    const check_this_mentor_with_this_characteristics = users_DB.filter(({category, id})=> category === "mentor" && id === mentorId);

    if (check_this_mentor_with_this_characteristics.length != 0) { 
      const current_created_data_to_display=[];
      const Mentor_name_to_display=[];
      
      for (var x=0; x<check_this_mentor_with_this_characteristics.length; x++ ){

        Mentor_name_to_display.push(check_this_mentor_with_this_characteristics[x].firstName); 
        const created_at = new Date(); 
         
       
              sessionDB.push( {

                status: 'pending',
                sessionId: sessionDB.length + 1,
                mentorId: mentorId,
                mentorName:check_this_mentor_with_this_characteristics[x].firstName,
                menteeId: decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store,
                menteeName: decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store,
                menteeEmail: decoded_token_in_the_way_to_obtain_user_details.choose_email_as_detail_to_store,
                session_created: `on ${created_at}`,
                questions: `Hey My name is ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} am ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${request.body.questions}`
                

              })

              current_created_data_to_display.push( {

                status: 'pending',
                sessionId: sessionDB.length ,
                mentorId: mentorId,
                mentorName:check_this_mentor_with_this_characteristics[x].firstName,
                menteeId: decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store,
                menteeName: decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store,
                menteeEmail: decoded_token_in_the_way_to_obtain_user_details.choose_email_as_detail_to_store,
                session_created: `on ${created_at}`,
                questions: `Hey My name is ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} am ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}, ${request.body.questions}`
                

              })

              if (!request.body.mentorId) {
                return response.status(400).send({ status: 400, message: `Hey !! Insert Mentor's Id` });
              } 
              
              else if (!request.body.questions) {
                return response.status(400).send({ status: 400, message: `Hey !! Insert decsription of your mentorship session` });
              }
              else{
                response.status(201).send({ 
                  status: 201, 
                  message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully created Mentorship Session on ${created_at} with mentor ${Mentor_name_to_display}  and your session now has id ${sessionDB.length} `, 
                  data:current_created_data_to_display});
              };
            }
          }
        }
},

  view_all_sessions: (request, response) => {
    // if (sessionDB.length === 0) return response.status(200).send({ status: 200, message: ' Hey !! there is no session found ' });
    return response.status(200).send({ status: 200, message: ' Hey !! Hope you are retrieving all Sessions ', data: sessionDB });
  },

view_sessions_by_mentee_or_mentor_by_token_id_info :(request,response)=>{

  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const check_session_of_mentor_or_mentee_by_id = sessionDB.find((session) => session.mentorId === decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store || session.menteeId === decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store );
 
  if (!check_session_of_mentor_or_mentee_by_id) {
    return response.status(404).send({ status: 404, message: `Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} you don't have Session yet !! ` });
  }

  else if (check_session_of_mentor_or_mentee_by_id) 
  {
    const sort_mentor_session = sessionDB.filter(({mentorId})=> mentorId ===  decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store);
    const sort_mentee_session = sessionDB.filter(({menteeId})=> menteeId ===  decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store);

    if (sort_mentor_session.length != 0) {
      const data_to_display=[];
      for (var index = 0; index < sort_mentor_session.length; index++ ){
      
        data_to_display.push( {
             
          status:sort_mentor_session[index].status,
          sessionId: sort_mentor_session[index].sessionId,
          mentorId: sort_mentor_session[index].mentorId,
          mentorName:  sort_mentor_session[index].mentorName,
          menteeId:sort_mentor_session[index].menteeId,
          menteeName: sort_mentor_session[index].menteeName,
          menteeEmail:sort_mentor_session[index].menteeEmail,
          session_created:sort_mentor_session[index].session_created,
          session_accepted : sort_mentor_session[index].session_accepted,
          session_rejected : sort_mentor_session[index].session_rejected,
          questions: sort_mentor_session[index].questions,

          
        });       
      }
      return response.status(200).send({status: 200, message:` Hey Mentor ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving all your Sessions `, data:data_to_display });
    }


    else if (sort_mentee_session.length != 0) {
      const data_to_display=[];
      for (var index = 0; index < sort_mentee_session.length; index++ ){
      
        data_to_display.push( {
             
          status:sort_mentee_session[index].status,
          sessionId: sort_mentee_session[index].sessionId,
          mentorId: sort_mentee_session[index].mentorId,
          mentorName:  sort_mentee_session[index].mentorName,
          menteeId:sort_mentee_session[index].menteeId,
          menteeName: sort_mentee_session[index].menteeName,
          menteeEmail:sort_mentee_session[index].menteeEmail,
          session_created:sort_mentee_session[index].session_created,
          session_accepted : sort_mentee_session[index].session_accepted,
          session_rejected : sort_mentee_session[index].session_rejected,
          questions: sort_mentee_session[index].questions,

          
        });         
      }
      return response.status(200).send({status: 200, message:` Hey Mentee ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving all your Sessions `, data:data_to_display });
    }
    
  }
},

view_session_by_sessionId :(request,response)=>{

  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const check_session_of_mentor_or_mentee_by_id = sessionDB.find((session_by_id) => session_by_id.sessionId === parseInt(request.params.sessionId, 10));
  

  if (!check_session_of_mentor_or_mentee_by_id) {
    return response.status(404).send({ status: 404, message: `Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} you are trying to find Session which does not exist !! ` });
  }

  else if (check_session_of_mentor_or_mentee_by_id) 
  {
    const sort_mentor_or_mentee_session = sessionDB.filter(({sessionId})=> sessionId ===  parseInt(request.params.sessionId, 10));

    if (sort_mentor_or_mentee_session.length != 0) {
      const data_to_display=[];
      for (var index = 0; index < sort_mentor_or_mentee_session.length; index++ ){
      
        data_to_display.push( {
             
          status:sort_mentor_or_mentee_session[index].status,
          sessionId: sort_mentor_or_mentee_session[index].sessionId,
          mentorId: sort_mentor_or_mentee_session[index].mentorId,
          mentorName:  sort_mentor_or_mentee_session[index].mentorName,
          menteeId:sort_mentor_or_mentee_session[index].menteeId,
          menteeName: sort_mentor_or_mentee_session[index].menteeName,
          menteeEmail:sort_mentor_or_mentee_session[index].menteeEmail,
          session_created:sort_mentor_or_mentee_session[index].session_created,
          session_accepted : sort_mentor_or_mentee_session[index].session_accepted,
          session_rejected : sort_mentor_or_mentee_session[index].session_rejected,
          questions: sort_mentor_or_mentee_session[index].questions,

          
        });       
        return response.status(200).send({status: 200, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving this Session requested by mentee ${sort_mentor_or_mentee_session[index].menteeName}`, data:data_to_display }); 
      }   
    }
  }
},

view_sessions_of_mentor :(request,response)=>{

  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const check_session_of_mentor_by_id = sessionDB.find((session_by_mentor_id) => session_by_mentor_id.mentorId === parseInt(request.params.mentorId, 10));
 

  if (!check_session_of_mentor_by_id) {
    return response.status(404).send({ status: 404, message: `Hey  ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} This Mentor  with this id has not any Session Now !! ` });
  }

  else if (check_session_of_mentor_by_id) 
  {
    const sort_mentor_session = sessionDB.filter(({mentorId})=> mentorId ===  parseInt(request.params.mentorId, 10));
    const find_mentor_who_coresponding_with_this_id_in_usersDB = users_DB.filter(({id})=> id ===  parseInt(request.params.mentorId, 10));
    

    if (find_mentor_who_coresponding_with_this_id_in_usersDB.length != 0)
     {
      const mentor_name_to_display=[];
      for (var index = 0; index < find_mentor_who_coresponding_with_this_id_in_usersDB.length; index++ )
      {mentor_name_to_display.push(find_mentor_who_coresponding_with_this_id_in_usersDB[index].firstName)}
    }

    if (sort_mentor_session.length != 0) {
      const data_to_display=[];
      const mentor_name_to_display=[];

      for (var index = 0; index < sort_mentor_session.length; index++ ){
      
        data_to_display.push( {
             
          status:sort_mentor_session[index].status,
          sessionId: sort_mentor_session[index].sessionId,
          mentorId: sort_mentor_session[index].mentorId,
          mentorName:  sort_mentor_session[index].mentorName,
          menteeId:sort_mentor_session[index].menteeId,
          menteeName: sort_mentor_session[index].menteeName,
          menteeEmail:sort_mentor_session[index].menteeEmail,
          session_created:sort_mentor_session[index].session_created,
          session_accepted : sort_mentor_session[index].session_accepted,
          session_rejected : sort_mentor_session[index].session_rejected,
          questions: sort_mentor_session[index].questions,

          
        }); 

      }

      for (var index = 0; index < find_mentor_who_coresponding_with_this_id_in_usersDB.length; index++ )
     
      {
        mentor_name_to_display.push(find_mentor_who_coresponding_with_this_id_in_usersDB[index].firstName)
      }
      
      return response.status(200).send({status: 200, message:` Hey  ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving all Sessions of this Mentor ${mentor_name_to_display} `, data:data_to_display });
    }
  }
},

view_sessions_of_mentee :(request,response)=>{

  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const check_session_of_mentor_or_mentee_by_id = sessionDB.find((session_by_mentee_id) => session_by_mentee_id.menteeId === parseInt(request.params.menteeId, 10) );
 

  if (!check_session_of_mentor_or_mentee_by_id) {
    return response.status(404).send({ status: 404, message: `Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} This Mentee with that id has not requested any Session Now !! ` });
  }

  else if (check_session_of_mentor_or_mentee_by_id) 
  {
    const sort_mentee_session = sessionDB.filter(({menteeId})=> menteeId === parseInt(request.params.menteeId, 10));
    const find_mentee_who_coresponding_with_this_id_in_usersDB = users_DB.filter(({id})=> id ===  parseInt(request.params.menteeId, 10));


    if (sort_mentee_session.length != 0) {
      const data_to_display=[];
      const mentee_name_to_display=[];
      for (var index = 0; index < sort_mentee_session.length; index++ ){
      
        data_to_display.push( {
             
          status:sort_mentee_session[index].status,
          sessionId: sort_mentee_session[index].sessionId,
          mentorId: sort_mentee_session[index].mentorId,
          mentorName:  sort_mentee_session[index].mentorName,
          menteeId:sort_mentee_session[index].menteeId,
          menteeName: sort_mentee_session[index].menteeName,
          menteeEmail:sort_mentee_session[index].menteeEmail,
          session_created:sort_mentee_session[index].session_created,
          session_accepted : sort_mentee_session[index].session_accepted,
          session_rejected : sort_mentee_session[index].session_rejected,
          questions: sort_mentee_session[index].questions,

          
        });         
      }

      for (var index = 0; index < find_mentee_who_coresponding_with_this_id_in_usersDB.length; index++ )
     
      {
        mentee_name_to_display.push(find_mentee_who_coresponding_with_this_id_in_usersDB[index].firstName)
      }
      

      return response.status(200).send({status: 200, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving all Sessions of this Mentee ${mentee_name_to_display} `, data:data_to_display });
    }
  }
},

accept_session :(request, response) => {
  
  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const find_session_by_id = sessionDB.find((session) => session.sessionId === parseInt(request.params.sessionId, 10));

    if (!find_session_by_id) {
      return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This session with id ${parseInt(request.params.sessionId, 10)} does not exist` });
    }

    else if (find_session_by_id) 
    {
      const sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array = sessionDB.filter(({sessionId})=> sessionId ===  parseInt(request.params.sessionId, 10));
  
      if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array.length != 0) {

        const index = 0;
        const keyword = 'accepted';
        const non_keyword = 'rejected';
        const created_at = new Date();
        
          const update_session_from_pending_to_accept = {
          status : request.body.status,
          sessionId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].sessionId,
          mentorId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorId,
          mentorName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorName,
          menteeId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeId,
          menteeName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeName,
          menteeEmail : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeEmail,
          session_created : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].session_created,
          session_accepted : `on ${created_at}`,
          questions: sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].questions,
        }
       
        
        if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].status === keyword) {
          return response.status(400).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! this Session had already ${keyword} on ${ sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].session_accepted} ` });      
        }
        else if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].status === non_keyword) {
          return response.status(400).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! this Session had already ${non_keyword} on ${ sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].session_accepted} ` });      
        } 
        
        else if (request.body.status != keyword) {
          return response.status(400).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! the keyword you have to use is called ${keyword} ` });      
        }
        
        else 
        {
          
          const get__positiont_of_object_you_need_to_update_by_id = parseInt (request.params.sessionId) -1;
          sessionDB.splice(get__positiont_of_object_you_need_to_update_by_id, 1, update_session_from_pending_to_accept);
          return response.status(200).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully accepted this Session `, data:update_session_from_pending_to_accept });
      }  
    }
  }
},

reject_session :(request, response) => {
  
  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const find_session_by_id = sessionDB.find((session) => session.sessionId === parseInt(request.params.sessionId, 10));

    if (!find_session_by_id) {
      return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This session with id ${parseInt(request.params.sessionId, 10)} does not exist` });
    }

    else if (find_session_by_id) 
    {
      const sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array = sessionDB.filter(({sessionId})=> sessionId ===  parseInt(request.params.sessionId, 10));
  
      if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array.length != 0) {

        const index = 0;
        const keyword = 'rejected';
        const non_keyword = 'accepted';
        const created_at = new Date();
        
          const update_session_from_pending_to_accept = {
          status : request.body.status,
          sessionId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].sessionId,
          mentorId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorId,
          mentorName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorName,
          menteeId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeId,
          menteeName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeName,
          menteeEmail : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeEmail,
          session_created : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].session_created,
          session_accepted : `on ${created_at}`,
          questions: sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].questions,
        }
       
        
        if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].status === keyword) {
          return response.status(400).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! this Session had already ${keyword} on ${ sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].session_accepted} ` });      
        }
        else if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].status === non_keyword) {
          return response.status(400).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! this Session had already ${non_keyword} on ${ sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].session_accepted} ` });      
        } 
        
        else if (request.body.status != keyword) {
          return response.status(400).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! the keyword you have to use is called ${keyword} ` });      
        }
        else 
        {
          const get__positiont_of_object_you_need_to_update_by_id = parseInt (request.params.sessionId) -1;
          sessionDB.splice(get__positiont_of_object_you_need_to_update_by_id, 1, update_session_from_pending_to_accept);
          return response.status(200).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully ${keyword} this Session `, data:update_session_from_pending_to_accept });
      }  
    }
  }


},

view_one_sessions_by_mentee_or_mentor_by_token_id_info :(request,response)=>{

  const receive_token_from_header = request.headers.authorization;
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const check_session_of_mentee_by_id = sessionDB.find((session) => session.sessionId  === parseInt(request.params.sessionId, 10) && session.menteeId === decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store );
  const check_session_of_mentor_by_id = sessionDB.find((session) => session.sessionId  === parseInt(request.params.sessionId, 10) && session.mentorId === decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store );
 
  if (!check_session_of_mentor_by_id && !check_session_of_mentee_by_id) {
    return response.status(404).send({ status: 404, message: `Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} the session you are trying to view is not your !! ` });
 }
 
  else if (check_session_of_mentor_by_id) 
  {
    const sort_mentor_session = sessionDB.filter(({sessionId})=> sessionId === parseInt(request.params.sessionId, 10));


    if (sort_mentor_session.length != 0) {
      const data_to_display=[];
      for (var index = 0; index < sort_mentor_session.length; index++ ){
      
        data_to_display.push( {
             
          status:sort_mentor_session[index].status,
          sessionId: sort_mentor_session[index].sessionId,
          mentorId: sort_mentor_session[index].mentorId,
          mentorName:  sort_mentor_session[index].mentorName,
          menteeId:sort_mentor_session[index].menteeId,
          menteeName: sort_mentor_session[index].menteeName,
          menteeEmail:sort_mentor_session[index].menteeEmail,
          session_created:sort_mentor_session[index].session_created,
          session_accepted : sort_mentor_session[index].session_accepted,
          session_rejected : sort_mentor_session[index].session_rejected,
          questions: sort_mentor_session[index].questions,

          
        });       
      }
      return response.status(200).send({status: 200, message:` Hey Mentor ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving all your Sessions `, data:data_to_display });
    }
  }
  
  
 
  else if (check_session_of_mentee_by_id) 
  {
    const sort_mentee_session = sessionDB.filter(({sessionId})=> sessionId === parseInt(request.params.sessionId, 10));

    if (sort_mentee_session.length != 0) {
      const data_to_display=[];
      for (var index = 0; index < sort_mentee_session.length; index++ ){
      
        data_to_display.push( {
             
          status:sort_mentee_session[index].status,
          sessionId: sort_mentee_session[index].sessionId,
          mentorId: sort_mentee_session[index].mentorId,
          mentorName:  sort_mentee_session[index].mentorName,
          menteeId:sort_mentee_session[index].menteeId,
          menteeName: sort_mentee_session[index].menteeName,
          menteeEmail:sort_mentee_session[index].menteeEmail,
          session_created:sort_mentee_session[index].session_created,
          session_accepted : sort_mentee_session[index].session_accepted,
          session_rejected : sort_mentee_session[index].session_rejected,
          questions: sort_mentee_session[index].questions,

          
        });         
      }
      return response.status(200).send({status: 200, message:` Hey Mentee ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Hope you are retrieving all your Sessions `, data:data_to_display });
    }
  }
},

accept_sessions :(request, response) => {
  
  const receive_token_from_header = request.headers.authorization;
  const get__positiont_of_object_you_need_to_update_by_id = sessionDB.indexOf(parseInt(request.params.sessionId, 10));
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const find_session_by_id = sessionDB.find((session) => session.sessionId  === parseInt(request.params.sessionId, 10) && session.mentorId === decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store );
 
    if (!find_session_by_id) {
      return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This not your session ` });
    }

    else if (find_session_by_id) 
    {
      const sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array = sessionDB.filter(({sessionId})=> sessionId ===  parseInt(request.params.sessionId, 10));
  
      if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array.length != 0) {

        const index = 0;
        const keyword = 'accepted';
        const created_at = new Date();
        
          const update_session_from_pending_to_accept = {
          status : "accepted",
          sessionId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].sessionId,
          mentorId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorId,
          mentorName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorName,
          menteeId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeId,
          menteeName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeName,
          menteeEmail : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeEmail,
          session_created : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].session_created,
          session_accepted : `on ${created_at}`,
          questions: sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].questions,
        }
       
          sessionDB.splice(get__positiont_of_object_you_need_to_update_by_id, 1, update_session_from_pending_to_accept);
          return response.status(200).send({status: 200, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully accepted this Session `, data:update_session_from_pending_to_accept });
       
    }
  }
},
reject_sessions :(request, response) => {
  
  const receive_token_from_header = request.headers.authorization;
  const get__positiont_of_object_you_need_to_update_by_id = sessionDB.indexOf(parseInt(request.params.sessionId, 10));
  const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
  const find_session_by_id = sessionDB.find((session) => session.sessionId  === parseInt(request.params.sessionId, 10) && session.mentorId === decoded_token_in_the_way_to_obtain_user_details.choose_id_as_detail_to_store );
 
    if (!find_session_by_id) {
      return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This not your session ` });
    }

    else if (find_session_by_id) 
    {
      const sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array = sessionDB.filter(({sessionId})=> sessionId ===  parseInt(request.params.sessionId, 10));
  
      if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array.length != 0) {

        const index = 0;
        const created_at = new Date();
        
          const update_session_from_pending_to_accept = {
          status : "rejected",
          sessionId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].sessionId,
          mentorId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorId,
          mentorName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorName,
          menteeId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeId,
          menteeName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeName,
          menteeEmail : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeEmail,
          session_created : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].session_created,
          session_accepted : `on ${created_at}`,
          questions: sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].questions,
        }
       
        
          sessionDB.splice(get__positiont_of_object_you_need_to_update_by_id, 1, update_session_from_pending_to_accept);
          return response.status(200).send({status: 400, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully rejected this Session `, data:update_session_from_pending_to_accept });
       
    }
  }
},




};

export default sessionController;

