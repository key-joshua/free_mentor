import sessionDB from '../models/sessionsDB';
import reviewDB from '../models/reviewDB';
import users_DB from '../models/usersDB';
import jwt from 'jsonwebtoken';

const additionallyController = {
    
view_all_review :(request,response)=>{
  if (reviewDB.length != 0){
    return response.status(200).send({status: 200, message:` Hey !! Hope you are retrieving all review `, data:reviewDB }); 
  }
  else{
    return response.status(404).send({status: 404, message:  `Hey !! there is no review found `}); 
  }
     
  },

review_mentor :(request, response) => {
  
    const receive_token_from_header = request.headers.authorization;
    const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
    const find_session_by_id = sessionDB.find((session) => session.sessionId === parseInt(request.params.sessionId, 10));
  
      if (!find_session_by_id) {
        return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This session with id ${parseInt(request.params.sessionId, 10)} does not exist` });
    }


    
        else if (find_session_by_id) 
        {
          const sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array = sessionDB.filter(({sessionId})=> sessionId ===  parseInt(request.params.sessionId, 10));
      
          if (sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array) {
    
            const index = 0;
            const created_at = new Date();
            
            const update_session_from_pending_to_accept = {
            
            
            reviewId : reviewDB.length + 1,
            sessionId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].sessionId,
            mentorId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorId,
            mentorName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorName,
            menteeId : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeId,
            menteeName : sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].menteeName,
            score : request.body.score,
            remark : request.body.remark,
            review_created : `on ${created_at}`,
          }


          if (! request.body.score) {
            return response.status(400).send({status: 200, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you must have to score this mentor by using numbers  ` });      
          }
          else if (request.body.score != 1 && request.body.score != 2 && request.body.score != 3 && request.body.score != 4 && request.body.score != 5) {
            return response.status(400).send({status: 200, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! the score you have to use must range betwenn 1 - 5` });      
          }

          else if (! request.body.remark) {
            return response.status(400).send({status: 200, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you must have to remark this mentor` });      
          }
          else 
          {
            reviewDB.push(update_session_from_pending_to_accept);
            return response.status(200).send({status: 200, message:` Hey ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully reviewed this mentor ${sort__sessions_as_oject_from_sessionDB_where_is_stored_in_array[index].mentorName} `, data:update_session_from_pending_to_accept });
        }  
      }
    }
  },

delete_review :(request, response) => {
  
    const receive_token_from_header = request.headers.authorization;
    const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
    const find_session_by_id = reviewDB.find((session) => session.sessionId === parseInt(request.params.sessionId, 10));
    const get_object_position_you_need_to_delete_by_id_through_index = reviewDB.indexOf(find_session_by_id);
    
  
      if (!find_session_by_id) {
        return response.status(404).send({ status: 404, message: `Hey Admin ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This review with id ${parseInt(request.params.sessionId, 10)} does not exist` });
      }

     
      else if (find_session_by_id) 
        {
          const sort_reviews_as_oject_from_reviewDB_where_is_stored_in_array = reviewDB.filter(({sessionId})=> sessionId ===  parseInt(request.params.sessionId, 10));
          if (sort_reviews_as_oject_from_reviewDB_where_is_stored_in_array.length != 0) {
            const index = 0;
            reviewDB.splice(get_object_position_you_need_to_delete_by_id_through_index, 1);
            return response.status(200).send({status: 200, message:` Hey Admin ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully deleted this review of Mentee ${sort_reviews_as_oject_from_reviewDB_where_is_stored_in_array[index].menteeName} `})   
      }
    }
  },

change_user_to_mentor :(request, response) => {
  
    const receive_token_from_header = request.headers.authorization;
    const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
    const find_user_by_id = users_DB.find((user) => user.id === parseInt(request.params.userId, 10));
    const get_object_position_you_need_to_delete_by_id_through_index = users_DB.indexOf(find_user_by_id);
  
      if (!find_user_by_id) {
        return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This person with id ${parseInt(request.params.userId, 10)} does not exist` });
      }
  
      else if (find_user_by_id) 
      {
        const sort__user_as_oject_from_usersDB_where_is_stored_in_array = users_DB.filter(({id})=> id ===  parseInt(request.params.userId, 10));
    
        if (sort__user_as_oject_from_usersDB_where_is_stored_in_array.length != 0) {
  
          const index = 0;
          const keyword = 'mentor';
          const keyword1 = 'mentee';
          const keyword2 = 'admin';
          const created_at = new Date();
            const update_session_from_pending_to_accept = {
            id : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].id,
            category : request.body.category,
            firstName : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].firstName,
            lastName : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].lastName,
            email : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].email,
            address : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].address,
            bio : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].bio,
            occupation : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].occupation,
            expertise : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].expertise,
            password : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].password ,
            confirm_password: sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].confirm_password,
            account_created : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].account_created,
            account_edited : `on ${created_at}`,
          }
          
          if (request.body.category != keyword && request.body.category != keyword1 && request.body.category != keyword2 ) {
            return response.status(400).send({status: 400, message:` Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !!  the only keyword you must have to use to update this user is ${keyword},  ${keyword1} or  ${keyword2}   ` });      
          }
          else if (sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].category === keyword && request.body.category === keyword) {
            return response.status(400).send({status: 400, message:` Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! this ${sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].firstName} already's ${keyword} since from ${ sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].account_edited} ` });      
          }
          else if (sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].category === keyword1 && request.body.category === keyword1) {
            return response.status(400).send({status: 400, message:` Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! this  ${sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].firstName} already's ${keyword1} since from ${ sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].account_created} ` });      
          }
          else if (sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].category === keyword2 && request.body.category === keyword2) {
            return response.status(400).send({status: 400, message:` Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! this  ${sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].firstName} already's ${keyword2} since from ${ sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].account_edited} ` });      
          }
           
          else 
          {
            users_DB.splice(get_object_position_you_need_to_delete_by_id_through_index, 1, update_session_from_pending_to_accept);
            return response.status(200).send({status: 200, message:` Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store} ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully changed ${sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].category} ${sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].firstName} to ${request.body.category}`, data:update_session_from_pending_to_accept });
        }  
      }
    }
  },
  
