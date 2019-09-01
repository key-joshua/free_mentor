import check_tooken from '../../../check_token';
const config = require('../../../config');
import bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');
const filesystem = require('fs');
import express from 'express';
const app = express.Router();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const sessions = [

    {
        sessionId: 1,
        mentorId: 2,
        menteeId: 1,
        menteeEmail: 'k.joshua855@gmail.com',
        questions: 'Helo There !! am new in Wordpress... i need some mentorship of using wordpress',
        status: 'pending',

      },
      {
        sessionId: 2,
        mentorId: 2,
        menteeId: 2,
        menteeEmail: 'k.samuel@gmai.com',
        questions: 'Hello every one !! my name is samuel am user of free-mentor app... i need mentorship session for datastructure and algorithm',
        status: 'accepted',

    }
  ];




//#############################################################################        Working Properly

app.post(`/auth/sessions`,/*check_tooken , */ (request, response)=> {
    
    const newsession = {
        sessionId: sessions.length + 1,
        mentorId: request.body.mentorId,
        menteeId: request.body.menteeId,
        questions: request.body.questions,
        menteeEmail: request.body.email,
        status: 'pending'

      };



        

      const allowed_status = "pending";

     
  

     if (newsession.status!==allowed_status) {
        return response.status(400).send({ status: 400, message: `Hey !! allowed initial status is pending` });
      }else if (!request.body.mentorId) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert Mentor's Id` });
      }else if (!request.body.menteeId) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert Your Id` });
      } else if (!request.body.questions) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert decsription of your mentorship session` });
      } else if (request.body.email) {
        return response.status(400).send({ status: 400, message: `Hey !! Insert Your Email` });
      } 
    
        sessions.push(newsession);
        console.log(newsession);
        response.status(201).send({ status: 201, message: `Hey !! you are successfully created Mentorship Session with id ${sessions.length + 1} `, data: newsession }); 

        
    
    });

//#############################################################################       Working Properly

app.get(`/sessions`, /*check_tooken , */ (request,response)=>{

    return response.status(200).send({status: 200, message:"Hey !! Hope you are Viewing all sessions", data:sessions});

});


//#############################################################################       Bags Here

app.patch('/sessions/:sessionId/accept', /*check_tooken , */ (request, response) => {
    const checksession = sessions.find((sessionId) => sessionId.sessionId === parseInt(request.params.sessionId, 10));
    const sessionid = request.params.sessionId;

    if (!checksession) {
      return response.status(404).send({ status: 404, message: `${'Hey !! This session with id' + ' '}${sessionid} ` + 'does not exist' });
    }

    const confirm_session = {
        sessionId: checksession.sessionId,
        mentorId: request.body.mentorId,
        menteeId: request.body.menteeId,
        questions: request.body.questions,
        menteeEmail: request.body.email,
        status: 'Accepted'
      };

     const allowed_status = 'Accepted'

    //   if (request.body.status !== allowed_status) {
    //     return response.status(400).send({ status: 400, message: `Hey !! the status must be in Accepted Mode` });
    //   }
   


    // users.push(update_body);
    const viewed = sessions.indexOf(checksession);
    sessions.splice(viewed, 1, confirm_session);
    return response.status(204).send({ status: 204, message: `Hey !! You are accepted this session with id ${checksession.id} `, data: confirm_session });
  });
  


 //#############################################################################       Bags Here
 
app.patch('/sessions/:sessionId/reject',/*check_tooken , */ (request, response) => {
    const checksession = sessions.find((sessionId) => sessionId.sessionId === parseInt(request.params.sessionId, 10));
    const sessionid = request.params.sessionId;

    if (!checksession) {
      return response.status(404).send({ status: 404, message: `${'Hey !! This session with id' + ' '}${sessionid} ` + 'does not exist' });
    }

    const confirm_session = {
        sessionId: checksession.sessionId,
        mentorId: request.body.mentorId,
        menteeId: request.body.menteeId,
        questions: request.body.questions,
        menteeEmail: request.body.email,
        status: 'Rejected'
      };

     const allowed_status = 'Rejected'

    //   if (request.body.status !== allowed_status) {
    //     return response.status(400).send({ status: 400, message: `Hey !! the status must be in Accepted Mode` });
    //   }

    const viewed = sessions.indexOf(checksession);
    sessions.splice(viewed, 1, confirm_session);
    return response.status(204).send({ status: 204, message: `Hey !! You are accepted this session with id ${checksession.id} `, data: confirm_session });
  });
  

    
module.exports =app;
