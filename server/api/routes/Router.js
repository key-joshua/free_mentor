import express from 'express';
const authapp = express.Router();
import verfy_admin from '../middlewares/check_admin';
import verfy_token from '../middlewares/check_token';
import userController from '../controllers/usersController';
import additionallyController from '../controllers/additionally';
import sessionController from '../controllers/sessionsController';
import verfy_admin_and_mentee from '../middlewares/check_admin_and_mentee';
import verfy_admin_and_mentor from '../middlewares/check_admin_and_mentor';



authapp.post(`/signup`, userController.signup)
       .post(`/signin`, userController.signin) 
       .get(`/admins/:adminId`, verfy_admin, userController.View_admin)
       .get(`/mentors/:mentorId`, verfy_token, userController.View_mentor)
       .get(`/mentees/:menteeId`, verfy_token, userController.View_mentee)
       .get(`/users`, verfy_admin, userController.view_all_users)
       .get(`/admins`, verfy_admin, userController.View_all_admin)
       .get(`/mentors`, verfy_token,  userController.View_all_mentor)
       .get(`/mentees`, verfy_token,  userController.View_all_mentee)

       
       .post(`/session`,verfy_token, sessionController.create_session)
       .get(`/session`,verfy_admin, sessionController.view_all_sessions)
       .patch(`/sessions/:sessionId/accept`,verfy_admin, sessionController.accept_session)
       .patch(`/sessions/:sessionId/reject`, verfy_admin, sessionController.reject_session)
       .patch(`/sessions/:sessionId/accepts`,verfy_admin_and_mentor, sessionController.accept_sessions)
       .patch(`/sessions/:sessionId/rejects`, verfy_admin_and_mentor, sessionController.reject_sessions)
       .get(`/sessions/:sessionId`,verfy_admin, sessionController.view_session_by_sessionId)
       .get(`/sessionsmentor/:mentorId`,verfy_admin, sessionController.view_sessions_of_mentor)
       .get(`/sessionsmentee/:menteeId`,verfy_admin, sessionController.view_sessions_of_mentee)
       .get(`/sessions`,verfy_token, sessionController.view_sessions_by_mentee_or_mentor_by_token_id_info)
       .get(`/onesession/:sessionId`,verfy_token, sessionController.view_one_sessions_by_mentee_or_mentor_by_token_id_info)
       

       
       .get(`/reviews`,verfy_admin, additionallyController.view_all_review)
       .get(`/review`,verfy_token, additionallyController.view_review)
       .patch(`/user/:userId`, additionallyController.update_profile)
       .patch(`/user`,verfy_token, additionallyController.change_profile)
       .patch(`/password/:userId`,verfy_token, additionallyController.update_password)
       .patch(`/passwords`,verfy_token, additionallyController.change_password)
       .post(`/sessions/:sessionId/review`,verfy_admin_and_mentee, additionallyController.review_mentor)
       .delete(`/sessions/:sessionId/review`,verfy_admin, additionallyController.delete_review)
       .patch(`/users_mentor_or_mentee/:userId`,verfy_admin, additionallyController.change_user_to_mentor);





export default authapp;