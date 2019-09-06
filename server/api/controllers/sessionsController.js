import sessionDB from '../models/sessionsDB';




const sessionController = {
  //#############################################################################        Working Properly

  create_session : (request, response)=> {
    
    const newsession = {
        sessionId: sessionDB.length + 1,
        mentorId: request.body.mentorId,
        menteeId: request.body.menteeId,
        menteeEmail: request.body.email,
        questions: request.body.questions,
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
    
      sessionDB.push(newsession);
        response.status(201).send({ status: 201, message: `Hey !! you are successfully created Mentorship Session with id ${sessionDB.length + 1} `, data: newsession }); 

        
    
    },

//#############################################################################       Working Properly

view_sessions :(request,response)=>{

    return response.status(200).send({status: 200, message:"Hey !! Hope you are Viewing all sessions", data:sessionDB});

},

//#############################################################################       Bags Here

accept_session :(request, response) => {
    const checksession = sessionDB.find((sessionId) => sessionId.sessionId === parseInt(request.params.sessionId, 10));
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
    const viewed = sessionDB.indexOf(checksession);
    sessionDB.splice(viewed, 1, confirm_session);
    return response.status(204).send({ status: 204, message: `Hey !! You are accepted this session with id ${checksession.id} `, data: confirm_session });
  },

 //#############################################################################       Bags Here
 
 reject_session :(request, response) => {
    const checksession = sessionDB.find((sessionId) => sessionId.sessionId === parseInt(request.params.sessionId, 10));
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

    const viewed = sessionDB.indexOf(checksession);
    sessionDB.splice(viewed, 1, confirm_session);
    return response.status(204).send({ status: 204, message: `Hey !! You are accepted this session with id ${checksession.id} `, data: confirm_session });
  }
};

export default sessionController;