update_profile :(request, response) => {
  
    const receive_token_from_header = request.headers.authorization;
    const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
    const find_user_by_id = users_DB.find((user) => user.id === parseInt(request.params.userId, 10));
    const get_object_position_you_need_to_delete_by_id_through_index = users_DB.indexOf(find_user_by_id);
  
      if (!find_user_by_id) {
        return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This user with id ${parseInt(request.params.userId, 10)} does not exist` });
      }
  
      else if (find_user_by_id) 
      {
        const sort__user_as_oject_from_usersDB_where_is_stored_in_array = users_DB.filter(({id})=> id ===  parseInt(request.params.userId, 10));
    
        if (sort__user_as_oject_from_usersDB_where_is_stored_in_array.length != 0) {
  
          const index = 0;
          const created_at = new Date();

            const update_session_from_pending_to_accept = {
            id : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].id,
            category : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].category,
            firstName : request.body.firstName,
            lastName : request.body.lastName,
            email : request.body.email,
            address : request.body.address,
            bio : request.body.bio,
            occupation : request.body.occupation,
            expertise : request.body.expertise,
            password : request.body.password ,
            account_created : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].account_created,
            account_edited : `on ${created_at}`,
          }

      const check_renew_email = users_DB.some((el) => el.email === request.body.email &&  request.body.email != sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].email  );
      if (check_renew_email) {
        return response.status(401).send({ status: 401, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This Email ${request.body.email} has already exist `});
      }
      else if (!request.body.password ) {
        return response.status(400).send({ status: 400, message: `Hey  ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Insert password to confirm update` });
      }
      else if (sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].password != request.body.password ) {
        return response.status(400).send({ status: 400, message: `Hey  ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! the password you entered is not correct` });
      }
      else
      {
            users_DB.splice(get_object_position_you_need_to_delete_by_id_through_index, 1, update_session_from_pending_to_accept);
            return response.status(200).send({status: 200, message:` Hey Admin ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully updated your profile` , data:update_session_from_pending_to_accept });
        }  
      }
    }
  },

update_password :(request, response) => {
  
    const receive_token_from_header = request.headers.authorization;
    const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
    const find_user_by_id = users_DB.find((user) => user.id === parseInt(request.params.userId, 10));
    const get_object_position_you_need_to_delete_by_id_through_index = users_DB.indexOf(find_user_by_id);
  
      if (!find_user_by_id) {
        return response.status(404).send({ status: 404, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! This user with id ${parseInt(request.params.userId, 10)} does not exist` });
      }
  
      else if (find_user_by_id) 
      {
        const sort__user_as_oject_from_usersDB_where_is_stored_in_array = users_DB.filter(({id})=> id ===  parseInt(request.params.userId, 10));
    
        if (sort__user_as_oject_from_usersDB_where_is_stored_in_array.length != 0) {
  
          const index = 0;
          const created_at = new Date();

            const update_passwords = {
            id : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].id,
            category : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].category,
            firstName :sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].firstName,
            lastName : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].lastName,
            email : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].email,
            address : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].address,
            bio : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].bio,
            occupation : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].occupation,
            expertise : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].expertise,
            password : request.body.password ,
            confirm_password: request.body.confirm_password,
            account_created : sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].account_created,
            account_edited : `on ${created_at}`,
          }


      if (!request.body.password) {
        return response.status(400).send({ status: 400, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Insert new password you want` });
      }
      else if ( sort__user_as_oject_from_usersDB_where_is_stored_in_array[index].password != request.body.confirm_password ) {
        return response.status(400).send({ status: 400, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! The old password is incorrect` });
      }

      else if (request.body.confirm_password === request.body.password) {
        return response.status(400).send({ status: 400, message: `Hey ${decoded_token_in_the_way_to_obtain_user_details.choose_category_as_detail_to_store}  ${decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! Insert different password you didn't use before` });
      }

      else
      {
            users_DB.splice(get_object_position_you_need_to_delete_by_id_through_index, 1, update_passwords);
            return response.status(200).send({status: 200, message:` Hey Admin ${ decoded_token_in_the_way_to_obtain_user_details.choose_firstName_as_detail_to_store} !! you are successfully updated your profile` , data:update_passwords });
        }  
      }
    }
  },
};
export default additionallyController;
  