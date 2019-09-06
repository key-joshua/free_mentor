import express from 'express';
const authapp = express.Router();
import receive_token from '../middlewares/usercheck';
import userController from '../controllers/usersController';
import sessionController from '../controllers/sessionsController';


authapp.post(`/auth/signup`, userController.signup)
       .post(`/auth/signin`, userController.signin) 
       .get(`/users`,receive_token,userController.view_users)
       .get(`/mentors`, receive_token,userController.View_all_mentor)
       .get(`/mentors/:mentorId`,receive_token, userController.View_mentor)
       .patch(`/users/:userId`,receive_token, userController.change_user)


       .post(`/sessions`,receive_token, sessionController.create_session)
       .get(`/sessions`,receive_token, sessionController.view_sessions)
       .patch(`/sessions/:sessionId/accept`, sessionController.accept_session)
       .patch(`/sessions/:sessionId/reject`, sessionController.reject_session)
       .post(`/sessions/:sessionId/review`, sessionController.create_session)
       .delete(`/sessions/:sessionId/review`, sessionController.create_session);





export default authapp;